import { useState } from 'react'
import styles from '../styles/Home.module.css'
import TextField from '@material-ui/core/TextField'
import CloseIcon from '@material-ui/icons/Close'
import CheckIcon from '@material-ui/icons/Check'

const PasswordCreation = ({ value, setValue }) => {
  const [ validation, setValidation ] = useState({
    length: false,
    oneUppercase: false,
    oneLowercase: false,
    oneDigit: false,
    oneSymbol: false
  })

  const validateInput = {
    length: (input) => input.length >= 8,
    oneUppercase: (input) => /[A-Z]/.test(input),
    oneLowercase: (input) => /[a-z]/.test(input),
    oneDigit: (input) => /\d/.test(input),
    oneSymbol: (input) => /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/.test(input)
  }

  const helperText = {
    length: 'Must have at least 8 characters.',
    oneUppercase: 'Must have at least one uppercase letter.',
    oneLowercase: 'Must have at least one lowercase letter.',
    oneDigit: 'Must have at least one digit.',
    oneSymbol: 'Must have at least one symbol (#?!@$%^&*-).'
  }

  const changeHandler = (event) =>{
    event.preventDefault()
    // setValue(event.target.value)
    let copyValidation = { ...validation }
    for(const key in validateInput) {
      console.log(key, validateInput[key](value))
      copyValidation[key] = validateInput[key](value)
      setValidation(copyValidation)
    }
    setValidation(copyValidation)

  }
  return (
    <>
      <TextField
        value={value}
        onChange={(event) => {
          console.log('Password change')
          setValue(event.target.value)
          changeHandler(event)
        }}
        label='Password'
      />
      <div>
        {Object.keys(validation).map((key, i) =>{
          return(
          <p key={i}> {validation[key] ? <CheckIcon /> : <CloseIcon />} {helperText[key]} </p>
          )
        })}
      </div>
    </>
  )
}

export default PasswordCreation
