import React from "react";
import Logo from '../Assets/UnknownUser.jpg';
import LCoin from '../Assets/L-Coin.png';
import Navbar from "../Components/Navbar"; 
import { useEffect, useState } from "react";
import { getUserProfile as getUserProfileApi} from "./Profile/GetProfile";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../index";
import '../Styles/Wallet.css';
import WalletCard from "../Components/WalletCard";

const Wallet: React.FC = () => {

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        console.log("No user is logged in");
        return;
      }
  
      const uid = user.uid;
      getUserProfileApi(uid).then((data) => {
        setUserData(data);
      }).catch((e) => {
        console.error("Failed to fetch user data:", e);
      });
    });
  
    return () => unsubscribe();
  }, []);

  return (
    <>
      <Navbar />
      <div className="wallet-green-header">
        <div className="wallet-header-content">
          <img className="wallet-avatar" src={Logo} alt="Avatar" />
          <h1 className="wallet-name">{userData.firstName + " " + userData.lastName}</h1>
          <p className="wallet-SGD">
            <span className="wallet-currency">SGD: </span>
            <span className="wallet-amount">0.00</span>
          </p>
          <div className="wallet-LCoin-section">
            <img className="wallet-LCoin-icon" src={LCoin} alt="L Coin" />
            <p className="wallet-LCoin-text"> 100 LCoins</p>
          </div>
        </div>
      </div>

      <div className="wallet-card">
        <WalletCard />
      </div>
    </>
  );
};

export default Wallet;