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
  const router = useRouter()
  // I originally formatted the data before it was passed as props
  // but this caused the function to loop infinitely.
  // putting it useffect ensures it is only ran once
  /*
  const [galleryData, setgalleryData] = useState([])
  useEffect(()=>{
    setgalleryData(formatData(data))
  }, [])
  */
  if(router.isFallback) {
    return (
      <div>
        <CircularProgress />
        Loading...
      </div>
    )
  }

  return(
    <div>
      <Link href='/'>
        <a> <HomeIcon /> </a>
      </Link>
      <div className={styles.container}>
        <PhotoGallery columns={data} API_URL={API_URL}/>
      </div>
    </div>
  )
}

export default Album