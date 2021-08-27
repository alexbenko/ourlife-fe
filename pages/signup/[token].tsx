import url from '../../config/url'
import ErrorComponent from '../../components/ErrorComponent'


export async function getServerSideProps({ params }) {
  const API_URL = url()
  const { token } = params

  const res = await fetch(`${API_URL}/api/auth/verifytoken/${token}`, {
    method: 'POST'
  })

  const data = await res.json()
  if (!data.success) {
    console.log(data.error)
    return {
      props: { error: true, errorMsg: data.error}
    }
  }
}

const Signup = ( props ) => {
  console.log(props.error)
  if(props.error) {
    return <ErrorComponent errorMsg={props.errorMsg} redirect={true}/>
  } else {
    return(
      <div>
        Signup
      </div>
    )
  }
}

export default Signup