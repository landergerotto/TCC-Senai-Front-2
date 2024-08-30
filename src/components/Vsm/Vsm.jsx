import { useEffect, useState } from "react";
import styles from "./Vsm.module.css"; // Make sure you have this CSS file
import { apiUrl } from "../../Api/apiUrl";
import VsmCard from "../VsmCard/VsmCard";
import CIcon from "@coreui/icons-react";
import { cilArrowThickFromLeft } from "@coreui/icons";
import { Col, Row } from "react-bootstrap";
import FactoryIcon from "../FactoryIcon/FactoryIcon";
import SAPicon from "../SAPicon/SAPicon";
import Arrow from "../Arrow/Arrow";

function Vsm() {
  const [data, setData] = useState([]);

  useEffect(() => {
    apiUrl
      .get("/process/get")
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log("Erro ao buscar dados do processo: ", error);
      });

    apiUrl
      .get("/vsm/get")
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log("Erro ao buscar dados do processo: ", error);
      });
  }, []);

  return (
    <>
      <Row>
        <div className={styles.filterRow}>Filtros aqui</div>
      </Row>
      <Row style={{ height: "15em" }}>
        <FactoryIcon entity={"Supplier"} />
        <Col className={styles.col}>
          <Arrow />
        </Col>
        <SAPicon />
        <Col className={styles.col}>
          <Arrow />
        </Col>
        <FactoryIcon number={50} entity={"Cliente"} />
      </Row>
      <Row>{/*  */}</Row>
      <Row></Row>
      {/* <div className={styles.container}>
        {data.length === 0 ? (
          <p>Loading data...</p>
        ) : (
          <>
            {data.map((item) => (
              <div key={item.id} className={styles.cardWrapper}>
                <div className={styles.flexTables}>
                  <div className={styles.center}>
                    <div>Batch Qnt</div>
                    <div>Placas</div>
                    <div className={styles.arrow}>
                      <img
                        src="https://cdn3.iconfinder.com/data/icons/pyconic-icons-2-1/512/arrow-stripes-right-512.png"
                        alt=""
                      />
                      <CIcon icon={cilArrowThickFromLeft} />
                    </div>
                    <div className={styles.entrance}>
                      0.00
                      <hr />
                    </div>
                  </div>
                  <div className={styles.center}>
                    <VsmCard
                      POC={item}
                      Process={item}
                      User={item.User}
                      className={styles.vsmCard}
                    />
                    <div className={styles.machine}>
                      <span>0.00</span>
                      <hr />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div> */}
    </>
  );
}

export default Vsm;
