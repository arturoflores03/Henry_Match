import React from "react";

import styles from "../LandingPage/Slider.module.css"
import img0 from "../../assets/img0.jpg";
import img20 from "../../assets/img20.jpg";
import img3 from "../../assets/img3.jpg";
//import img4 from "../../assets/img4.jpg";

function Slider() {
  return (
    <div className={styles.slider}>
    <figure>
        <img src={img0} alt="slide 1" />
        <img src={img20} alt="slide 2" />
        <img src={img3} alt="slide 3" />
        
    </figure>  
   
    </div>
  );
}

export default Slider;