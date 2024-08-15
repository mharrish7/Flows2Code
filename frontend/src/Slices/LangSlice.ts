import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store';

// Define a type for the slice state
export interface LangState {
  value: string
}

// Define the initial state using that type
const initialState: LangState = {
  value: "python"
}

export const langSlice = createSlice({
  name: 'lang',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setlang: (state, action: PayloadAction<string>) => {
      state.value = action.payload
    }
  }
})

export const { setlang } = langSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.lang.value

export default langSlice.reducer