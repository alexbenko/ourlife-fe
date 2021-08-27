import styles from '../styles/Gallery.module.css'
import ImgComponent from './ImgComponent'

export default function PhotoGallery({ columns, API_URL }){
  return(
    <div className={styles.gallery}>
      {columns.map((column, i) => {
        return(
          <div className={styles.column} key={i}>
            {column.map((img) => <ImgComponent keyNum={i} className={styles.column_img} srcUrl={API_URL + '/photos' + img.imgurl}/>)}
          </div>
        )
      })}
    </div>
  )
}