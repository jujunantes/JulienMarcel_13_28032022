import { createSlice } from '@reduxjs/toolkit'

const sliceUtilisateur = createSlice({
  // le nom du slice
  name: 'user',
  // le state initial
  initialState: {
    user: {},
    token: '',
    connected: false,
  },
  // reducers permet de définir les actions et le reducer
  reducers: {
    login: (state, action) => {
      state.token = action.payload
    },
    logout: (state) => {
      state.connected = false
      state.token = ''
      state.user = {}
      localStorage.clear()
    },
    setUser: (state, action) => {
      state.user = action.payload
      state.connected = true
    },
    updateUser: (state, action) => {
      state.user._firstName = action.payload._firstName
      state.user._lastName = action.payload._lastName
    }
  }
})

// on extrait les actions et le reducer
const { actions, reducer } = sliceUtilisateur
// on export chaque action individuellement
export const { login, logout, setUser, updateUser } = actions
// on export le reducer comme default export
export default reducer