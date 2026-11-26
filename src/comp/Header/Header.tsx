import Link from 'next/link'
import styles from './Header.module.css'
import { getAllCategories } from '@lib/microcms'
import HeaderNav from './HeaderNav'

export default async function Header() {
  const categories = await getAllCategories()

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          Logtsumu-blog
        </Link>

        <HeaderNav categories={categories} />
      </div>
    </header>
  )
}