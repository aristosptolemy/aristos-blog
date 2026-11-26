import styles from './Styles.module.css'
import Link from 'next/link'

export default function Contact() {
  return (
    <div className={styles.main}>
      <section className={styles.header}>
        <h1>お問い合わせ</h1>
        <p>
          Logtsumu Blogに関するお問い合わせは、
          以下のフォームより受け付けています。
        </p>
        <p>
          記事内容の誤りや修正のご指摘、情報提供、
          サイトの不具合、ご意見・ご要望などがございましたら、
          お気軽にお問い合わせください。
        </p>
      </section>

      <form className={styles.form}>
        <div className={styles.field}>
          <label htmlFor="name">
            お名前
            <span className={styles.optional}>任意</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            autoComplete="name"
            maxLength={50}
            placeholder="お名前・ハンドルネーム"
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="email">
            メールアドレス
            <span className={styles.optional}>任意</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            autoComplete="email"
            maxLength={254}
            placeholder="example@example.com"
          />
          <small>
            返信を希望される場合は入力してください。
          </small>
        </div>

        <div className={styles.field}>
          <label htmlFor="category">
            お問い合わせ種別
            <span className={styles.required}>必須</span>
          </label>
          <select
            id="category"
            name="category"
            defaultValue=""
            required
          >
            <option value="" disabled>
              選択してください
            </option>
            <option value="article">記事内容について</option>
            <option value="correction">誤り・修正の報告</option>
            <option value="information">情報提供</option>
            <option value="bug">サイトの不具合</option>
            <option value="feedback">ご意見・ご要望</option>
            <option value="copyright">著作権について</option>
            <option value="other">その他</option>
          </select>
        </div>

        <div className={styles.field}>
          <label htmlFor="pageUrl">
            対象ページのURL
            <span className={styles.optional}>任意</span>
          </label>
          <input
            type="url"
            id="pageUrl"
            name="pageUrl"
            maxLength={2048}
            placeholder="https://blog.logtsumu.com/..."
          />
          <small>
            特定の記事に関するお問い合わせの場合は入力してください。
          </small>
        </div>

        <div className={styles.field}>
          <label htmlFor="subject">
            件名
            <span className={styles.required}>必須</span>
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            maxLength={100}
            required
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="message">
            お問い合わせ内容
            <span className={styles.required}>必須</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={8}
            maxLength={3000}
            required
          />
        </div>

        <div className={styles.agreement}>
          <input
            type="checkbox"
            id="agreement"
            name="agreement"
            required
          />
          <label htmlFor="agreement">
            <Link href="/privacy">
              プライバシーポリシー
            </Link>
            に同意する
          </label>
        </div>

        <button
          type="submit"
          className={styles.submit}
          disabled
        >
          送信する
        </button>
      </form>

      <section className={styles.notice}>
        <h2>お問い合わせにあたって</h2>
        <ul>
          <li>
            お問い合わせの内容によっては、返信できない場合があります。
          </li>
          <li>
            返信までにお時間をいただく場合があります。
          </li>
          <li>
            お送りいただいた情報は、お問い合わせへの対応および
            サイトの改善に利用します。
          </li>
        </ul>
      </section>
    </div>
  )
}