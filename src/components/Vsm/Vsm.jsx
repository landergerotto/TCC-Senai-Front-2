import { useEffect, useState } from "react";
import styles from "./Vsm.module.css"; // Make sure you have this CSS file
import { apiUrl } from "../../Api/apiUrl";

function Vsm() {
  const [data, setData] = useState([]);

  useEffect(() => {
    apiUrl
      .get("/vsm/get")
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
        <ul>
          {data.map((item) => (
            <li key={item.id}>
              <div>
                <h3>Batch Info</h3>
                <p>Batch ID: {item.BatchId}</p>
                <p>Batch Quantity: {item.BatchQnt}</p>
                <p>Scrap Quantity: {item.ScrapQnt}</p>
                <p>Movement: {item.Movement}</p>
                <p>Interditated: {item.Interditated ? 'Yes' : 'No'}</p>
                <p>Created At: {new Date(item.created_at).toLocaleString()}</p>
              </div>
              <div>
                <h3>Process Info</h3>
                <p>Process ID: {item.Process?.id}</p>
                <p>Process Name: {item.Process?.Name}</p>
                <p>Type: {item.Process?.Type}</p>
                <p>OEE: {item.Process?.OEE}</p>
                <p>Order: {item.Process?.Order}</p>
                <p>POT: {item.Process?.POT}</p>
                <p>Created At: {new Date(item.Process?.created_at).toLocaleString()}</p>
              </div>
              <div>
                <h3>User Info</h3>
                <p>User Name: {item.User?.DisplayName}</p>
                <p>Email: {item.User?.Email}</p>
                <p>First Name: {item.User?.FirstName}</p>
                <p>Last Name: {item.User?.LastName}</p>
                <p>Created At: {new Date(item.User?.created_at).toLocaleString()}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Vsm;
