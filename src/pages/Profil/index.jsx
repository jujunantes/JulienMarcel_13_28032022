import React, { useEffect, useState } from 'react'
import PiedDePage from "../../composants/PiedDePage"
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../../features/User/sliceUtilisateur'

function Profil() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [chargement, setChargement] = useState(false)
    const token = JSON.parse(localStorage.getItem('JWTutilisateur'))
    const utilisateur = useSelector(state => state.user)

    useEffect(() => {
        const donneesUtilisateur = async () => {
            setChargement(true)
            try {
                const {data: res} = await Axios.post('http://localhost:3001/api/v1/user/profile', null, {
                    headers: {
                    'Authorization': `Bearer ${token}` 
                    }
                })
                dispatch(setUser({...res, email:res.body.email, firstName:res.body.firstName, lastName:res.body.lastName }))
                setChargement(false)
            } catch (e) {
            if (e.response) {
                throw new Error(e.response.data.message)
            }
            throw new Error(`Erreur: ${e.message}`)
            }
        }
        donneesUtilisateur()
    }, [navigate, dispatch, token])

  return (
      <div>
          {chargement ? (<div>Chargement...</div>) : (
             <div>
      <section className="main bg-dark">
        <div className="header">
            <h1>Welcome back<br /> {utilisateur.firstName} {utilisateur.lastName}!</h1>
            <button className="edit-button">Edit Name</button>
        </div>

      </section>
      <PiedDePage />
    </div>
        )}
      </div>
    
   
  )
}

export default Profil