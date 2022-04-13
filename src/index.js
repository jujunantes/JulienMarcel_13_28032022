import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './utils/store'
import Accueil from './pages/Accueil'
import Connexion from './pages/Connexion'
import NavBar from './composants/NavBar'
import Erreur404 from './composants/Erreur404'

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/connexion" element={<Connexion />} />
        <Route path="*" element={<Erreur404 />} />
      </Routes>
    </Router>
  </React.StrictMode>
  </Provider>,
  document.getElementById('root')
)