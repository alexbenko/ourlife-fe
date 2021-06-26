import { InferGetStaticPropsType } from 'next'
import Link from 'next/link'
import styles from '../../styles/Home.module.css'
import HomeIcon from '@material-ui/icons/Home'

export const getStaticProps = async ({ params }) => {
  const res = await fetch(`http://localhost:8080/api/albums/${params.albumId}`)
  const data = await res.json()

  return {
    props: {
      data,
    },
    revalidate: 30
  }
}

export async function getStaticPaths() {
  const res = await fetch('http://localhost:8080/api/albums/all')
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


const Album = ({ data }) => {
  return(
    <>
      <Link href='/'>
        <a> <HomeIcon /> </a>
      </Link>
      <div className={styles.container}>
       <div className={styles.grid}>
         {data.map((image) => <img style={{maxWidth:'20%', maxHeight: '20%'}} src={'http://localhost:8080/photos/' + image.img_url}></img>)}
       </div>
      </div>
    </>
  )
}

export default Album