// 3rd party
import { useState, useEffect } from 'react'
import Head from 'next/head'

//icons
import HomeIcon from '@material-ui/icons/Home'
import ExploreIcon from '@material-ui/icons/Explore'
import PersonIcon from '@material-ui/icons/Person'
import MailIcon from '@material-ui/icons/Mail';
//1st party
import '../styles/globals.css'
import url from '../config/url'
import Footer from '../components/Footer'
import MobileNav from '../components/MobileNav'
import NavBar from '../components/NavBar'

// if you are unfamiliar with Nextjs, _app is a wrapper around every page
function MyApp({ Component, pageProps }) {
  const [ isMobile, setIsMobile ] = useState(false)
  const [ screenSize, setScreenSize ] = useState({
    width: 0,
    height: 0
  })

  // detects resize to rerender navmenu in case the user changes window size
  useEffect(()=>{
    function handleResize(){
      console.log('resize')
      console.log(window.innerWidth)
      setScreenSize({
        height: window.innerHeight,
        width: window.innerWidth
      })
    }

    if(typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize)

      return () =>{
        window.removeEventListener('resize', handleResize)
      }
    }
  })

  // detects if client is using a mobile browser
  useEffect(()=>{
    const mobileCheck = () =>{
      const toMatch = [
        /Android/i,
        /webOS/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i
    ];

    return toMatch.some((toMatchItem) => {
        return navigator.userAgent.match(toMatchItem);
    });
    }
    setIsMobile(mobileCheck())
  })

  const navLinks = [
    {text: 'Home', url: '/', icon: <HomeIcon />},
    {text: 'Adventures', url: '/adventures', icon: <ExploreIcon />},
    {text: 'About', url: '/about', icon: <PersonIcon />},
    {text: 'Contact', url: '/contact', icon: <MailIcon />}
  ]
  console.log('Mobile Device: ', isMobile)
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/favicon.svg" />
        <title>Our Life</title>
      </Head>

      {isMobile ? <MobileNav navLinks={navLinks}/> : <NavBar navLinks={navLinks}/>}
        <Component {...pageProps} API_URL={url()} isMobile={isMobile}/>

        <Footer links={navLinks}/>
    </>
  )
}

export default MyApp
