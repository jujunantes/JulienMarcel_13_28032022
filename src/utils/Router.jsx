import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Accueil from '../pages/Accueil'
import Connexion from '../pages/Connexion'
import Profil from '../pages/Profil'
import Erreur404 from '../composants/Erreur404'

export default function MyRouter() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Accueil />} />
                <Route path="/connexion" element={<Connexion />} />
                <Route path="/profil" element={<Profil />} />
                <Route path="*" element={<Erreur404 />} />
            </Routes>
        </Router>
    )
}