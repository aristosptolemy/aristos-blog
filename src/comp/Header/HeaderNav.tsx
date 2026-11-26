'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'

import styles from './Header.module.css'
import CategoryMenu from './CategoryMenu/CategoryMenu'

import type { ComponentProps } from 'react'

type Props = ComponentProps<typeof CategoryMenu>

export default function HeaderNav({ categories }: Props) {
  const [open, setOpen] = useState(false)
  const navRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const pathname = usePathname()

  const closeMenu = () => {
    setOpen(false)
  }

  useEffect(() => {
    if (!open) return

    const handlePointerDown = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !event.defaultPrevented) {
        setOpen(false)
        buttonRef.current?.focus()
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  return (
    <div
      className={styles.navContainer}
      ref={navRef}
    >
      <button
        type="button"
        ref={buttonRef}
        className={styles.menuButton}
        onClick={() => setOpen(prev => !prev)}
        aria-label={open ? 'メニューを閉じる' : 'メニューを開く'}
        aria-expanded={open}
        aria-controls="header-navigation"
      >
        {open ? <CloseIcon /> : <MenuIcon />}
      </button>

      <nav
        key={pathname}
        id="header-navigation"
        className={`${styles.nav} ${open ? styles.open : ''}`}
        aria-label="メインナビゲーション"
        onClick={(event) => {
          if ((event.target as HTMLElement).closest('a')) {
            closeMenu()
          }
        }}
      >
        <Link
          href="/blog"
          className={styles.link}
        >
          Blog
        </Link>

        <CategoryMenu categories={categories} />

        <Link
          href="/about"
          className={styles.link}
        >
          About
        </Link>

        <Link
          href="/contact"
          className={styles.link}
        >
          Contact
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
  )
}