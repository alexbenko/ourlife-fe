import { InferGetStaticPropsType } from 'next'
import Link from 'next/link'
import styles from '../../styles/Home.module.css'
import HomeIcon from '@material-ui/icons/Home'

// TODO: create a config that will export either the url of the localhost if in dev or the server url if in production
// https://stackoverflow.com/questions/64309158/nextjs-env-variable-is-always-undefined
export const getStaticProps = async ({ params }) => {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + `api/albums/${params.albumId}`)
  const data = await res.json()

  return {
    props: {
      data,
    },
    revalidate: 30
  }
}

export async function getStaticPaths() {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + 'api/albums/all')
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
         {data.map((image) => <img style={{maxWidth:'20%', maxHeight: '20%'}} src={process.env.NEXT_PUBLIC_API_URL + '/photos/' + image.img_url}></img>)}
       </div>
      </div>
    </>
  )
}

export default Album