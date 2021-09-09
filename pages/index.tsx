import styles from '../styles/Home.module.css'
import url from '../config/url'
import ErrorComponent from '../components/ErrorComponent'
import ImgWithText from '../components/ImgWithText'
import Link from 'next/link'


export async function getServerSideProps(context) {
  const API_URL = url()
  const req = await fetch(API_URL + '/api/albums/fe/index')
  const res = await req.json()

  if(!res.success) {
    return {
      props: { success: false, msg: res.error}
    }
  }
  return {
    props: { data: res.data, success: true}
  }
}

export default function Home(props) {
  if(!props.success) {
    return <ErrorComponent errorMsg={props.msg } redirect={false} helpMsg={false}/>
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
          <h2 style={{textAlign: 'center'}}> Adventures </h2>
          <div className={styles.grid}>
            {props.data.map((adv, i) => {
              return(
                <Link href={`/adventure/${adv.id}`}>
                  <a>
                    <ImgWithText src={`${props.API_URL}/photos${adv.thumbnail}`} text={adv.displayname}/>
                  </a>
                </Link>
              )
            })}
          </div>
      </main>
    </div>
  )
}