import { Image } from "react-bootstrap";
import styles from "./FactoryIcon.module.css";

import icon from "../../assets/Img/factoryIcon.png";

/* eslint-disable react/prop-types */
function FactoryIcon({ number = null, individual = null }) {
  return (
    <div className={styles.iconContainer}>
      <div
        className={styles.textOverImg}
        style={{ backgroundImage: `url(${icon})` }}
      >
        {number} {individual}
      </div>
    </div>
  );
}
{
  /* <Image className={styles.iconImg} src={icon} /> */
}

export default FactoryIcon;
