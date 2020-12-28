import { useState } from 'react'
import Router from 'next/router'
import { TextField, Box, Button } from '@material-ui/core'
import styles from '../styles/Login.module.css'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmitClick = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    if (email && password) {
      localStorage.setItem('myToken', JSON.stringify(new Date().getTime()))
      Router.push('/ssr-page')
    }
  }

  return (
    <div className={styles.loginContainer}>
      <form className={styles.loginForm} noValidate autoComplete="off" onSubmit={onSubmitClick}>
        <h1 className={styles.title}> LOGIN </h1>
        <Box m={2}>
          <TextField id="email" label="Email" value={email} onChange={(evt: React.ChangeEvent<HTMLInputElement>) => setEmail(evt.target.value)} />
        </Box>
        <Box m={2}>
          <TextField id="password" label="Password" value={password} onChange={(evt: React.ChangeEvent<HTMLInputElement>) => setPassword(evt.target.value)} />
        </Box>
        <Box m={2}>
          <Button color="primary" variant="contained" type="submit" className={styles.loginButton} disabled={!email || !password}>
            Login
          </Button>
        </Box>
      </form>
    </div >
  )
}
export default Login
