import { useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField';

import styles from '../../styles/Home.module.css'
import url from '../../config/url'
import ErrorComponent from '../../components/ErrorComponent'


export async function getServerSideProps({ params }) {
  const API_URL = url()
  const { token } = params

  const res = await fetch(`${API_URL}/api/auth/verifytoken/${token}`, {
    method: 'POST'
  })

  const data = await res.json()
  if (!data.success) {
    return {
      props: { error: true, errorMsg: data?.error || 'Unknown'}
    }
  }
  return {
    props: { success: true}
  }
}

const Signup = ( props ) => {
  if(props.error) {
    return <ErrorComponent errorMsg={props.errorMsg} redirect={true}/>
  } else {
    return(
      <div className={styles.container}>
        <TextField
          error
          id="standard-error-helper-text"
          label="Error"
          defaultValue="Hello World"
          helperText="Incorrect entry."
        />
      </div>
    )
  }
}

export default Signup