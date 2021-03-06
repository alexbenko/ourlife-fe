import styles from '../styles/Home.module.css'
import Link from 'next/link'

export default function AlbumCard({ albumName, id }) {
  if (albumName) {
    return (
      <Link href={`/adventure/${id}`}>
        <a>
          <div className={styles.card} /*style={{backgroundImage:`url(${API_URL}/photos/${thumbnail})`}}*/>
            <h3> {albumName} &rarr;</h3>
          </div>
        </a>
      </Link>
    )
  } else {
    return null
  }
}