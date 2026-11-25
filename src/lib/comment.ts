import { db } from './firebase'

import {
  doc,
  getDoc,
  addDoc,
  getDocs,
  serverTimestamp,
  runTransaction,
  where,
  collection,
  query,
  limit,
  orderBy,
  type Timestamp,
} from 'firebase/firestore'


export interface CommentDocument {
  postSlug: string;       // 対象記事のslug（例: "first-post"）
  authorName: string;     // 投稿者名
  content: string;        // コメント本文
  createdAt: Timestamp;   // サーバータイムスタンプ
}

export interface CommentItem {
  id: string;
  postSlug: string;
  authorName: string;
  content: string;
  createdAt: Date | null;
}

export const commentSend = async (
  comment: string,
  userName: string,
  pageID: string
) => {
  let name = userName
  if (name == '') {
    name = '名無し'
  }

  const data = {
    comment: comment,
    authorName: name,
    createdAt: serverTimestamp(),
    parentId: null
  }
  const collect = collection(
    db, 'Pages', pageID, 'Comments'
  )
  await addDoc(collect, data)
}

export const commentGet = async (
  pageID: string
) => {
  const commentRef = collection(
    db, 'Pages', pageID, 'Comments'
  );

  const q = query(
    commentRef,
    orderBy('createdAt', 'desc')
  );

  try {
    const snap = await getDocs(q);

    return snap.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id
    }));
  } catch (error) {
    console.error('コメント取得エラー:', error);
    return [];
  }
};