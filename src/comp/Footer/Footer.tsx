import Link from 'next/link'
import styles from './Footer.module.css'

const contentsLinks = [
  { label: 'Home', href: '/' },
  { label: 'Blog', href: '/blog' },
]

const siteLinks = [
  { label: '当サイトについて', href: '/about' },
  { label: 'お問い合わせ', href: '/contact' },
  { label: 'プライバシーポリシー', href: '/privacy' },
  { label: '利用規約', href: '/terms' },
  { label: '著作権・免責事項', href: '/disclaimer' },
]

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>

        {/* ブランド情報 */}
        <div className={styles.brand}>
          <Link href="/" className={styles.logo}>
            Logtsumu Blog
          </Link>
          <p className={styles.tagline}>
            記録を積み、知識を紡ぐ。
          </p>
          <p className={styles.description}>
            日々の知識や経験、発見を記録し、
            情報として発信する個人ブログです。
          </p>
        </div>

        {/* コンテンツ */}
        <nav
          className={styles.navigation}
          aria-label="コンテンツ"
        >
          <h2>Contents</h2>
          <ul>
            {contentsLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* サイト情報 */}
        <nav
          className={styles.navigation}
          aria-label="サイト情報"
        >
          <h2>Information</h2>
          <ul>
            {siteLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

      </div>

      {/* コピーライト */}
      <div className={styles.bottom}>
        <small>© 2026 Logtsumu</small>
      </div>
    </footer>
  )
}