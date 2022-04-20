import React, { useEffect, useState } from 'react'
import PiedDePage from "../../composants/PiedDePage"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../../features/User/sliceUtilisateur'

function Profil() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [chargement, setChargement] = useState(false)
    const utilisateur = useSelector(state => state.user)
    const token = utilisateur.token || JSON.parse(localStorage.getItem('JWTutilisateur'))

    useEffect(() => {
        const donneesUtilisateur = async () => {
            setChargement(true)
            try {
                const {data: res} = await axios.post('http://localhost:3001/api/v1/user/profile', null, {
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
                    {/* Placeholder data from the mockup */}
                    <h2 class="sr-only">Accounts</h2>
                    <section class="account">
                        <div class="account-content-wrapper">
                        <h3 class="account-title">Argent Bank Checking (x8349)</h3>
                        <p class="account-amount">$2,082.79</p>
                        <p class="account-amount-description">Available Balance</p>
                        </div>
                        <div class="account-content-wrapper cta">
                        <button class="transaction-button">View transactions</button>
                        </div>
                    </section>
                    <section class="account">
                        <div class="account-content-wrapper">
                        <h3 class="account-title">Argent Bank Savings (x6712)</h3>
                        <p class="account-amount">$10,928.42</p>
                        <p class="account-amount-description">Available Balance</p>
                        </div>
                        <div class="account-content-wrapper cta">
                        <button class="transaction-button">View transactions</button>
                        </div>
                    </section>
                    <section class="account">
                        <div class="account-content-wrapper">
                        <h3 class="account-title">Argent Bank Credit Card (x8349)</h3>
                        <p class="account-amount">$184.30</p>
                        <p class="account-amount-description">Current Balance</p>
                        </div>
                        <div class="account-content-wrapper cta">
                        <button class="transaction-button">View transactions</button>
                        </div>
                    </section>
                </section>
                <PiedDePage />
            </div>
        )}
      </div>   
  )
}

export default Profil