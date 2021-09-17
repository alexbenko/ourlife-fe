import Link from 'next/link'
import styles from '../styles/navbar.module.css'
import { useRouter } from 'next/router'


export default function NavBar({ navLinks }) {
  const router = useRouter()

  return(
    <div className={styles.nav_container}>
      <Link href="/">
        <a>
          <p className={styles.title}> Ourlife {router.query?.albumId && 'In'} </p>
        </a>
      </Link>
        {navLinks.map((link, i) => {
          return (
            <Link href={link.url} key={i}>
              <a> {link.icon} {link.text} </a>
            </Link>
          )
        })}

    </div>
  )
}