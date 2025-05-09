import {useState, useEffect} from "react"
import { signOut } from "firebase/auth";
import { auth } from "../index";
import { Navigate } from "react-router-dom";


const Logout: React.FC = () => {
    const [signedOut, setSignedOut] = useState(false);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      signOut(auth)
        .then(() => {
            console.log("Logged out!");
          setSignedOut(true);
        })
        .catch((err) => {
          setError(err.message);
        });
    }, []);
  
    if (error) return <div>Error: {error}</div>;
    if (signedOut) return <Navigate to="/login" replace />;
  
    return <div>Logging out...</div>;
  };

export default Logout;
