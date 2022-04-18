import Banniere from "../../composants/Banniere"
import PiedDePage from "../../composants/PiedDePage"

function Accueil() {
  return (
    <div className="App">
      <Banniere />
      <h1>Connecté !</h1>
      <PiedDePage />
    </div>
  )
}

export default Accueil