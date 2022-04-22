import React, { useEffect, useState, useRef } from 'react'
import PiedDePage from "../../composants/PiedDePage"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setUser, updateUser } from '../../features/User/sliceUtilisateur'

function Profil() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [chargement, setChargement] = useState(false)
    const [edition, setEdition] = useState(false)
    const [valeurs, setValeurs] = useState({})
    const utilisateur = useSelector(state => state.user)
    const token = utilisateur.token || JSON.parse(localStorage.getItem('JWTutilisateur'))
    const reffirstName = useRef('')
    const reflastName = useRef('')
    /*console.log('token :')
    console.log(token)*/
    

    const clicEditName = () => {
        console.log('edit name')
        setEdition(!edition)
    }

    const modifierlastName = (e) => {
        setValeurs({ ...valeurs, [e.target.name]: e.target.value })
        /*console.log('valeurs :')
        console.log(valeurs)*/
    }

    const modifieUtilisateur = async (token, firstName, lastName) => {
        console.log('modifieUtilisateur - token, firstName, lastName :')
        console.log(token + ',' + firstName + ',' + lastName)
        try {
          const res = await axios.put(`http://localhost:3001/api/v1/user/profile`, {token, firstName, lastName}, {
            headers: {
              'Authorization': `Bearer ${token}`
              }
            })
          const donneesUtilisateur = JSON.stringify(res.data.body)
          /*console.log('modifieUtilisateur - donneesUtilisateur :')
          console.log(donneesUtilisateur)*/
          return JSON.parse(donneesUtilisateur)
        } catch (e) {
          if (e.res) {
            throw new Error(e.res.data.message)
          }
          throw new Error(`Error: ${e.message}`)
        } 
    }

    const envoiNouveauNom = async (e) => {
        e.preventDefault()
        if (valeurs.firstName === utilisateur.firstName && valeurs.lastName === utilisateur.lastName) {
            reffirstName.current.value = ''
            reflastName.current.value = ''
            return
        }
        try {
            setChargement(true)
            const res = await modifieUtilisateur(token, valeurs.firstName, valeurs.lastName)
            /*console.log('envoiNouveauNom - res :')
            console.log(res)*/
            dispatch(updateUser(res))
            setChargement(false)
            setEdition(false)
        } catch (e) {
            console.log(e.message)
        } finally {
            reffirstName.current.value = ''
            reflastName.current.value = ''
        }
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
                            <form onSubmit={envoiNouveauNom}>
                                <div className="input-wrapper">
                                <label htmlFor="firstName"></label>
                                <input
                                    type="text"
                                    name="firstName"
                                    placeholder={utilisateur.firstName}
                                    ref={reffirstName}
                                    onChange={modifierlastName}
                                    className="account"
                                />
                                </div>
                                <div className="input-wrapper">
                                <label htmlFor="lastName"></label>
                                <input
                                    type="text"
                                    name="lastName"
                                    placeholder={utilisateur.lastName}
                                    ref={reflastName}
                                    onChange={modifierlastName}
                                    className="account"
                                />
                                </div>
                                <button className="edit-button" >Change Name</button>
                            </form>
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