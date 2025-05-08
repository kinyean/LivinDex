import  React,  {useState} from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import { StringLiteral } from "typescript";

const auth = getAuth();

interface User {
    email: string;
    password: string;
}

const Registration: React.FC = () => {

    const navigate = useNavigate();
    const userDets: User = {email: "", password: ""};
    const [user, setUser] = useState(userDets);

    const handleClick = () => {
        createUserWithEmailAndPassword(auth, user.email, user.password)
        .then((userCredential) => {
            // Signed up 
            console.log("Registration successful")
            const user = userCredential.user;
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
        });

        navigate("/login");
    }
    return (
    <>
        <div> Registration</div>
        <form> 
            <input  type="text" name="email" placeholder="Email" onChange={(e) => setUser({...user, email: e.target.value})}/>
            <input  type="text" name="password" placeholder="Password" onChange={(e) => setUser({...user, password: e.target.value})}/>
            <button onClick={handleClick}>Go to Login Page</button>
        </form>
    
    </>);

}

export default Registration;