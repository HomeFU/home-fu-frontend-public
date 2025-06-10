import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Home} from "./pages/Home/Home";
import { Details } from "./pages/Details/Details";
import { Profile } from "./pages/Profile/Profile";
import { AdminPanel } from "./pages/AdminPanel/mainAdminPage";
import { NotFound } from "./pages/NotFound/NotFound";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/profile" element={<Profile/>}></Route>
        <Route path="/carddetails/:id" element={<Details/>}></Route>
        <Route path="/admin-panel" element={<AdminPanel/>}></Route>
        <Route path="*" element={<NotFound/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;