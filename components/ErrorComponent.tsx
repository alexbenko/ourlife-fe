import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import styles from '../styles/Home.module.css'

export default function ErrorComponent ({ errorMsg, redirect }) {
  const [ seconds, setSeconds ] = useState(5)
  const router = useRouter()

  if (redirect) {
    useEffect(()=>{
      const timeout = setInterval(()=>{
        setSeconds(seconds => seconds - 1)
      }, 1000) // every second
      return ()=> clearInterval(timeout)
    }, [])

    useEffect(() => {
      if(seconds === 0) {
        router.push('/')
      }
    }, [seconds])
  }
  return (
    <div className={styles.container}>
      <h1 className={styles.title}> Invalid Request </h1>
      <p className={styles.description}>
        Reason: {errorMsg}
      </p>
      <p className={styles.description}> Please contact the admin for help.</p>
      { redirect &&
        <p>
          Redirecting in {seconds}
        </p>
      }
    </div>
  )
}