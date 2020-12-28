import * as types from '../types/ssrTypes'

// INCREMENT COUNTER BY 1
export const incrementCount = (): types.IncrementI => ({ type: types.INCREMENT })

// DECREMENT COUNTER BY 1
export const decrementCount = (): types.DecrementI => ({ type: types.DECREMENT })

// RESET COUNTER
export const resetCount = (): types.ResetI => ({ type: types.RESET })