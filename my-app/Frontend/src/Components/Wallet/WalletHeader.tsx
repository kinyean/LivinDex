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
    <div className="wallet-green-header">
      <div className="wallet-header-content">
        <img className="wallet-avatar" src={avatar} alt="Avatar" />
        <h1 className="wallet-name">
          {userData.firstName} {userData.lastName}
        </h1>
        <p className="wallet-SGD">
          <span className="wallet-currency">SGD: </span>
          <span className="wallet-amount">{balance}</span>
        </p>
        <div className="wallet-LCoin-section">
          <img className="wallet-LCoin-icon" src={LCoin} alt="L Coin" />
          <p className="wallet-LCoin-text">{lCoins} LCoins</p>
        </div>
      </div>
    </div>
  );
};

export default WalletHeader;
