import { useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField'

import styles from '../../styles/Home.module.css'
import signupStyles from '../../styles/signup.module.css'

import url from '../../config/url'
import InputField from '../../components/InputField'
import PasswordCreation from '../../components/PasswordCreation'
import ErrorComponent from '../../components/ErrorComponent'


export async function getServerSideProps({ params }) {
  const API_URL = url()
  const { token } = params

  const res = await fetch(`${API_URL}/api/auth/verifytoken/${token}`, {
    method: 'POST'
  })

  const data = await res.json()
  if(!data) {
    return {
      notFound : true
    }
  } else if (!data.success) {
    return {
      props: { error: true, errorMsg: data?.error || 'Unknown'}
    }
  } else {
    return {
      props: { success: true}
    }
  }
}

const Signup = ( props ) => {
  const [ fieldValues, setFieldValues ] = useState({
    fname: '',
    lname: '',
    email: ''
  })

  const [ plainTextPassword, setPlainTextPassword ] = useState('')
  const [ passwordConfirmation, setPasswordConfirmation ] = useState('')

  // text to describe each input field to user, same order as object above
  const labels = {
    fname: 'First Name',
    lname: 'Last Name',
    email: 'Email'
  }

  // backend validation happens as well. Saves requests and provides instant input feedback
  const validInputs = {
    fname: () => {
      return fieldValues.fname.length > 0
    },
    lname: () => {
      return fieldValues.lname.length > 0
    },
    email: () => {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return (re.test(fieldValues.email) && fieldValues.email.length > 0)
    }
  }

  const handleChange = (event, fieldId) => {
    event.preventDefault()
    let newFields = { ...fieldValues }
    let newValue = event.target.value
    newFields[fieldId] = newValue
    setFieldValues(newFields)
  }

  useEffect(()=>{
    console.log('parent values: ', fieldValues)
  }, [fieldValues])

  if(props.error) {
    return <ErrorComponent errorMsg={props.errorMsg} redirect={true} helpMsg={false}/>
  } else {
    return(
      <div className={styles.container}>
        <p> Welcome please fill in all fields to create an account.</p>
        {Object.keys(fieldValues).map((field, i) => {
            return(
              <InputField
                onChange={handleChange}
                key={i}
                field={field}
                label={labels[field]}
                //helperText="Incorrect entry."
                error={validInputs[field](fieldValues[field])}
                value={fieldValues[field]}
              />
            )
          })}
        <PasswordCreation value={plainTextPassword} setValue={(newValue)=>setPlainTextPassword(newValue)}/>
      </div>
    )
  }
}

export default Signup