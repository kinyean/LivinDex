import React from 'react';
import Content from './Pages/Content';
import CreateComment from './Pages/Create_Section/CreateComment';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ForgotPassword from './Pages/ForgotPassword';
import Home from "./Pages/Home";
import Login from "./Pages/Login"
import Profile from "./Pages/Profile"
import Registration from "./Pages/Registration";
import './Styles/App.css';
import ProtectedRoute from './Components/ProtectedRoute';
import Logout from './Components/Logout';

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/content" element={<Content />} />
        <Route path="/create/comment" element={<CreateComment />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/" element={<ProtectedRoute />}>
          <Route index element={<Home />} />
          <Route path="/profile" element={<Profile />} />   
          <Route path="/logout" element = {<Logout />} />
        </Route>                     
      </Routes>
    </Router>
  );
}

export default App;
