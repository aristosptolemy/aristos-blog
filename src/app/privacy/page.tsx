import styles from './page.module.css'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'プライバシーポリシー',
  description: 'Logtsumu Blogにおける個人情報の取り扱いについて',
}

export default function Privacy() {
  return (
    <div className={styles.main}>
      <h1>プライバシーポリシー</h1>

      <section>
        <p>
          Logtsumu Blog（以下「当サイト」といいます）は、
          当サイトを利用する皆様のプライバシーを尊重し、
          取得する情報の適切な取り扱いおよび管理に努めます。
        </p>
        <p>
          本プライバシーポリシーでは、当サイトにおける
          情報の取得、利用および管理に関する方針を定めます。
        </p>
      </section>

      <section>
        <h2>1. 取得する情報</h2>
        <p>
          当サイトでは、サービスの提供および運営にあたり、
          以下の情報を取得する場合があります。
        </p>
        <ul>
          <li>氏名またはハンドルネーム</li>
          <li>メールアドレス</li>
          <li>お問い合わせの内容</li>
          <li>コメントなどの投稿内容</li>
          <li>IPアドレス</li>
          <li>ブラウザおよび端末に関する情報</li>
          <li>アクセス日時および閲覧情報</li>
        </ul>
      </section>

      <section>
        <h2>2. 情報の利用目的</h2>
        <p>
          取得した情報は、以下の目的で利用します。
        </p>
        <ul>
          <li>当サイトの運営およびサービスの提供</li>
          <li>お問い合わせへの対応</li>
          <li>コメントおよび投稿内容の管理</li>
          <li>サイトの品質および利便性の向上</li>
          <li>不正利用や迷惑行為の防止</li>
          <li>障害の調査およびセキュリティの確保</li>
        </ul>
      </section>

      <section>
        <h2>3. 個人情報の管理</h2>
        <p>
          当サイトでは、取得した個人情報について、
          不正アクセス、紛失、改ざんおよび漏えいを防止するため、
          必要かつ適切な安全管理措置を講じるよう努めます。
        </p>
      </section>

      <section>
        <h2>4. 個人情報の第三者提供</h2>
        <p>
          当サイトでは、法令に基づく場合や本人の同意がある場合などを除き、
          個人データを第三者に提供することはありません。
        </p>
        <p>
          ただし、サイトの運営に必要な範囲で、
          外部サービス事業者に情報の取り扱いを委託する場合があります。
        </p>
      </section>

      <section>
        <h2>5. Cookieおよびブラウザストレージについて</h2>
        <p>
          当サイトでは、サービスの提供、利用者の利便性向上、
          設定の保持およびセキュリティの確保などを目的として、
          Cookieやブラウザストレージを使用する場合があります。
        </p>
        <p>
          利用者は、ブラウザの設定によってCookieの使用を制限したり、
          保存されたデータを削除したりすることができます。
          ただし、一部の機能が正常に利用できなくなる場合があります。
        </p>
      </section>

      <section>
        <h2>6. 外部サービスについて</h2>
        <p>
          当サイトでは、サイトの運営および機能の提供のために、
          以下の外部サービスを利用しています。
        </p>

        <h3>Cloudflare</h3>
        <p>
          Webサイトの配信、キャッシュ管理、
          セキュリティ対策などに利用しています。
        </p>
        <a
          href="https://www.cloudflare.com/privacypolicy/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Cloudflare Privacy Policy
        </a>

        <h3>Firebase（Google）</h3>
        <p>
          コメントやお問い合わせなどのデータの保存・管理に
          Cloud Firestoreを利用します。
        </p>
        <a
          href="https://firebase.google.com/support/privacy"
          target="_blank"
          rel="noopener noreferrer"
        >
          Privacy and Security in Firebase
        </a>

        <h3>microCMS</h3>
        <p>
          記事やカテゴリなどのコンテンツの管理に利用しています。
        </p>
        <a
          href="https://microcms.io/policy"
          target="_blank"
          rel="noopener noreferrer"
        >
          microCMS プライバシーポリシー
        </a>
      </section>

      <section>
        <h2>7. 個人情報の開示・訂正・削除</h2>
        <p>
          利用者本人から個人情報の開示、訂正、削除などの
          請求があった場合には、本人確認を行ったうえで、
          法令に従い適切に対応します。
        </p>
      </section>

      <section>
        <h2>8. プライバシーポリシーの変更</h2>
        <p>
          当サイトは、法令の変更やサービス内容の変更などに応じて、
          本プライバシーポリシーを改定する場合があります。
        </p>
        <p>
          変更後の内容は、本ページに掲載します。
          法令上必要となる場合には、適切な方法で通知または同意の取得を行います。
        </p>
      </section>

      <section>
        <h2>9. お問い合わせ</h2>
        <p>
          本プライバシーポリシーおよび個人情報の取り扱いに関する
          お問い合わせは、以下のページよりお願いいたします。
        </p>
        <Link href="/contact">
          お問い合わせページ
        </Link>
      </section>

      <div className={styles.date}>
        <p>制定日：2026年11月26日</p>
        <p>最終改定日：2026年11月26日</p>
      </div>
    </div>
  )
}