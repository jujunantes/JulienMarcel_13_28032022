import { Link, NavLink } from 'react-router-dom'
import logoArgentBank from '../../medias/img/argentBankLogo.png'

import '../../styles/main.css'

/**
 * Displays the header 
 * @returns {jsx}
 */
function NavBar() {

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
        <div>
          <NavLink className="main-nav-item" to="Connexion">
            <i className="fa fa-user-circle"></i>
            Sign In
          </NavLink>
        </div>
      </nav>
    )
}

export default NavBar