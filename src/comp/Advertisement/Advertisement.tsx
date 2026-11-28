'use client'

import { useEffect, useRef } from 'react'
import Script from 'next/script'
import styles from './Advertisement.module.css'

type AdMaxRequest = {
  admax_id: string
  type: 'banner' | 'switch'
}

declare global {
  interface Window {
    admaxads?: AdMaxRequest[]
  }
}

type Props = {
  adId: string
  width: number
  height: number
}

export default function Advertisement({
  adId,
  width,
  height
}: Props) {
  const initialized = useRef(false)
  const isDev = process.env.NODE_ENV === 'development'

  useEffect(() => {
    if (isDev) return
    if (initialized.current) return

    window.admaxads = window.admaxads || []

    window.admaxads.push({
      admax_id: adId,
      type: 'banner'
    })

    initialized.current = true
  }, [adId, isDev])

  return (
    <div className={styles.container}>
      <span className={styles.label}>広告</span>

      {isDev ? (
        <div
          className={styles.placeholder}
          style={{ width, height }}
        >
          AD {width} × {height}
        </div>
      ) : (
        <>
          <div
            className="admax-ads"
            data-admax-id={adId}
            style={{
              display: 'inline-block',
              width,
              height
            }}
          />

          <Script
            id="admax-script"
            src="https://adm.shinobi.jp/st/t.js"
            strategy="afterInteractive"
          />
        </>
      )}
    </div>
  )
}

















