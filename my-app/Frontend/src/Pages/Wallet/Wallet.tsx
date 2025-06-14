import React from "react";
import Logo from '../../Assets/UnknownUser.jpg';
import LCoin from '../../Assets/L-Coin.png';
import Navbar from "../../Components/Navbar"; 
import { useEffect, useState } from "react";
import { getUserProfile as getUserProfileApi} from "../Profile/GetProfile";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../index";
import '../../Styles/Wallet.css';
import WalletCard from "../../Components/Wallet/WalletCard";
import WalletList from "../../Components/Wallet/WalletList";
import WalletHeader from '../../Components/Wallet/WalletHeader';

const Wallet: React.FC = () => {

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    SGD: 0,
    LCoin: 0
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
        balance={(userData.SGD / 100).toFixed(2)}
        lCoins={userData.LCoin}
        avatar={Logo}
      />

      <div className="wallet_card">
        <WalletCard />
      </div>

      <div className="wallet_transaction">
        <div className="wallet_body_wrapper">
          <h1 className="wallet_transaction_name">All Transactions</h1>
        </div>
        <WalletList />
      </div>
    </>
  );
};

export default Wallet;