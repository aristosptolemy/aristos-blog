import { Timestamp } from "firebase/firestore";

// comments コレクションのドキュメント構造例
interface CommentItem {
  id: string;
  postSlug: string;       // どの記事へのコメントか
  parentId: string | null; // 返信機能をつける場合の親コメントID（不要ならnull）
  authorName: string;     // 投稿者名（未入力時は "名無し" など）
  content: string;        // コメント本文
  createdAt: Timestamp;   // 投稿日時
  isApproved: boolean;    // 承認制にする場合の公開フラグ
}