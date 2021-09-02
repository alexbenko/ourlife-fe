import { useState, useEffect } from 'react'
import Link from 'next/link'
import styles from '../styles/mobilenav.module.css'

export default function MobileNav({navLinks}) {
  const [ menuClicked, setMenuClicked ] = useState(false)
  const handleMenuClick = (e) => {
    //e.preventDefault()
    setMenuClicked(!menuClicked)
  }

  const HeadingText = ({text}) =>{
    return <p className={styles.heading}>{text}</p>
  }
  return(
    <div className={styles.mobileNav_container}>
      <div className={styles.headingbar}>
        <div className={menuClicked ? styles.menu_open : styles.menu_closed} onClick={e => handleMenuClick(e)}>
          <div className={styles.bar1}></div>
          <div className={styles.bar2}></div>
          <div className={styles.bar3}></div>
        </div>
        <HeadingText text='The Wanderers'/>
      </div>
      <div className={styles.overlay} style={{width: menuClicked ? '90%' : '0%'}}>
        <HeadingText text='The Wanderers'/>
        <div className={styles.links_container}>
          { navLinks.map((link, i) => {
            return(
              <Link key={i} href={link.url}>
                <a> {link.text} </a>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}