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

        (Site Under Development)

        {
          !data ? <CircularProgress /> :
          <div className={styles.grid}>
            {data.map((album,i) => <AlbumCard API_URL={API_URL} albumName={album.displayname} id={album.id} thumbnail={album.thumbnail} key={i}/>)}
          </div>
        }


    </div>
  )
}