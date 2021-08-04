import { useEffect, useState } from 'react'
import Link from 'next/link'
import HomeIcon from '@material-ui/icons/Home'
import url from '../../config/url'
import styles from '../../styles/Home.module.css'

import PhotoGallery from '../../components/PhotoGallery'

export const getStaticProps = async ({ params }) => {
  const API_URL = url()
  const res = await fetch(API_URL + `/api/albums/${params.albumId}`)
  let data = await res.json()
  // TODO: Add a join on the backend so it will pull the album info as well as all the image paths for that
  return {
    props: {
      data,
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

  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: 'true' }
}


const Album = ({ data, API_URL }) => {
  const formatData = (imageData : [{}]) =>{
    // i want an array with 4 sub arrays of similar length
    const amountPerColumn = Math.floor(imageData.length / 4)
    let formatted = []
    while(imageData.length) {
      let chunk = imageData.splice(0, amountPerColumn)
      formatted.push(chunk)
    }

    return formatted
  }

  // I originally formatted the data before it was passed as props
  // but this caused the function to loop infinitely.
  // putting it useffect ensures it is only ran once
  const [galleryData, setgalleryData] = useState([])
  useEffect(()=>{
    setgalleryData(formatData(data))
  }, [])
  return(
    <>
      <Link href='/'>
        <a> <HomeIcon /> </a>
      </Link>
      <div className={styles.container}>
        <PhotoGallery columns={galleryData} API_URL={API_URL}/>
      </div>
    </>
  )
}

export default Album