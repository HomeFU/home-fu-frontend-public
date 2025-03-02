import "./App.css";
import MapButton from "./components/Header/MapButton/mapbutton";
import RegisterButton from "./components/Header/RegisterButton/registerbutton";

function App() {
  return (
    <div className="container">
      <MapButton />
      <RegisterButton />
    </div>
  );
}

export default App;