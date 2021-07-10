import Head from 'next/head'
import '../styles/globals.css'
import url from '../config/url'
import Footer from '../components/Footer'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/favicon.svg" />
        <title>My Life</title>
      </Head>
      <Component {...pageProps} API_URL={url()}/>
      <Footer />
    </>
  )
}

export default MyApp
