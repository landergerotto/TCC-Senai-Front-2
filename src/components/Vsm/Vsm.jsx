import { useEffect, useState } from "react";
import styles from "./Vsm.module.css"; // Make sure you have this CSS file
import { apiUrl } from "../../Api/apiUrl";
import VsmCard from "../VsmCard/VsmCard";

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
  }, []);

  return (
    <div className={styles.container}>
      {data.length === 0 ? (
        <p>Loading data...</p>
      ) : (
        <>
          {data.map((item) => (
            <div className={styles.flex} key={item.id}>
              <VsmCard POC={item} Process={item} User={item.User}/>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default Vsm;
