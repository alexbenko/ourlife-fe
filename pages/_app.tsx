import '../styles/globals.css'
import Head from 'next/head'
import url from '../config/url'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <Component {...pageProps} API_URL={url()}/>
    </>
  )
}

export default MyApp
