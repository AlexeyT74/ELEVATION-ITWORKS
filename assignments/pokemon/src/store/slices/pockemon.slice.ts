import { configureStore, createSlice } from '@reduxjs/toolkit'
import type { Pockemon, PockemonCard } from '../../types'

type PockemonState = {
    pockemonList: Pockemon[]
    currentPockemon: Pockemon | null
    cardsList: PockemonCard[]
  }

 const initialState: PockemonState = {
    pockemonList: [],
    currentPockemon: null,    
    cardsList: []
  }

const pockemonSlice = createSlice({
  name: 'pockemon',
  initialState,
  reducers: {
    incremented: state => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1
    },
    decremented: state => {
      state.value -= 1
    }
  }
})

export const { incremented, decremented } = pockemonSlice.actions
export default pockemonSlice.reducer


const store = configureStore({
    reducer: pockemonSlice.reducer
  })
  
  // Can still subscribe to the store
  store.subscribe(() => console.log(store.getState()))
  
  // Still pass action objects to dispatch, but they're created for us
  store.dispatch(incremented())
  // {value: 1}
  store.dispatch(incremented())
  // {value: 2}
  store.dispatch(decremented())
  // {value: 1}
