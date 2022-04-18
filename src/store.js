
import { configureStore } from '@reduxjs/toolkit'
import sliceUtilisateur from './features/User/sliceUtilisateur'

export const store = configureStore({
    reducer: {
        user: sliceUtilisateur
    }
})