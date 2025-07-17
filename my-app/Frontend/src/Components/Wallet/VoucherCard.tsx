import React from "react";
import "../../Styles/VoucherCard.css";
import LCoin from '../../Assets/L-Coin.png';

interface VoucherCardProps {
  onUse: () => void;
}

const VoucherCard: React.FC<VoucherCardProps> = ({ onUse }) => {
  return (
    <div className="voucher_card">
      <div className="voucher_left">
        <img src={LCoin} alt="L Coin" className="voucher_icon" />
        <div className="label">FIRST TIMER</div>
      </div>
      <div className="voucher_right">
        <div className="tag_new">New</div>
        <h3>Free LCoin</h3>
        <p>Reward: 100 LCoins</p>
        <button className="use_button" onClick={onUse}>Use</button>
      </div>
    </div>
  );
};

export default VoucherCard;
