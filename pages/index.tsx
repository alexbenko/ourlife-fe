import useSWR from 'swr'
import CircularProgress from '@material-ui/core/CircularProgress'

import styles from '../styles/Home.module.css'
import AlbumCard from '../components/AlbumCard'
export default function Home({ API_URL }) {
  const fetcher = (url : string) => fetch(url).then(r => r.json())
  const { data, error } = useSWR(API_URL + '/api/albums/all', fetcher)

  if(error && process.env.NODE_ENV === 'development') {
    alert(error)
  }
  return (
    <div className={styles.container}>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to My Life
        </h1>

        <p className={styles.description}>
          Fry, we have a crate to deliver. The alien mothership is in orbit here. If we can hit that bullseye, the rest of the dominoes will fall like a house of cards. Checkmate. Oh, how I wish I could believe or understand that! There's only one reasonable course of action now: kill Flexo!
          (This is where i will put a little description describing the site.)
        </p>

        {
          !data ? <CircularProgress /> :
          <div className={styles.grid}>
            {data.map((album,i) => <AlbumCard albumName={album.displayname} id={album.id} key={i}/>)}
          </div>
        }
      </main>

    </div>
  )
}