export const INCREMENT = 'INCREMENT'
export const DECREMENT = 'DECREMENT'
export const RESET = 'RESET'


export interface IncrementI {
  type: typeof INCREMENT,
}

export interface DecrementI {
  type: typeof DECREMENT,
}

export interface ResetI {
  type: typeof RESET,
}

export type CounterDispatchTypes = IncrementI | DecrementI | ResetI
