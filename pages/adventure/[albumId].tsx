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
      data: data.data,
      albumId: params.albumId
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


const Album = ({ data, API_URL, albumId }) => {
  const router = useRouter()

  if(router.isFallback) {
    return (
      <div>
        <CircularProgress />
        Loading...
      </div>
    )
  }

  if(typeof window !== 'undefined') {
    // i only want this post request to execute if this is running in browser
    fetch(API_URL + '/api/webhook/visit/' + albumId, {
      method: 'POST'
    })
  }
  return(
    <div className={styles.container}>
      <main className={styles.main}>
        <div>
          <h1 className={styles.title}>{data.displayName}</h1>
          <p style={{color: '#8a8f98'}}>Visits: {data.visits}</p>
        </div>
        <PhotoGallery columns={data.album} API_URL={API_URL}/>
      </main>
    </div>
  )
}

export default Album