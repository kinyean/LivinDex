import React from "react";
import Logo from '../../Assets/UnknownUser.jpg';
import Navbar from "../../Components/Navbar"; 
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { getUserProfile as getUserProfileApi} from "../Profile/GetProfile";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../index";
import '../../Styles/Wallet.css';
import WalletCard from "../../Components/Wallet/WalletCard";
import WalletHeader from '../../Components/Wallet/WalletHeader';

const Rewards: React.FC = () => {
  const navigate = useNavigate();

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
      <WalletHeader 
        userData={userData}
        balance="354.50"
        lCoins={100}
        avatar={Logo}
      />

      <div className="wallet_card">
        <WalletCard />
      </div>

      <div className="wallet_transaction">
        <div className="wallet_body_header">
          <h1 className="wallet_transaction_name">Rewards</h1>
          <button className="backtransaction_btn" onClick={() => navigate("/wallet")}>Back to Transaction</button>
        </div>


      </div>
    </>
  );
};

export default Rewards;