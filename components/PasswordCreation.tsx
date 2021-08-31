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
    length: () => value.length >= 8,
    oneUppercase: () => /^[A-Z]$/.test(value),
    oneLowercase: () => /[a-z]/.test(value),
    oneDigit: () => /\d/.test(value),
    oneSymbol: () => /-+_!@#$%^&*.,?/.test(value)
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
    setValue(event.target.value)

    let copyValidation = { ...validation }
    for(const key in validateInput) {
      console.log(key, validateInput[key]())
      copyValidation[key] = validateInput[key]()
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
        helperText='Password'
      />
      <div>
        {Object.keys(validation).map((key) =>{
          return(
          <p> {validation[key] ? <CheckIcon /> : <CloseIcon />} {helperText[key]} </p>
          )
        })}
      </div>
    </>
  )
}

export default PasswordCreation
