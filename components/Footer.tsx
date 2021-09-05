import styles from '../styles/Home.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Footer({ links }){
  return(
    <footer className={styles.footer}>
      {links.map((link, i) => {
        return (
          <Link href={link.url}>
            <a> {link.icon} {link.text} </a>
          </Link>
        )
      })}
    </footer>
  )
}

