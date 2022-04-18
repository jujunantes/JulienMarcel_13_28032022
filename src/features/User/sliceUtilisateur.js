import { createSlice  } from '@reduxjs/toolkit'

const sliceUtilisateur = createSlice({
  // le nom du slice
  name: 'user',
  // le state initial
  initialState: {
    prenom : '',
    nom: '',
    email: '',
    password: '',
    token: '',
    connected: false
  },
  // reducers permet de définir les actions et le reducer
  reducers: {
    login: (state, action) => {
      console.log(action)
      state.email = action.payload.email
      state.token = action.payload.token
      state.connected = true
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