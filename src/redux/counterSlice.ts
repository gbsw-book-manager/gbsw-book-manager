import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'

// Define a type for the slice state
interface CounterState {
  value: boolean
}

// Define the initial state using that type
const initialState: CounterState = {
  value: false
}

export const counterSlice = createSlice({
  name: 'counter',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    isAdmin: state => {
      state.value = true
    }
    // Use the PayloadAction type to declare the contents of `action.payload`
  }
})

export const { isAdmin } = counterSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.counter.value

export default counterSlice.reducer