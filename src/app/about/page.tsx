import styles from './page.module.css'
import { name } from '@lib/CommonData'

export default function About() {
  return (
    <div className={styles.main}>
      <section className={styles.theme}>
        <h1>このブログについて</h1>
        <p>
          Logtsumu Blogは、プログラミングやWeb開発、
          PC・ガジェット、ゲームなど、さまざまな分野で得た知識や
          経験、検証結果を記録・発信する個人ブログです。
        </p>
        <p>
          日々の発見や試行錯誤を記録として残すとともに、
          その情報が誰かの参考になることを目的として運営しています。
        </p>
      </section>

      <section className={styles.concept}>
        <h2>Logtsumuについて</h2>
        <p>
          Logtsumu（ログツム）は、記録を意味する「Log」と、
          積み重ねることを意味する「積む（Tsumu）」を
          組み合わせた造語です。
        </p>
        <p>
          日々の知識や経験、発見を一つずつ積み重ね、
          情報として蓄積・発信していくという意味を込めています。
        </p>
      </section>

      <section className={styles.contents}>
        <h2>主な掲載内容</h2>
        <ul>
          <li>
            プログラミング・Web開発に関する技術情報
          </li>
          <li>
            PC・ガジェット・デスク環境に関する情報
          </li>
          <li>
            ゲームの攻略情報・データ分析・性能検証
          </li>
          <li>
            個人開発・ものづくりに関する記録
          </li>
          <li>
            その他、興味を持ったことや日々の発見
          </li>
        </ul>
      </section>

      <section className={styles.profile}>
        <h2>運営者について</h2>
        <ul>
          <li>名前：{name}</li>
          <li>
            興味・関心：
            Web開発、プログラミング、PC自作、
            デスク環境構築、3Dプリンタ、ゲーム、アニメなど
          </li>
        </ul>
      </section>

      <section className={styles.technology}>
        <h2>このブログの技術構成</h2>
        <ul>
          <li>フレームワーク：Next.js（App Router）</li>
          <li>開発言語：TypeScript</li>
          <li>スタイリング：CSS Modules</li>
          <li>コンテンツ管理：microCMS</li>
          <li>データベース：Cloud Firestore</li>
          <li>ホスティング：Cloudflare Workers</li>
        </ul>
      </section>
    </div>
  )
}



