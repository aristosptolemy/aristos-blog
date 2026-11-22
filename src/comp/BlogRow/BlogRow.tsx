import styles from './page.module.css'
import Link from 'next/link';
import Image from 'next/image';

import type { blogPage } from '@/types/microcmsType'


interface BlogRow {
  pageData: blogPage
}

export default function BlogRow({
  pageData
}: BlogRow) {
  return (
    <div className={styles.main}>
      <Link
        className={styles.pageItem}
        href={`/${pageData.category.slug}/${pageData.slug}`}
      >
        <div className={styles.thumbnailArea}>
          <Image
            src={pageData.eyecatch.url}
            alt=""
            width={pageData.eyecatch.width}
            height={pageData.eyecatch.height}
            className={styles.thumbnail}
            unoptimized
          />
        </div>
        
        <div className={styles.titleArea}>
          <div className={styles.createdAt}>
            {new Date(pageData.createdAt).toLocaleDateString('ja-JP', {
              timeZone: 'Asia/Tokyo',
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            }).replaceAll('/', '-')}
          </div>
          <div className={styles.title}>{pageData.title}</div>
        </div>
      </Link>
    </div>
  )
}







