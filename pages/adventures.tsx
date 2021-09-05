import useSWR from 'swr'
import CircularProgress from '@material-ui/core/CircularProgress'


import styles from '../styles/Home.module.css'
import AlbumCard from '../components/AlbumCard'

export default function Adventures({ API_URL }) {
  const fetcher = (url : string) => fetch(url).then(r => r.json())
  const { data, error } = useSWR(API_URL + '/api/albums/all', fetcher)
  if(error && process.env.NODE_ENV === 'development') {
    alert(error)
  }
  return(
    <div>
      <h2>Our Adventures</h2>
      {
        !data ? <CircularProgress /> :
        <div className={styles.grid}>
          {data.map((album,i) => <AlbumCard albumName={album.displayname} id={album.id} key={i}/>)}
        </div>
      }
    </div>
  )
}