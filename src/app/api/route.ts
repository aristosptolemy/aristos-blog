import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const secret = request.headers.get('x-webhook-secret');

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
  }

  try {
    const body = await request.json();

    const newContent = body.contents?.new?.publishValue;
    const oldContent = body.contents?.old?.publishValue;
    const slug = newContent?.slug ?? oldContent?.slug;

    if (slug) {
      revalidateTag(`post-${slug}`, 'max');
    }

    revalidateTag('posts', 'max');

    return NextResponse.json({ revalidated: true, slug: slug ?? null });
  } catch {
    // ボディが空の場合などでも一覧タグだけは確実にパージする
    revalidateTag('posts', 'max');
    return NextResponse.json({ revalidated: true });
  }
}