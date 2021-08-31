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


        <h2 className={styles.title}>
          Ourlife
        </h2>
        (Site Under Development)
        <p className={styles.description}>

        </p>

        {
          !data ? <CircularProgress /> :
          <div className={styles.grid}>
            {data.map((album,i) => <AlbumCard albumName={album.displayname} id={album.id} key={i}/>)}
          </div>
        }


    </div>
  )
}