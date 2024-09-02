import CIcon from "@coreui/icons-react";
import { Col, Row } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { useEffect, useState } from "react";
import { cilArrowThickFromLeft } from "@coreui/icons";

import styles from "./Vsm.module.css"; // Make sure you have this CSS file

import Arrow from "../Arrow/Arrow";
import VsmCard from "../VsmCard/VsmCard";
import SAPicon from "../SAPicon/SAPicon";
import FactoryIcon from "../FactoryIcon/FactoryIcon";
import Button from "../Button/button";

import TruckArrowUp from "../../assets/Img/TruckArrowUp.png";
import TruckArrowDown from "../../assets/Img/TruckArrowDown.png";
import triangle from "../../assets/Img/triangle2.png";
import right_arrow from "../../assets/Img/right-arrow.png";

import { apiUrl } from "../../Api/apiUrl";
import ProductionOrders from "../ProductionOrders/ProductionOrders";

function Vsm() {
  const [data, setData] = useState([]);

  useEffect(() => {
    apiUrl
      .get("/process/get")
      .then((response) => {
        console.log(response.data);
        setData(response.data.sort((a, b) => a.Order - b.Order));
        console.log(data)
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
      <Row style={{ height: "9em" }}>
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
      <Row>
        <Col sm={2} className={styles.col}>
          <img src={TruckArrowDown} className={styles.truckLineUp}></img>
        </Col>
        <Col sm={8}>
          <ProductionOrders numOrders={50} />
        </Col>
        <Col sm={2} className={styles.col}>
          <img src={TruckArrowUp} className={styles.truckLineDown}></img>
        </Col>
      </Row>
      <div className={styles.container}>
        {data.length === 0 ? (
          <p>Loading data...</p>
        ) : (
          <>
            {data.map((item) => (
              <div key={item.id} className={styles.cardWrapper}>
                <div className={styles.flexTables}>
                  <div className={styles.center}>
                    <Image src={triangle} width={50} fluid />
                    <div className={styles.placa}>
                      <div>
                        <span>Batch Qnt</span>
                      </div>
                      <div>Placas</div>
                    </div>
                    <div className={styles.arrow}>
                      <Image
                        src={right_arrow} fluid
                        width={70}
                      />
                      {/* <CIcon icon={cilArrowThickFromLeft} /> */}
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
      </div>
    </>
  );
}

export default Vsm;
