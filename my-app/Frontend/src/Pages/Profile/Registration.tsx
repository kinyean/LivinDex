import  React,  {useState} from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../index";
import LoginAnimation from '../LoginAnimation';
import '../../Styles/Registration.css';
import BaseAPI from "../../API/BaseAPI"
import { createUserApi } from "./GetProfile";

interface User {
    name: string;
    email: string;
    password: string;
}

const Registration: React.FC = () => {
    const navigate = useNavigate();
    const userDets: User = {name: "", email: "", password: ""};
    const [userd, setUser] = useState(userDets);

    const handleClick = (e :React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, userd.email, userd.password)
        .then(async (userCredential) => {
            // Signed up 
            console.log("signed up");
            const user = userCredential.user;
            const apiUrl = process.env.REACT_APP_API_URL;

            if (!apiUrl) {
              throw new Error('REACT_APP_API_URL is not defined');
            }

            // After Firebase signup
            await createUserApi(user.uid, {
              firstName: userd.name,
              lastName: "",
              phone: "",
              bio: "",
              SGD: 0,
              LCoin: 0,
              like: 0,
              follower: 0,
              subscriber: 0
            });

            await BaseAPI.post("/auth/register", {
              uid: user.uid,
              name: userd.name,
            });

            navigate("/editProfile");
            // ...
        })
        .catch((error) => {
            const errorMessage = error.message;
            // ..
            console.log(errorMessage);
        });
    }

    return (
    <>
      <LoginAnimation /> {/* Animation logic runs here */}
      <div className="login-body"> 
        <div className="page">
          <div className="registration-container">
            <div className="left">
              <div className="registration">Registration</div>
              <div className="eula">
                By logging in you agree to the ridiculously long terms that you didn't bother to read
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
              </svg>
              <div className="form-wrapper">
                <form onSubmit={handleClick}>  
                  <label className="login_label" htmlFor="name">Name</label>
                  <input
                    className="styled-input"
                    type="text"
                    id="name"
                    onChange={(e) => setUser({...userd, name: e.target.value})}
                    required
                  />
                  <label className="login_label" htmlFor="email">Email</label>
                  <input
                    className="styled-input"
                    type="email"
                    id="email"
                    onChange={(e) => setUser({...userd, email: e.target.value})}
                    required
                  />
                  <label className="login_label" htmlFor="password">Password</label>
                  <input
                    className="styled-input"
                    type="password"
                    id="password"
                    onChange={(e) => setUser({...userd, password: e.target.value})}
                    required
                  />
                  <input type="submit" id="submit" value="Register" />
                  
                </form>

                <button onClick={() => navigate("/login")} className="hover-underline-animation login-button">
                    Sign in
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Registration;