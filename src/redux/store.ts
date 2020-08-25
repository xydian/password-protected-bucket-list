import { configureStore, createSlice, Action, ThunkAction } from '@reduxjs/toolkit'
import { appReducer } from './appReducer'

export const store = configureStore({
  reducer: appReducer
})

export type RootState = ReturnType<typeof appReducer>
export type AppDispatch = typeof store.dispatch
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>