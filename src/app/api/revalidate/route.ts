// src/app/api/revalidate/route.ts
import { getCloudflareContext } from '@opennextjs/cloudflare';
import { NextRequest, NextResponse } from 'next/server';

const CACHE_PREFIX = 'microcms_cache:';

type MicroCMSWebhookBody = {
  contents?: {
    new?: {
      publishValue?: {
        slug?: string;
      };
    };
    old?: {
      publishValue?: {
        slug?: string;
      };
    };
  };
};

export async function POST(request: NextRequest) {
  const secret = request.headers.get('x-webhook-secret');

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
  }

  try {
    const body = (await request.json().catch(() => null)) as MicroCMSWebhookBody | null;
    const newSlug = body?.contents?.new?.publishValue?.slug;
    const oldSlug = body?.contents?.old?.publishValue?.slug;

    // 変更・削除された記事の slug だけを特定
    const targetSlugs = new Set<string>(
      [newSlug, oldSlug].filter((s): s is string => Boolean(s))
    );

    const { env } = await getCloudflareContext({ async: true });
    const kv = (env as { NEXT_INC_CACHE_KV?: KVNamespace }).NEXT_INC_CACHE_KV;

    if (kv) {
      const list = await kv.list({ prefix: CACHE_PREFIX });

      const keysToDelete = list.keys
        .map((k) => k.name)
        .filter((keyName) => {
          // 個別記事キャッシュ（filters=slug[equals]...）の場合
          if (keyName.includes('filters=slug%5Bequals%5D')) {
            // slug が特定できない場合（カテゴリー変更など）は安全のため削除
            if (targetSlugs.size === 0) return true;
            // 今回変更・削除された記事の slug に一致するものだけ削除
            return Array.from(targetSlugs).some((slug) =>
              keyName.includes(`filters=slug%5Bequals%5D${encodeURIComponent(slug)}&`)
            );
          }
          // 一覧・カテゴリー・記事件数系のキャッシュは常に最新化するため削除
          return true;
        });

      await Promise.all(keysToDelete.map((name) => kv.delete(name)));
    }

    return NextResponse.json({ revalidated: true });
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to clear KV cache', error: String(error) },
      { status: 500 }
    );
  }
}