
import { configureStore } from '@reduxjs/toolkit'
import sliceUtilisateur from './sliceUtilisateur'

export const store = configureStore({
    reducer: {
        user: sliceUtilisateur
    }
})