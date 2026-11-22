// src/lib/microcms.ts
import { cache } from 'react';
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

// 共通の microCMS fetch ヘルパー（確実に Next.js / OpenNext のタグキャッシュと連動する）
async function fetchMicroCMS<T>(
  endpoint: string,
  queries: Record<string, string | number>,
  _tags?: string[]
): Promise<T> {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(queries)) {
    params.set(key, String(value));
  }

  const res = await fetch(
    `https://${process.env.MICROCMS_SERVICE_DOMAIN}.microcms.io/api/v1/${endpoint}?${params}`,
    {
      headers: { 'X-MICROCMS-API-KEY': process.env.MICROCMS_API_KEY! },
      next: { revalidate: 60 },
    }
  );

  if (!res.ok) {
    throw new Error(`microCMS fetch failed: ${res.status} ${endpoint}`);
  }

  return res.json();
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

  return fetchMicroCMS<pages>('blogs', queries, ['posts']);
});

export const getAllCategories = cache(async (): Promise<Category[]> => {
  const data = await fetchMicroCMS<{ contents: Category[] }>(
    'categories',
    { limit: 100 },
    ['categories']
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
          },
          ['posts']
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
        },
        ['posts']
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
    },
    [`post-${slug}`, 'posts']
  );

  return data.contents[0] ?? null;
});