import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface AppState {
  darkMode: boolean
}

const initialState: AppState = {
  darkMode: false
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toggleDarkMode(state){
      state.darkMode = !state.darkMode
    }
  }
})

export const { actions: appActions, reducer: appReducer } = appSlice
export const { 
  toggleDarkMode,
} = appActions