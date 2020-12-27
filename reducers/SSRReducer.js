import * as types from '../store/types'

// COUNTER REDUCER
const initialState = {
  counter: 0
}

const SSRReducer = (state = initialState, { type }) => {
  switch (type) {
    case types.INCREMENT:
      return {
        counter: state.counter + 1
      }
    case types.DECREMENT:
      return {
        counter: state.counter - 1
      }
    case types.RESET:
      return initialState
    default:
      return state
  }
}

export default SSRReducer
