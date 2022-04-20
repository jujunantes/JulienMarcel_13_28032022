import { Link, NavLink } from 'react-router-dom'
import logoArgentBank from '../../medias/img/argentBankLogo.png'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../features/User/sliceUtilisateur'

/**
 * Displays the header 
 * @returns {jsx}
 */
function NavBar() {
  const dispatch = useDispatch()
  const utilisateur = useSelector(state => state.user)

  const deconnexion = () => {
    dispatch(logout())
  }

    return (
        <nav className="main-nav">
          <Link className="main-nav-logo" to="/">
            <img
              className="main-nav-logo-image"
              src={logoArgentBank}
              alt="Argent Bank Logo"
            />
            <h1 className="sr-only">Argent Bank</h1>
          </Link>
            {utilisateur.connected ? (
              <div>
                <NavLink className="main-nav-item" to="profil">
                  <i className="fa fa-user-circle"></i>
                  {utilisateur.firstName}
                </NavLink>
                <NavLink className="main-nav-item" to="" onClick={deconnexion}>
                  <i className="fa fa-sign-out"></i>
                  Sign Out
                </NavLink>
              </div>              
            ) : (
              <NavLink className="main-nav-item" to="connexion">
                <i className="fa fa-user-circle"></i>
                Sign In
              </NavLink>
            )}
      </nav>
    )
}

export default NavBar