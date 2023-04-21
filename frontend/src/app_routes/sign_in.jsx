import React, { useEffect } from "react"
import api from "../api"
import { useAuthUser, useSignIn, useIsAuthenticated } from 'react-auth-kit'

import { useNavigate } from "react-router-dom"

const SignInComponent = () => {
  const signIn = useSignIn();
  const [formData, setFormData] = React.useState({ email: '', password: '' });
  const navigate = useNavigate();

  const IsAuthenticated = useIsAuthenticated();

  useEffect(() => {
    if (IsAuthenticated()) {
      navigate('/secure')
    }
  }, [IsAuthenticated])


  const onSubmit = (e) => {
    e.preventDefault()
    api.post('/login', formData)
      .then((res) => {
        if (res.status === 200) {
          console.log(res)
          if (signIn(
            {
              token: res.data.token,
              expiresIn: res.data.expiresIn,
              tokenType: "Bearer",
              authState: { user: res.data.user }
            }
          )) { // Only if you are using refreshToken feature
            // Redirect or do-something
            console.log('success')
            navigate('/secure')
          } else {
            alert('error')
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
