import axios from 'axios'
import Link from 'next/Link'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Box } from '@material-ui/core';
import { incrementCount, decrementCount, resetCount } from '../actions/ssrActions'
import styles from '../styles/SsrPage.module.css'
import { RootStore } from '../store/store'

const SsrPage = () => {
  const dispatch = useDispatch()
  const { counter } = useSelector((state: RootStore) => state.ssr)

  return (
    <div className={styles.container}>
      <div>SSR PAGE</div>
      <h1>You are now logged in</h1>
      <Link href='/'>
        <div className={styles.link}> Back to homepage </div>
      </Link>

      <p> Counter: {counter} </p>
      <Box m={2}>
        <Button color="primary" variant="contained" onClick={() => dispatch(incrementCount())}>Increment +1</Button>
      </Box>
      <Box m={2}>
        <Button color="primary" variant="contained" onClick={() => dispatch(decrementCount())}>Decrement -1 </Button>
      </Box>
      <Box m={2}>
        <Button color="primary" variant="contained" onClick={() => dispatch(resetCount())}>Reset 0</Button>
      </Box>

    </div >
  )
}

SsrPage.getInitialProps = async () => {
  try {
    const response = await axios.get('https://api.github.com/repos/zeit/next.js')
    return {
      ssr: {
        counter: response.data.stargazers_count
      }
    }

  } catch (err) {
    console.log(err)
  }
}

export default SsrPage
