import styles from '../styles/Home.module.css'
import Link from 'next/link'
export default function AlbumCard({ albumName, id }) {
  console.log(id)
  return (
    <div className={styles.card}>
      <Link href={`/album/${id}`}>
        <a>
          <h3> {albumName} &rarr;</h3>
        </a>
      </Link>
    </div>
  )
}