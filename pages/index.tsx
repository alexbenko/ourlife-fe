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
        (Site still under development)
          <h2 style={{textAlign: 'center'}}> Quick Album </h2>
          <div >
            {props.isMobile ?
              <Link href={`/adventure/${props.data[0].id}`}>
                <a>
                  <ImgWithText src={`${props.API_URL}/photos${props.data[0].thumbnail}`} text={props.data[0].displayname}/>
                </a>
              </Link> :

                props.data.map((adv, i) => {
                  return(
                    <Link href={`/adventure/${adv.id}`}>
                      <a>
                        <ImgWithText src={`${props.API_URL}/photos${adv.thumbnail}`} text={adv.displayname}/>
                      </a>
                    </Link>
                  )
                })
              }
          </div>

          <p className={styles.textContainer}>
            Welcome to our life. My partner and I met {new Date().getFullYear() - 2018} years ago. We instantly bonded over our love for often spontaneous adventures. This site is a way for us to show our trips in an organized manner. So click above to quickly see an adventure or click the adventures link to see them all.
          </p>
      </main>
    </div>
  )
}