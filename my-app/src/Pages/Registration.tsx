import React from "react";

const Registration: React.FC = () => {
   
    return (
    <>
        <div> Registration</div>
        <form> 
            <input  type="text" name="name" placeholder="Full Name"/>
            <input  type="text" name="password" placeholder="Password"/>
            <input  type="text" name="email" placeholder="Email"/>
        </form>
    
    </>);

}

export default Registration;