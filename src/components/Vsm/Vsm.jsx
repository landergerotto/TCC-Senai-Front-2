import { useEffect, useState } from "react";
import styles from "./Vsm.module.css"; // Make sure you have this CSS file
import { apiUrl } from "../../Api/apiUrl";
import VsmCard from "../VsmCard/VsmCard";
import { Col, Row } from "react-bootstrap";

function Vsm() {
  const [data, setData] = useState([]);

  useEffect(() => {
    apiUrl
      // .get("/vsm/get")
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
      // .get("/process/get")
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log("Erro ao buscar dados do processo: ", error);
      });
  }, []);

  return (
    <div className={styles.container}>
      {data.length === 0 ? (
        <p>Loading data...</p>
      ) : (
        <>
          {data.map((item) => (
            <div key={item.id}>
              <div className={styles.flexTables}>
                <div>Batch Qnt</div>
                <VsmCard
                  POC={item}
                  Process={item}
                  User={item.User}
                  className={styles.vsmCard}
                />
              </div>
              <div>
                <hr className={styles.customHr} />
                <span className={styles.machineTime}>tempo de maquina</span>
              </div>
              div do lado
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default Vsm;
