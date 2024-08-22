import { Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { useContext } from "react";
import NavBar from "./components/NavBar";
import { AuthContext } from "./context/AuthContext";
import Account from "./pages/Account";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import { BankContextProvider } from "./context/BankContext";

function App() {
  const {user} = useContext(AuthContext); {/*This will import the user info that we are currently logged in to*/}
return(
  <BankContextProvider user = {user}>
    <NavBar/>
    
      <Routes>
        <Route path="/" element= {user ? <Account/>: <Home/>} />
        <Route path="/home" element = {<Home/>}/>
        <Route path="/register" element= {user ? <Account/>: <Register/>} />
        <Route path="/login" element= {user ? <Account/>: <Login/>} />
        <Route path="/account" element={user ? <Profile/>: <Account/>}/>
        <Route path="/*" element= {<Navigate to="/"/>} />
      </Routes>
   
  </BankContextProvider>
)
}

export default App;
