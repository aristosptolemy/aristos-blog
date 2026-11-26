// src/app/sitemap.ts

import type { MetadataRoute } from 'next'
import { getAllCategories, getAllPages } from '@/lib/microcms'

const BASE_URL = 'https://blog.logtsumu.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [categories, articles] = await Promise.all([
    getAllCategories(),
    getAllPages(),
  ])

  // 固定ページ
  const staticPages: MetadataRoute.Sitemap = [
    '',
    '/blog',
    '/about',
    '/contact',
    '/privacy',
    '/terms',
    '/disclaimer',
  ].map((path) => ({
    url: `${BASE_URL}${path}`,
  }))

  // カテゴリページ
  const categoryPages: MetadataRoute.Sitemap = categories.map(
    (category) => ({
      url: `${BASE_URL}/${category.slug}`,
    })
  )

  // 記事ページ
  const articlePages: MetadataRoute.Sitemap = articles.map(
    (article) => ({
      url: `${BASE_URL}/${article.category.slug}/${article.slug}`,
      lastModified: article.updatedAt,
    })
  )

  return [
    ...staticPages,
    ...categoryPages,
    ...articlePages,
  ]
}