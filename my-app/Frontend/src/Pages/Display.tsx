import React from "react";
import Navbar from "../Components/Navbar";
import testImage from "../Assets/contemplative-reptile.jpg";
import Comments from "../Components/Comment/Comments";
import { auth } from "../index";
import "../Styles/Display.css";

const Display: React.FC = () => {

  const uid = auth.currentUser?.uid;

  return (
    <div className="note-wrapper">
      <Navbar />


      <div className="note-scroller">
        <div className="image-section">
          <div className="image-wrapper">
            <img src={testImage} alt="Reptile" className="bounded-image" />
          </div>
        </div>


        <div className="note-content">
          <h3 className="title">【Green guardian of the jungle】</h3>
          <p className="desc">
            From their epic skin sheds to their amazing colors, there’s no denying that lizards are some of the coolest creatures out there. 
            But which lovable reptile are you most like? There’s only one way to find out.
          </p>

          <div className="hashTagxsxw">
            #NatureShot #WildlifeDaily #MacroPhotography #JungleMood #GreenIsPower
          </div>

          <div className="event">
            <p>🎵 Singapore Symphony Orchestra</p>
            <p>📍 Singapore Zoo</p>
            <p>📅 6 July，6–7pm</p>
          </div>

          <div className="actions">
            <span>❤️ 59</span>
            <span>⭐ 69</span>
            <span>💬 4</span>
            <span>🔗</span>
          </div>
        </div>

        <div className="note-footer">
          <Comments currentUserId = {uid ?? ''} />
        </div>
      </div>
    </div>
  );
};

export default Display;