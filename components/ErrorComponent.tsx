import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import styles from '../styles/Home.module.css'

export default function ErrorComponent ({ errorMsg, redirect }) {
  if(redirect) {
    const [ seconds, setSeconds ] = useState(5)
    useEffect(()=>{

    }, [])
  }
  return (
    <div className={styles.container}>
      <main className={styles.main}>
          <h1 className={styles.title}> Invalid Request </h1>
          <p className={styles.description}>
            Reason: {errorMsg}
          </p>
          <p className={styles.description}> Please contact the admin for help.</p>
      </main>
    </div>
  )
}