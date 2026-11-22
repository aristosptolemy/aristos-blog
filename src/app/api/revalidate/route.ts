import { getCloudflareContext } from '@opennextjs/cloudflare';
import { NextRequest, NextResponse } from 'next/server';

const CACHE_PREFIX = 'microcms_cache:';

export async function POST(request: NextRequest) {
  const secret = request.headers.get('x-webhook-secret');

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
  }

  try {
    const { env } = await getCloudflareContext({ async: true });
    const kv = (env as { NEXT_INC_CACHE_KV?: KVNamespace }).NEXT_INC_CACHE_KV;

    if (kv) {
      const list = await kv.list({ prefix: CACHE_PREFIX });
      await Promise.all(list.keys.map((k) => kv.delete(k.name)));
    }

    return NextResponse.json({ revalidated: true });
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to clear KV cache', error: String(error) },
      { status: 500 }
    );
  }
}