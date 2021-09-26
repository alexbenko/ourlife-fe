import styles from '../styles/inputfield.module.css'
import { useState } from 'react'

export default function InputField({ label, onChange, value, error }){
  const [ active, setActive] = useState(false)
  return(
    <div className={styles.inputContainer}>
      <input  type='text' value={value} onChange={(e)=>{
          onChange(e)
          if(value !== ''){
            setActive(true)
          } else {
            setActive(false)
          }
        }}
      />
      <label style={{transform: active ? 'translate(0, 12px) scale(0.75)' : undefined}} htmlFor="text">
        { label }
      </label>
    </div>
  )
}