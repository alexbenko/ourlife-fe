import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import styles from '../styles/mobilenav.module.css'

export default function MobileNav({navLinks}) {
  const router = useRouter()

  const [ menuClicked, setMenuClicked ] = useState(false)
  const handleMenuClick = (e) => {
    //e.preventDefault()
    setMenuClicked(!menuClicked)
  }

  return(
    <div className={styles.mobileNav_container}>
      <div className={styles.headingbar}>
        <div className={menuClicked ? styles.menu_open : styles.menu_closed} onClick={e => handleMenuClick(e)}>
          <div className={styles.bar1}></div>
          <div className={styles.bar2}></div>
          <div className={styles.bar3}></div>
        </div>
        <h2 className={styles.heading}>Ourlife</h2>
      </div>
      <div className={styles.overlay} style={{width: menuClicked ? '100%' : '0%'}}>
        <div className={styles.links_container}>
          { navLinks.map((link, i) => {
            return(
              <div
                key={i}
                style={{borderColor: router.asPath === link.url ? '#00e887' : null}}
              >
                <Link href={link.url}>
                  <a onClick={()=> setMenuClicked(false)}> {link.icon} {link.text} </a>
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}