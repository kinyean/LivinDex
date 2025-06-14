import React from "react";
import Logo from '../../Assets/UnknownUser.jpg';
import Navbar from "../../Components/Navbar"; 
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { getUserProfile as getUserProfileApi} from "../Profile/GetProfile";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../index";
import '../../Styles/Wallet.css';
import { TextField} from '@mui/material';
import WalletCard from "../../Components/Wallet/WalletCard";
import WalletHeader from '../../Components/Wallet/WalletHeader';

const Cash_Out: React.FC = () => {
  const navigate = useNavigate();

  const [customCashOut, setCustomCashOup] = React.useState('');

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
        <div className="wallet_body_header">
          <h1 className="wallet_transaction_name">Cash Out</h1>
          <button className="backtransaction_btn" onClick={() => navigate("/wallet")}>Back to Transaction</button>
        </div>
        <div className="cashout_wrapper">
          <TextField
              type="number"
              label="Enter Amount (Min $1, Max $999.99)"
              value={customCashOut}
              onChange={(e) => {
                const value = e.target.value;
                if (value === '') {
                  setCustomCashOup('');
                  return;
                }
                // Match up to 2 decimal places
                const twoDecimal = /^\d{0,3}(\.\d{0,2})?$/;
                if (twoDecimal.test(value)) {
                  const num = Number(value);
                  if (!isNaN(num) && num > 0 && num <= 999.99) {
                    setCustomCashOup(value);
                  }
                }
              }}
              onKeyDown={(e) => {
                if (["e", "E", "+", "-"].includes(e.key)) {
                  e.preventDefault();
                }
              }}
              variant="outlined"
              sx={{ width: 400 }}
            />
          </div>
        <div className="TopUp_btn_wrapper">
          <button className="TopUp_btn"  disabled={customCashOut === ''}>
            Cash Out
          </button>
        </div>
      </div>
    </>
  );
};

export default Cash_Out;