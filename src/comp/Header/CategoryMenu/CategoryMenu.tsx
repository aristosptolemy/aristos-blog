'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import styles from './CategoryMenu.module.css'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

type Category = {
  id: string
  name: string
  slug: string
}

export default function CategoryMenu({
  categories
}: {
  categories: Category[]
}) {
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setOpen(false)
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && open) {
        setOpen(false)
        buttonRef.current?.focus()
      }
    }

    document.addEventListener('click', handleClick)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('click', handleClick)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  return (
    <div
      className={styles.container}
      ref={menuRef}
    >
      <button
        type="button"
        ref={buttonRef}
        className={styles.trigger}
        onClick={() => setOpen(prev => !prev)}
        aria-expanded={open}
        aria-controls="category-menu"
      >
        Categories

        <KeyboardArrowDownIcon
          className={`${styles.arrow} ${open ? styles.rotate : ''}`}
        />
      </button>

      <div
        id="category-menu"
        className={styles.dropdown}
        hidden={!open}
      >
        {categories.map(category => (
          <Link
            key={category.id}
            href={`/${category.slug}`}
            className={styles.item}
            onClick={() => setOpen(false)}
          >
            {category.name}
          </Link>
        ))}
      </div>
    </div>
  )
}