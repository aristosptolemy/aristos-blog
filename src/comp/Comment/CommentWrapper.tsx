'use client'

import dynamic from 'next/dynamic'

const CommentSection = dynamic(
  () => import('./CommentSection'),
  {
    ssr: false,
    loading: () => <p>コメントを読み込み中...</p>,
  }
)

export default function CommentWrapper({
  id
}: {
  id: string
}) {
  return <CommentSection id={id} />
}