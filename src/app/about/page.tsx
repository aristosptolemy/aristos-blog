import styles from './page.module.css'
import { name } from '@lib/CommonData'


export default function About() {


  return (
    <div className={styles.main}>
      <section className={styles.theme}>
        <h1>このブログについて</h1>
        <p>
          日々の開発メモ、ガジェットやPC環境の記録、
          趣味の検証ログなどを気ままに書き留める個人ブログです。
          興味を持ったことを試した際の備忘録や実験場として運営しています。
        </p>
      </section>

      <section className={styles.profile}>
        <h2>プロフィール</h2>
        <ul>
          <li>名前: {name}</li>
          <li>
            好きなこと / 興味: Web開発（TypeScript / React / Next.js）、
            PC自作・デスク環境構築、3Dプリンタでの工作、ゲーム、アニメ など
          </li>
        </ul>
      </section>

      <section className={styles.technology}>
        <h2>このブログの技術構成</h2>
        <ul>
          <li>Framework: Next.js (App Router) / TypeScript</li>
          <li>Styling: CSS Modules</li>
          <li>CMS: microCMS</li>
          <li>Hosting: Cloudflare Pages</li>
        </ul>
      </section>
    </div>
  )
}



