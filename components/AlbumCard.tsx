import styles from '../styles/Home.module.css'
import Link from 'next/link'
export default function AlbumCard({ albumName, id }) {
  return (
    <Link href={`/album/${id}`}>
      <a>
        <div className={styles.card}>
          <h3> {albumName} &rarr;</h3>
      </div>
      </a>
    </Link>
  )
}