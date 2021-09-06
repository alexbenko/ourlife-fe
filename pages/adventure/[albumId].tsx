// import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import HomeIcon from '@material-ui/icons/Home'
import CircularProgress from '@material-ui/core/CircularProgress';
import url from '../../config/url'
import styles from '../../styles/Home.module.css'

import PhotoGallery from '../../components/PhotoGallery'

export async function getStaticProps ({ params }){
  const API_URL = url()
  const res = await fetch(API_URL + `/api/albums/${params.albumId}`)
  const data = await res.json()

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      data
    },
    revalidate: 30
  }
}

export async function getStaticPaths() {
  const API_URL = url()
  const res = await fetch(API_URL + '/api/albums/all')
  const albums = await res.json()

  // Get the paths we want to pre-render based on posts
  const paths = albums.map((album) => ({
    params: { albumId: album.id.toString() },
  }))

  return { paths, fallback: true }
}


const Album = ({ data, API_URL }) => {
  console.log(data)
  const router = useRouter()

  if(router.isFallback) {
    return (
      <div>
        <CircularProgress />
        Loading...
      </div>
    )
  }

  return(
    <div className={styles.container}>
      <main className={styles.main}>
        <p className={styles.title}>{data.displayName}</p>
        <PhotoGallery columns={data.album} API_URL={API_URL}/>
      </main>
    </div>
  )
}

export default Album