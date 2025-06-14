import React from 'react';
import Cash_Out from './Pages/Wallet/Cash_Out';
import Content from './Pages/Content';
import CreateComment from './Pages/Create_Section/CreateComment';
import EditProfile from './Pages/Profile/EditProfile';
import Display from './Pages/Display';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ForgotPassword from './Pages/ForgotPassword';
import Home from "./Pages/Home";
import Login from "./Pages/Login"
import Logout from './Components/Logout';
import Profile from "./Pages/Profile"
import ProtectedRoute from './Components/ProtectedRoute';
import Registration from "./Pages/Profile/Registration";
import Rewards from './Pages/Wallet/Rewards';
import Top_Up from './Pages/Wallet/Top_Up';
import Wallet from './Pages/Wallet/Wallet';
import './Styles/App.css';

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/content" element={<Content />} />
        <Route path="/create/comment" element={<CreateComment />} />
        <Route path="/display" element={<Display />} />
        <Route path="/editProfile" element={<EditProfile />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/" element={<ProtectedRoute />}>
          <Route index element={<Home />} />
          <Route path="/profile" element={<Profile />} />   
          <Route path="/logout" element = {<Logout />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/wallet/top_up" element={<Top_Up />} />
          <Route path="/wallet/cash_out" element={<Cash_Out />} />
          <Route path="/wallet/rewards" element={<Rewards />} />
        </Route>                     
      </Routes>
    </Router>
  );
}

export default App;
