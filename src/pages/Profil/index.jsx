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
    const [edition, setEdition] = useState(false)
    const [valeurs, setValeurs] = useState({})
    const utilisateur = useSelector(state => state.user)
    const token = utilisateur.token || JSON.parse(localStorage.getItem('JWTutilisateur'))
    console.log('token :')
    console.log(token)
    

    const clicEditName = () => {
        console.log('edit name')
        setEdition(!edition)
        //window.location.reload(false)
    }

    const modifierNom = () => {
        setEdition(!edition)
        setValeurs({ ...valeurs, firstName: utilisateur.firstName, lastName: utilisateur.lastName })
    }

    useEffect(() => {
        if (token === null) {
            navigate('/')
        }
        const donneesUtilisateur = async () => {
            setChargement(true)
            console.log('utilisateur profil :')
            console.log(utilisateur)
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
                    {edition ? (
                        <div className="header">
                            <h1>Edit your Name :</h1>
                            <div className="input-area">
                                <div className="input-wrapper">
                                <label htmlFor="firstName"></label>
                                <input
                                    type="text"
                                    id="firstName"
                                    placeholder={utilisateur.firstName}
                                    onChange={modifierNom}
                                    className="account"
                                />
                                </div>
                                <div className="input-wrapper">
                                <label htmlFor="lastName"></label>
                                <input
                                    type="text"
                                    id="lastName"
                                    placeholder={utilisateur.lastName}
                                    onChange={modifierNom}
                                    className="account"
                                />
                                </div>
                            </div>
                        </div>
                    ) : (
                      <div className="header">
                        <h1>Welcome back<br /> {utilisateur.firstName} {utilisateur.lastName}!</h1>
                        <button className="edit-button" onClick={clicEditName}>Edit Name</button>
                    </div>  
                    )}
                    
                    {/* Placeholder data from the mockup */}
                    <h2 className="sr-only">Accounts</h2>
                    <section className="account">
                        <div className="account-content-wrapper">
                        <h3 className="account-title">Argent Bank Checking (x8349)</h3>
                        <p className="account-amount">$2,082.79</p>
                        <p className="account-amount-description">Available Balance</p>
                        </div>
                        <div className="account-content-wrapper cta">
                        <button className="transaction-button">View transactions</button>
                        </div>
                    </section>
                    <section className="account">
                        <div className="account-content-wrapper">
                        <h3 className="account-title">Argent Bank Savings (x6712)</h3>
                        <p className="account-amount">$10,928.42</p>
                        <p className="account-amount-description">Available Balance</p>
                        </div>
                        <div className="account-content-wrapper cta">
                        <button className="transaction-button">View transactions</button>
                        </div>
                    </section>
                    <section className="account">
                        <div className="account-content-wrapper">
                        <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
                        <p className="account-amount">$184.30</p>
                        <p className="account-amount-description">Current Balance</p>
                        </div>
                        <div className="account-content-wrapper cta">
                        <button className="transaction-button">View transactions</button>
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