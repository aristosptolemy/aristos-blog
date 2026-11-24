// src/lib/microcms.ts
import { cache } from 'react';
import { getCloudflareContext } from '@opennextjs/cloudflare';
import { blogPage, Category } from '@/types/microcmsType';

export type pages = {
  contents: blogPage[];
  totalCount: number;
  offset: number;
  limit: number;
};

export type CategoryWithCount = Category & {
  count: number;
};

type CategoryPages = CategoryWithCount & {
  posts: blogPage[];
  limit: number;
};

export const BlogLimit = 10;

const CACHE_PREFIX = 'microcms_cache:';

// 共通の microCMS fetch ヘルパー（Cloudflare KV に無期限キャッシュし、Webhook 受信時のみ削除する）
async function fetchMicroCMS<T>(
  endpoint: string,
  queries: Record<string, string | number>
): Promise<T> {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(queries)) {
    params.set(key, String(value));
  }

  const cacheKey = `${CACHE_PREFIX}${endpoint}?${params.toString()}`;

  let kv: KVNamespace | undefined;
  
  try {
    const { env } = await getCloudflareContext({ async: true });
    kv = (env as { NEXT_INC_CACHE_KV?: KVNamespace }).NEXT_INC_CACHE_KV;
  } catch {
    kv = undefined;
  }

  // 1. KV にキャッシュがあれば API を叩かず即座に返す（更新がない限り API 消費ゼロ）
  if (kv) {
    const cached = await kv.get<T>(cacheKey, 'json');
    if (cached !== null) {
      console.log(`[KV HIT] ${cacheKey}`);
      return cached;
    }
  }

  console.log(`[microCMS API FETCH] ${cacheKey}`);
  // 2. KV にない場合（初回または Webhook で削除された直後）のみ microCMS API を叩く
  const res = await fetch(
    `https://${process.env.MICROCMS_SERVICE_DOMAIN}.microcms.io/api/v1/${endpoint}?${params}`,
    {
      headers: { 'X-MICROCMS-API-KEY': process.env.MICROCMS_API_KEY! },
      cache: 'no-store',
    }
  );

  if (!res.ok) {
    throw new Error(`microCMS fetch failed: ${res.status} ${endpoint}`);
  }

  const data = (await res.json()) as T;

  // 3. 取得した最新データを KV に無期限保存する
  if (kv) {
    await kv.put(cacheKey, JSON.stringify(data));
  }

  return data;
}

export const getPages = cache(async (
  categoryId?: string,
  page = 1,
  limit = 10
): Promise<pages> => {
  const offset = (page - 1) * limit;
  const queries: Record<string, string | number> = {
    fields: 'id,title,publishedAt,category,eyecatch,createdAt,slug',
    limit,
    offset,
    orders: '-publishedAt',
  };

  if (categoryId) {
    queries.filters = `category[equals]${categoryId}`;
  }

  return fetchMicroCMS<pages>('blogs', queries);
});

export const getAllCategories = cache(async (): Promise<Category[]> => {
  const data = await fetchMicroCMS<{ contents: Category[] }>(
    'categories',
    { limit: 100 }
  );
  return data.contents;
});

export const getCategoriesWithCount = cache(
  async (): Promise<CategoryWithCount[]> => {
    const categories = await getAllCategories();

    return Promise.all(
      categories.map(async (cat) => {
        const data = await fetchMicroCMS<{ totalCount: number }>(
          'blogs',
          {
            filters: `category[equals]${cat.id}`,
            limit: 0,
          }
        );

        return {
          ...cat,
          count: data.totalCount,
        };
      })
    );
  }
);

export const getTopCategorySections = cache(async (): Promise<CategoryPages[]> => {
  const categoriesWithCount = await getCategoriesWithCount();

  return Promise.all(
    categoriesWithCount.map(async (cat) => {
      if (cat.count === 0) {
        return { ...cat, posts: [], limit: BlogLimit };
      }

      const data = await fetchMicroCMS<{ contents: blogPage[] }>(
        'blogs',
        {
          fields: 'id,title,publishedAt,category,eyecatch,slug',
          filters: `category[equals]${cat.id}`,
          limit: BlogLimit,
          orders: '-publishedAt',
        }
      );

      return {
        ...cat,
        posts: data.contents,
        limit: BlogLimit,
      };
    })
  );
});

export const getPostBySlug = cache(async (slug: string): Promise<blogPage | null> => {
  const data = await fetchMicroCMS<{ contents: blogPage[] }>(
    'blogs',
    {
      filters: `slug[equals]${slug}`,
      limit: 1,
    }
  );

  return data.contents[0] ?? null;
});