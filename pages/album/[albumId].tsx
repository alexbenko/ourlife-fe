import { useState, useEffect } from 'react'
import Link from 'next/link'
import HomeIcon from '@material-ui/icons/Home'
import url from '../../config/url'
import styles from '../../styles/Home.module.css'

import PhotoGallery from '../../components/PhotoGallery'

export const getStaticProps = async ({ params }) => {
  const API_URL = url()
  const res = await fetch(API_URL + `api/albums/${params.albumId}`)
  const data = await res.json()
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
  const res = await fetch(API_URL + 'api/albums/all')
  const albums = await res.json()

  // Get the paths we want to pre-render based on posts
  const paths = albums.map((album) => ({
    params: { albumId: album.id.toString() },
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: 'blocking' }
}


const Album = ({ data, API_URL }) => {
  const formatData = (imageData : [{}]) =>{
    let formatted = []
    while(imageData.length > 0) {
      let chunk = imageData.splice(0,4)
      formatted.push(chunk)
    }

    return formatted
  }

  const [formattedData, setFormattedData] = useState([])

  useEffect(()=>{
    setFormattedData(formatData(data))
  },[])
  return(
    <>
      <Link href='/'>
        <a> <HomeIcon /> </a>
      </Link>
      <div className={styles.container}>

        <h3>Hello</h3>

        {formattedData.length ? <PhotoGallery columns={formattedData} API_URL={API_URL}/> : null}
      </div>
    </>
  )
}

export default Album