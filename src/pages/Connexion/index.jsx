import NavBar from '../../composants/NavBar'
import PiedDePage from "../../composants/PiedDePage"
import '../../styles/main.css'
import { login } from '../../features/User/sliceUtilisateur'
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from 'react-redux'
import axios from "axios"


export default function Connexion() {
    const [donnees, modifDonnees] = useState({ email: '', password: '' })
    const [rememberMe, setRememberMe] = useState(false)
    const [erreur, setErreur]= useState("")

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const envoiConnexion = async (e) => {
        e.preventDefault()
        try{
            const url = 'http://localhost:3001/api/v1/user/login'
            const {data: res} = await axios.post(url, donnees)
            dispatch(login({...res, token:res.body.token }))
            if (rememberMe){
                localStorage.setItem('JWTutilisateur', JSON.stringify(res.body.token))
                console.log('remember me')
            }
            navigate('/profil')
        } catch (error){
            setErreur(error.message)
        }
    }

  return (
    <div className="mainConnexion">
        <NavBar />
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
                        <input type="checkbox" id="remember-me" onClick={() => setRememberMe(!rememberMe)} /><label htmlFor="remember-me">Remember me</label>
                    </div>
                    {erreur && <div className="erreurConnexion">{'Error : ' + erreur}</div>}
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