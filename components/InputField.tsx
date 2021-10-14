import styles from '../styles/inputfield.module.css'

export default function InputField({ label, onChange, value, error, field }){
  return(
    <div className={styles.inputContainer}>
      <input  type='text' value={value} onChange={(e)=> onChange(e, field)}/>
      <label style={{transform: value !== '' ? 'translate(0, 12px) scale(0.75)' : undefined}} htmlFor="text">
        { label }
      </label>
    </div>
  )
}