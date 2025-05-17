
import  React,  {ReactEventHandler, useState} from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import { auth } from "../index";
import LoginAnimation from './LoginAnimation';
import '../Styles/Login.css';


interface User {
    email: string;
    password: string;
}

const ForgotPassword: React.FC = () => {
    const navigate = useNavigate();
    const userDets: User = {email: "", password: ""};
    const [user, setUser] = useState(userDets);

    const handleClick = (e :React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, user.email, user.password)
        .then((userCredential) => {
            // Signed up 
            console.log("signed up");
            const user = userCredential.user;
            navigate("/login");
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
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
            <div className="container">
            <div className="left">
                <div className="registration">Forgot Password</div>
                <div className="eula">
                Enter your recovery email.
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
                    d="m 40,120.00016 239.99984,-3.2e-4
                    c 0,0 24.99263,0.79932 25.00016,35.00016
                    0.008,34.20084 -25.00016,35 -25.00016,35 h -239.99984
                    "
                    fill="url(#linearGradient)"
                />
                </svg>
                <div className="form-wrapper">
                <form onSubmit={handleClick}>  
                    <label className="login_label" htmlFor="email">Email</label>
                    <input
                    type="email"
                    id="email"
                    onChange={(e) => setUser({...user, email: e.target.value})}
                    required
                    />
                    <input type="submit" id="submit" value="Submit" />
                    
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

export default ForgotPassword;