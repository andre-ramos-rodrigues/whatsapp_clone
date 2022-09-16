import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import React from "react";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import "./style.scss"
import { AuthContext } from "./context/AuthContext";

function App() {
  const {currentUser} = React.useContext(AuthContext)

  // preventing unlogged users from entering
  const ProtectedRoute = ({ children }) => {
    if(!currentUser){
      return <Navigate to="/login"/>
    }

    return children
  }

  console.log(currentUser)
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/">
      <Route index element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      </Route>
    </Routes>
    </BrowserRouter>
    
  );
}

export default App;
