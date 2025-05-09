import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./Pages/Home";
import Login from "./Pages/Login"
import Registration from "./Pages/Registration";
import './Styles/App.css';
import ProtectedRoute from './Components/ProtectedRoute';

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />

        <Route path="/" element={<ProtectedRoute> 
                                    <Home /> 
                                  </ProtectedRoute> }
        />
      </Routes>
    </Router>
  );
}

export default App;
