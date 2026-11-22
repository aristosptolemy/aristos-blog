// src/components/Header.tsx
import Link from "next/link";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          aristos-blog
        </Link>

        <nav className={styles.nav}>
          <Link href="/about" className={styles.link}>
            About
          </Link>
          
          <Link href="/blog" className={styles.link}>
            Blog
          </Link>

          <a
            href="https://github.com/aristosptolemy"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}