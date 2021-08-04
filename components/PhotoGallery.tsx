import styles from '../styles/Gallery.module.css'

export default function PhotoGallery({ columns, API_URL }){
  return(
    <div className={styles.gallery}>
      {columns.map(column => {
        return(
          <div className={styles.column}>
            {column.map((img, i:number) => <img loading='lazy' key={i} className={styles.column_img} src={API_URL + '/photos' + img.imgurl}/>)}
          </div>
        )
      })}
    </div>
  )
}