import { useState,useEffect } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';

export default function ImgComponent({ srcUrl, className, keyNum}){
  const [ loaded, setLoaded ] = useState(false)
  const render = () => {
    setLoaded(true)
  }
    return(
      <>
        <img key={keyNum} loading='lazy' className={className}  onLoad={()=> render()} src={srcUrl}/>
        {!loaded && <CircularProgress />}
      </>
    )
}