import {
  INCREMENT,
  DECREMENT,
  RESET,
  CounterDispatchTypes
} from '../types/ssrTypes'


interface InitialStateI {
  counter: number
}

const initialState: InitialStateI = {
  counter: 0
}

const SsrReducer = (state: InitialStateI = initialState, { type }: CounterDispatchTypes): InitialStateI => {
  switch (type) {
    case INCREMENT:
      return {
        counter: state.counter + 1
      }
    case DECREMENT:
      return {
        counter: state.counter - 1
      }
    case RESET:
      return initialState
    default:
      return state
  }
}

export default SsrReducer
