import { useState } from 'react'
import styles from '../styles/Home.module.css'
import InputField from '../components/InputField'
import CloseIcon from '@material-ui/icons/Close'
import CheckIcon from '@material-ui/icons/Check'

const PasswordCreation = ({ value, setValue }) => {
  const validation = {
    length: {
      text : 'Must have at least 8 characters.',
      valid: () => value.length >= 8
    },
    upperCase: {
      text: 'Must have at least one uppercase letter.',
      valid: () => /[A-Z]/.test(value)
    },
    lowerCase: {
      text: 'Must have at least one lowercase letter.',
      valid: () => /[a-z]/.test(value)
    },
    digit: {
      text: 'Must have at least one digit.',
      valid: () => /\d/.test(value)
    },
    symbol : {
      text: 'Must have at least one symbol (#?!@$%^&*-).',
      valid:() => /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/.test(value)
    }
  }

  return (
    <>
      <InputField
        value={value}
        onChange={(event) => setValue(event.target.value)}
        label='Password'
        error={validation}
      />
      <div>
        {Object.keys(validation).map((key, i) =>{
          return(
          <p key={i}> {validation[key].valid() ? <CheckIcon style={{ color: 'green' }}/> : <CloseIcon style={{ color: 'red' }}/>}
            {validation[key].text}
          </p>
          )
        })}
      </div>
    </>
  )
}

export default PasswordCreation
