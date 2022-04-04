import Banniere from "../../composants/Banniere"
import Features from "../../composants/Features"
import PiedDePage from "../../composants/PiedDePage"

function Accueil() {
  return (
    <div className="App">
      <Banniere />
      <Features />
      <PiedDePage />
    </div>
  )
}

export default Accueil