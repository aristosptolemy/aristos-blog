import styles from './page.module.css'
import Image from 'next/image';
import Link from "next/link";
import { getTopCategorySections } from '@/lib/microcms';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


import {
  name,
  Introduction
} from '@lib/CommonData'


export default async function Side() {
  const categoryPages = await getTopCategorySections()

  return (
    <aside className={styles.main}>
      <div className={styles.profileArea}>
        <Image
          src='/images/profileIcon.jpg'
          alt=""
          width={50}
          height={50}
          className={styles.profileIcon}
          unoptimized
        />
        <div className={styles.Name}>
          {name}
        </div>
        
      </div>
      <div className={styles.Introduction}>
        {Introduction}
      </div>
      <div className={styles.categories}>
        {categoryPages.map((row) => (
          <Link
            key={row.id}
            href={`/${row.slug}`}
            className={styles.categoryLink}
          >
            <div className={styles.nameArea}>
              <div>{row.name}</div>
              <div>({row.count})</div>
            </div>
            <ArrowForwardIosIcon/>
          </Link>
        ))}
      </div>
    </aside>
  )
}


