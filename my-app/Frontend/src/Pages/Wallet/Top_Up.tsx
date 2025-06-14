import React from "react";
import Logo from '../../Assets/UnknownUser.jpg';
import Navbar from "../../Components/Navbar"; 
import PaymentMethod from "../../Components/Wallet/PaymentMethod";
import TopUpCards from "../../Components/Wallet/TopUpCards";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { getUserProfile as getUserProfileApi} from "../Profile/GetProfile";
import { updateTopUp as updateTopUpApi} from "../Wallet/GetWallet";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../index";
import '../../Styles/Wallet.css';
import WalletCard from "../../Components/Wallet/WalletCard";
import WalletHeader from '../../Components/Wallet/WalletHeader';

const Top_Up: React.FC = () => {
  const navigate = useNavigate();
  const options = ["$10", "$20", "$30", "$50", "$100", "Others"];

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [amountIndex, setAmountIndex] = useState(0);
  const [customTopUp, setCustomTopUp] = useState('');
  

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

  const handleTopUp = async () => {
    const user = auth.currentUser;
    if (!user) {
      alert("Not logged in");
      return;
    }
  
    const amount =
      amountIndex === 5 // if user click to "Others" (5th index) then amount = the number of value input in the textbox
        ? Number(customTopUp)
        : Number(options[amountIndex].replace("$", ""));
  
    if (isNaN(amount) || amount < 1 || amount > 999) {
      alert("Invalid amount");
      return;
    }
  
    try {
      const result = await updateTopUpApi(user.uid, amount);
      alert(`Top-up successful. New balance: $${(result.newBalance / 100).toFixed(2)}`);
      navigate("/wallet");
    } catch (err) {
      console.error("Top-up failed:", err);
      alert("Top-up failed.");
    }
  };  
 
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
        <div className="wallet_body_header">
          <h1 className="wallet_transaction_name">Top Up Amount</h1>
          <button className="backtransaction_btn" onClick={() => navigate("/wallet")}>Back to Transaction</button>
        </div>
        <TopUpCards 
          selectedIndex={amountIndex}
          setSelectedIndex={setAmountIndex}
          customTopUp={customTopUp}
          setCustomTopUp={setCustomTopUp} 
        />
        <div className="wallet_body2_wrapper">
          <h1 className="wallet_transaction_name">Payment Method</h1>
        </div>
        <PaymentMethod
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
        />

        <div className="TopUp_btn_wrapper">
        <button 
          className="TopUp_btn" 
          onClick={handleTopUp}
          disabled={selectedIndex === null}
        >
          Top Up
        </button>
        </div>
      </div>
    </>
  );
};

export default Top_Up;