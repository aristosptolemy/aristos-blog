import { cache } from 'react';

import { createClient } from 'microcms-js-sdk';

import {
  blogPage, Category
} from '@/types/microcmsType';

export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN || '',
  apiKey: process.env.MICROCMS_API_KEY || '',
});


export const getAllPages = cache(async (): Promise<blogPage[]> => {
  const articles = await client.getAllContents<blogPage>({
    endpoint: 'blogs',
    queries: {
      depth: 1,
    },
    customRequestInit: {
      cache: 'no-store'
    },
  });
  return articles;
});


export type pages = {
  contents: blogPage[];
  totalCount: number;
  offset: number;
  limit: number;
}

export const getPages = cache(async (
  categoryId?: string,
  page = 1, limit = 10
): Promise<pages> => {
  const offset = (page - 1) * limit;
  const params = new URLSearchParams({
    fields: 'id,title,publishedAt,category,eyecatch,createdAt,slug', // 本文を除外して軽量化
    limit: String(limit),
    offset: String(offset),
    orders: '-publishedAt',
  });

  if (categoryId) {
    params.set('filters', `category[equals]${categoryId}`);
  }

  const res = await fetch(
    `https://${process.env.MICROCMS_SERVICE_DOMAIN}.microcms.io/api/v1/blogs?${params}`,
    {
      headers: { 'X-MICROCMS-API-KEY': process.env.MICROCMS_API_KEY! },
      // 一覧系のキャッシュはすべて 'posts' タグで紐づける
      next: { tags: ['posts'] },
    }
  );

  return res.json();
})


export const getAllCategories = cache(async (): Promise<Category[]> => {
  const articles = await client.getAllContents<Category>({
    endpoint: 'categories',
    customRequestInit: {
      next: { tags: ['categories'] },
    },
  });
  return articles;
});

export type CategoryWithCount = Category & {
  count: number;
};

export const getCategoriesWithCount = cache(
  async (): Promise<CategoryWithCount[]> => {
  const categories = await getAllCategories();

  return await Promise.all(
    categories.map(async (cat) => {
      const data = await client.getList({
        endpoint: 'blogs',
        queries: {
          filters: `category[equals]${cat.id}`,
          limit: 0, // 記事データは取らず totalCount だけ取得
        },
        customRequestInit: {
          next: { tags: ['posts'] },
        },
      });

      return {
        ...cat,
        count: data.totalCount,
      };
    })
  );
});


type CategoryPages = CategoryWithCount & {
  posts: blogPage[];
  limit: number;
}

export const BlogLimit = 10

export const getTopCategorySections = cache(async (): Promise<CategoryPages[]> => {
  const categoriesWithCount = await getCategoriesWithCount();
  return await Promise.all(
    categoriesWithCount.map(async (cat) => {
      if (cat.count === 0) {
        return { ...cat, posts: [], limit: 10 };
      }
      const data = await client.getList<blogPage>({
        endpoint: 'blogs',
        queries: {
          fields: 'id,title,publishedAt,category,eyecatch,slug',
          filters: `category[equals]${cat.id}`,
          limit: BlogLimit,
          orders: '-publishedAt',
        },
        customRequestInit: {
          next: { tags: ['posts'] },
        },
      });

      return {
        ...cat,
        posts: data.contents,
        limit: BlogLimit
      };
    })
  );
});


export const getPostBySlug = cache(async (slug: string): Promise<blogPage | null> => {
  const data = await client.getList<blogPage>({
    endpoint: 'blogs',
    queries: {
      filters: `slug[equals]${slug}`,
      limit: 1,
    },
    customRequestInit: {
      // 記事個別のキャッシュタグと、一覧更新用の全体タグを付与
      next: { tags: [`post-${slug}`, 'posts'] },
    },
  });

  return data.contents[0] ?? null;
});