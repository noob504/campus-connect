import React from "react"
import api from "../api"
import { useSignIn } from 'react-auth-kit'

const SignInComponent = () => {
  const signIn = useSignIn()
  const [formData, setFormData] = React.useState({ email: '', password: '' })

  const onSubmit = (e) => {
    e.preventDefault()
    api.post('/sigin', {}, { params: formData })
      .then((res) => {
        if (res.status === 200) {
          if (signIn(
            {
              secret_token: res.data.secret_token,
              expiresIn: res.data.expiresIn,
              tokenType: "Bearer",
              // authState: res.data.authUserState,
              // refreshToken: res.data.refreshToken,                    // Only if you are using refreshToken feature
              // refreshTokenExpireIn: res.data.refreshTokenExpireIn     // Only if you are using refreshToken feature
            }
          )) { // Only if you are using refreshToken feature
            // Redirect or do-something
          } else {
            //Throw error
          }
        }
      })
  }

  return (
    <form onSubmit={onSubmit}>
      <input type={"email"} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
      <input type={"password"} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />

      <button>Submit</button>
    </form>
  )
}

export default SignInComponent
