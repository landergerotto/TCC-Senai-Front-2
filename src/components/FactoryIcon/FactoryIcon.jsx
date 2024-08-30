import { Col } from "react-bootstrap";
import styles from "./FactoryIcon.module.css";

import icon from "../../assets/Img/factoryIcon.png";

/* eslint-disable react/prop-types */
function FactoryIcon({ number = null, entity = null }) {
  return (
    <Col>
      <div
        className={styles.iconContainer}
        style={{
          backgroundImage: `url(${icon})`,
        }}
      >
        <div className={styles.text}>
          <div className={styles.number}>{number}</div>
          <div className={styles.entity}>{entity}</div>
        </div>
      </div>
    </Col>
  );
}

export default FactoryIcon;
