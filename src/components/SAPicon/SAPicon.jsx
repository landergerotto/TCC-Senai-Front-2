import { Col } from "react-bootstrap";
import styles from "./SAPicon.module.css";

function SAPicon() {
  return (
    <Col className={styles.col}>
      <div className={styles.bg}>
        <div className={styles.erp}>ERP</div>
        <div className={styles.sap}>SAP</div>
      </div>
    </Col>
  );
}

export default SAPicon;
