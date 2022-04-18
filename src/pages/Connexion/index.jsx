import PiedDePage from "../../composants/PiedDePage"
import '../../styles/main.css'
import { login } from '../../features/User/sliceUtilisateur'
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from 'react-redux'
import axios from "axios"


export default function Connexion() {
    const [donnees, modifDonnees] = useState({ email: '', password: '' })
    const [erreur,setError]= useState("")

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const envoiConnexion = async (e) => {
        e.preventDefault()
        try{
            const url = 'http://localhost:3001/api/v1/user/login'
            const {data: res} = await axios.post(url, donnees)
            dispatch(login({...donnees, token:res.body.token }))
            navigate('/profil')
        } catch (error){
            if(error.response && error.response.status >= 400 && error.response.status <= 500 ){
                setError(error.response.data.message)
            }
        }
    }

  return (
    <div className="mainConnexion">
        <main className="main bg-dark">
            <section className="sign-in-content">
                <i className="fa fa-user-circle sign-in-icon"></i>
                <h1>Sign In</h1>
                <form onSubmit={envoiConnexion}>
                    <div className="input-wrapper">
                        <label htmlFor="username">Username</label>
                        <input type="email" name="email" id="username" onChange={event => modifDonnees({ ...donnees, [event.target.name]: event.target.value })} />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" onChange={event => modifDonnees({ ...donnees, [event.target.name]: event.target.value })} />
                    </div>
                    <div className="input-remember">
                        <input type="checkbox" id="remember-me" /><label htmlFor="remember-me">Remember me</label>
                    </div>
                    <input
                        type="submit"
                        value="Sign In"
                        className="sign-in-button"
                    />
                </form>
            </section>
        </main>
      <PiedDePage />
    </div>
  )
}