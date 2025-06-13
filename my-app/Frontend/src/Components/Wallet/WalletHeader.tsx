import React from 'react';
import LCoin from '../../Assets/L-Coin.png';

interface WalletHeaderProps {
  userData: {
    firstName: string;
    lastName: string;
  };
  balance: string;
  lCoins: number;
  avatar: string;
}

const WalletHeader: React.FC<WalletHeaderProps> = ({
  userData,
  balance,
  lCoins,
  avatar,
}) => {
  return (
    <div className="wallet_green_header">
      <div className="wallet_header_content">
        <img className="wallet_avatar" src={avatar} alt="Avatar" />
        <h1 className="wallet_name">
          {userData.firstName} {userData.lastName}
        </h1>
        <p className="wallet)SGD">
          <span className="wallet_currency">SGD: </span>
          <span className="wallet_amount">{balance}</span>
        </p>
        <div className="wallet_LCoin_section">
          <img className="wallet_LCoin_icon" src={LCoin} alt="L Coin" />
          <p className="wallet_LCoin_text">{lCoins} LCoins</p>
        </div>
      </div>
    </div>
  );
};

export default WalletHeader;
