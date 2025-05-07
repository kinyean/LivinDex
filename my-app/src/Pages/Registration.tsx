import React from "react";
import { useNavigate } from "react-router-dom";

const Registration: React.FC = () => {

    const navigate = useNavigate();
   
    return (
    <>
        <div> Registration</div>
        <form> 
            <input  type="text" name="name" placeholder="Full Name"/>
            <input  type="text" name="password" placeholder="Password"/>
            <input  type="text" name="email" placeholder="Email"/>
            <button onClick={() => navigate("/login")}>Go to Login Page</button>
        </form>
    
    </>);

}

export default Registration;