'use client'
import styles from './Styles.module.css'

import type { FormEvent } from 'react';

import { useEffect, useState } from 'react';

import { commentSend, commentGet } from '@lib/comment'

interface CommentArea {
  id: string;
}


export default function CommentArea ({
  id
}: CommentArea) {

  const [comments, setComments] = useState<any[]>([]);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const comment = String(formData.get('comment') ?? '').trim();
    const name = String(formData.get('name') ?? '').trim();
    commentSend(comment, name, id)

    form.reset();
  };

  useEffect(() => {
    let cancelled = false;

    const fetchComments = async () => {
      try {
        const data = await commentGet(id);

        if (!cancelled) {
          setComments(data);
        }
      } catch (error) {
        console.error('コメントの取得に失敗しました', error);
      }
    };

    void fetchComments();

    return () => {
      cancelled = true;
    };
  }, [id]);

  return (
    <div className={styles.main}>
      <div className={styles.commentArea}>
        <form className={styles.box} onSubmit={handleSubmit}>
          <div className={styles.textArea}>
            <textarea
              className={styles.comment}
              name='comment'
              rows={4}
              placeholder="コメントを入力..."
              aria-label="コメント"
              required
            />
          </div>
          <div className={styles.names}>
            <input
              className={styles.name}
              name='name'
              type='text'
              placeholder="名前（任意）"
              aria-label="投稿者名"
            />
            <button
              type='submit'
            >
              コメントを投稿
            </button>
          </div>
        </form>
      </div>
      <div className={styles.commentsArea}>
        {comments.map((row) => (
          <div
            key={row.id}
            className={styles.Usercomment}
          >
            <div className={styles.nameRow}>
              <div>{row.authorName}</div>
              <div>{row.createdAt.toDate().toLocaleString('ja-JP')}</div>
            </div>
            
            <div className={styles.commentRow}>{row.comment}</div>
          </div>
        ))}
      </div>
    </div>
  )
}












