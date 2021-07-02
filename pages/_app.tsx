import '../styles/globals.css'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  // REMOVE THE CONTENT SECURITY POLICY once i add ssl to my microservice
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
