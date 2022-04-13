import PiedDePage from "../../composants/PiedDePage"
import '../../styles/main.css'
import { useRef, useState } from 'react'
import { profile } from '../../utils/sliceUtilisateur'

function Connexion() {
    const email = useRef();
    const password = useRef();
    const [error, setError] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();

    const envoiConnexion = (e) => {
        e.preventDefault()
        const dataForm = {
            email: email.current.value,
            password: password.current.value
        }
        Axios('login', dataForm)
            .then((userData) => {
                SetUserData(userData)
            })
            .catch(() => {
                setError(true)
            })
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
                        <input type="text" id="username" />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" />
                    </div>
                    <div className="input-remember">
                        <input type="checkbox" id="remember-me" /><label htmlFor="remember-me">Remember me</label>
                    </div>
                    {/*<!-- PLACEHOLDER DUE TO STATIC SITE -->*
                    <a href="./user.html" className="sign-in-button">Sign In</a>/}
                    {/*<!-- SHOULD BE THE BUTTON BELOW -->
                    <!-- <button className="sign-in-button">Sign In</button> -->
                    <!--  -->*/}
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

export default Connexion