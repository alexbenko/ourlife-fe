import { useEffect , useState } from 'react'
import Head from 'next/head'
import useSWR from 'swr'
import CircularProgress from '@material-ui/core/CircularProgress';

import styles from '../styles/Home.module.css'
import AlbumCard from '../components/AlbumCard'


export default function Home() {
  const [ albumsInfo, setAlbumsInfo ] = useState([])

  const fetcher = (url : string) => fetch(url).then(r => r.json())
  const { data, error } = useSWR('http://localhost:8080/api/albums/all', fetcher)
  // TODO: When deploying to production, create an environemnt variable in vercel that will store the url for the other server
  if (data) console.log(data)

  return (
    <div className={styles.container}>
      <Head>
        <title>Our Life</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Our Life
        </h1>

        <p className={styles.description}>
          Fry, we have a crate to deliver. The alien mothership is in orbit here. If we can hit that bullseye, the rest of the dominoes will fall like a house of cards. Checkmate. Oh, how I wish I could believe or understand that! There's only one reasonable course of action now: kill Flexo!
          (This is where i will put a little description describing the site.)
        </p>

        {
          !data ? <CircularProgress /> :
          <div className={styles.grid}>
            {data.map((album,i) => <AlbumCard albumName={album.album_name} id={album.id} key={i}/>)}
          </div>
        }
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}

/*
export const getServerSideProps: GetServerSideProps = async (context) => {
    const res = await fetch('http://localhost:8080/api/albums/all') // TODO : When deplying to production changes this to an environment variable for image microservice server
    const data = await res.json()
}
*/
