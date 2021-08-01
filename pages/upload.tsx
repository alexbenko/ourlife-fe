import { useState, useEffect } from 'react'
import styles from '../styles/Home.module.css'

const albumId = 1

export default function Upload({ API_URL }){
  const [url, setUrl] = useState('')
  const [form, setForm] = useState(null)
  useEffect(() => {
    console.log(form)
  }, [form])
  // make it so it displays uploaded image is displayed after successful upload
  const prepareImage = async (event) => {
    event.preventDefault()
    if(!event.target.files[0]) {
      alert('Please Upload a Valid File')
      return
    }

    const image = event.target.files[0]
    const formData = new FormData()
    formData.append('file', image)

    const upload = await fetch(`${API_URL}/api/upload/single/${albumId}`, {
      method: 'post',
      body: formData
    })

    const res = await upload.json()
    alert('Image Successfully Uploaded. Loading It Now.')
    setUrl(res.url)
  }

  const uploadImage = async () => {
    if(!form) {
      alert('Upload an Image before Submitting')
      return
    }

    const upload = await fetch(`${API_URL}/api/upload/single/${albumId}`, {
      method: 'post',
      body: form,
      headers: {
        'Accept': 'multipart/form-data'
      }
    })

    const res = await upload.json()
    alert('Image Successfully Uploaded. Loading It Now.')
    setUrl(res.url)
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <input type='file' name='file' onChange={e => prepareImage(e)}/>
        <button onClick={uploadImage}> Submit </button>
        { url &&
          <img src={API_URL + url}></img>
        }
      </main>
    </div>
  )
}