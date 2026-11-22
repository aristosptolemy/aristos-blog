import styles from './page.module.css'
import Link from "next/link";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';


interface PageNumbers {
  pageNum: number;
  startNum: number;
  endNum: number;
  lastNum: number;
  slug: string;
}


export default function PageNumbers({
  pageNum,
  startNum,
  endNum,
  lastNum,
  slug
}: PageNumbers) {
  const pages = []
  for (let i = startNum; i < endNum + 1; i ++) {
    const nowRe = i == pageNum
    pages.push({
      page: i,
      now: nowRe
    })
  }


  return (
    <div className={styles.main}>
      <div className={styles.firstPage}>
        {pageNum !== startNum && (
          <Link
            className={styles.PageArea}
            href={`/${slug}`}
          >
            <ArrowBackIosNewIcon/>
          </Link>
        )}
      </div>
      <div className={styles.pagesArea}>
        {pages.map((row, index) => (
          <div key={index}>
            {row.page == pageNum ? (
              <span className={styles.PageArea}>
                {row.page}
              </span>
            ) : (
              <Link
                className={styles.PageArea}
                href={`/${slug}/${row.page}`}
              >
                {row.page}
              </Link>
            )}
          </div>
        ))}
      </div>
      <div className={styles.firstPage}>
        {pageNum !== lastNum && (
          <Link
            className={styles.PageArea}
            href={`/${slug}/${lastNum}`}
          >
            <ArrowForwardIosIcon/>
          </Link>
        )}
      </div>
    </div>
  )
}






