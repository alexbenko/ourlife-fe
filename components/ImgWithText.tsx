import styles from '../styles/imgWithText.module.css'
export default function ImgWithText({ src, text}) {
  return(
    <div className={styles.imgTextContainer}>
      <img src={src}/>
      <div className={styles.textContainer}>
        <h4>{text}</h4>
      </div>
    </div>
  )
}