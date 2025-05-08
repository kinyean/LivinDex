import LoginAnimation from './LoginAnimation';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../Styles/Login.css';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../index";


interface User {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const userDets: User = {email: "", password: ""};
  const [user, setUser] = useState(userDets);

  const navigate = useNavigate(); 

  const handleSubmit = (e :React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          signInWithEmailAndPassword(auth, user.email, user.password)
          .then((userCredential) => {
              // Logged in successfully
              console.log("Logged in");
              const user = userCredential.user;
              navigate("/");
              // ...
          })
          .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              // ..
          });
      }

  return (
    <>
      <LoginAnimation /> {/* Animation logic runs here */}
      <div className="page">
        <div className="container">
          <div className="left">
            <div className="login">LivinDex</div>
            <div className="eula">
              Welcome to LivinDex where we've got it all!
            </div>
          </div>
          <div className="right">
            <svg viewBox="0 0 320 300">
              <defs>
                <linearGradient
                  id="linearGradient"
                  x1="13"
                  y1="193.49992"
                  x2="307"
                  y2="193.49992"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop style={{ stopColor: '#ff00ff' }} offset="0" />
                  <stop style={{ stopColor: '#ff0000' }} offset="1" />
                </linearGradient>
              </defs>
              <path
                d="m 40,120.00016 239.99984,-3.2e-4 c 0,0 24.99263,0.79932 25.00016,35.00016 
                   0.008,34.20084 -25.00016,35 -25.00016,35 h -239.99984 
                   c 0,-0.0205 -25,4.01348 -25,38.5 
                   0,34.48652 25,38.5 25,38.5 h 215 
                   c 0,0 20,-0.99604 20,-25 
                   0,-24.00396 -20,-25 -20,-25 h -190 
                   c 0,0 -20,1.71033 -20,25 
                   0,24.00396 20,25 20,25 h 168.57143"
                fill="url(#linearGradient)"
              />
            </svg>
            <div className="form-wrapper">
              <form onSubmit={handleSubmit}>  
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  onChange={(e) => setUser({...user, email: e.target.value})}
                  required
                />
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  onChange={(e) => setUser({...user, password: e.target.value})}
                  required
                />
                <input onClick={() => navigate("/")} type="submit" id="submit" value="Log in" />
                
              </form>

              <button onClick={() => navigate("/registration")} className="hover-underline-animation login-button">
                  Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
