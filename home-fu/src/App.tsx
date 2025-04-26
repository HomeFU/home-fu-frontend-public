import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import { Details } from "./pages/Details/Details";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/details" element={<Details/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;