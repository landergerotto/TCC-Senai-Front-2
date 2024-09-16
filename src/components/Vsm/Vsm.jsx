import { Col, Row } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from "react";

import styles from "./Vsm.module.css"; // Make sure you have this CSS file

import Arrow from "../Arrow/Arrow";
import VsmCard from "../VsmCard/VsmCard";
import SAPicon from "../SAPicon/SAPicon";
import FactoryIcon from "../FactoryIcon/FactoryIcon";


import TruckArrowUp from "../../assets/Img/TruckArrowUp.png";
import TruckArrowDown from "../../assets/Img/TruckArrowDown.png";
import triangle from "../../assets/Img/triangle2.png";
import right_arrow from "../../assets/Img/right-arrow.png";

import { apiUrl } from "../../Api/apiUrl";
import ProductionOrders from "../ProductionOrders/ProductionOrders";

import cryptoService from "../../service/cryptoService";

function Vsm() {
  let type = null;
  let options = null;
  const [data, setData] = useState([]);
  const [vsm, setVsm] = useState([]);
  const [processedVsm, setProcessedVsm] = useState([]);
  const [processTime, setProcessTime] = useState([]);
  const [processEntranceTime, setProcessEntranceTime] = useState([]);
  const [multiplier, setMultiplier] = useState(1);
  const [selected, setSelected] = useState('Days');
  const [period, setPeriod] = useState(1);

  function roundTo(num, places) {
    const factor = Math.pow(10, places);
    return Math.round(num * factor) / factor;
  }

  const calculateBatchQnt = () => {
    let processed = Array(data.length).fill(0);

    // Iterate over each process, sorted by the `Order` attribute
    vsm.forEach((item, index) => {
      
      if (item.Process.Order === 1 && item.Movement == 'Entrada') {
        console.log('PROCESSO', item.Process)
        // First process: Sum of all 'Entrada' movements in VSM data
        processed[item.Process.Order - 1] = processed[item.Process.Order - 1] + item.BatchQnt
      } else {
        // Subsequent processes: Sum of 'Saída' movements of the previous process order
        if (item.Movement == 'Saída')
          processed[item.Process.Order] = processed[item.Process.Order] + item.BatchQnt
      }
    });

    return processed;
  };

  const calculateMachineTimes = () => {
    let machineTime = Array(data.length).fill(0);  // Assuming 9 processes
  
    // Group by Process Order
    data.forEach((processItem, index) => {
      const processOrder = processItem.Order;
      const batches = [...new Set(vsm
        .filter(item => item.Process.Order === processOrder)
        .map(item => item.BatchId))]; // Unique Batch IDs per process
  
      let timeDiffs = [];
      
      // console.log('Batches: ', batches)

      batches.forEach(batchId => {
        // Get first 'Entrada' and last 'Saída' for this batchId
        const batchRecords = vsm.filter(item => item.BatchId === batchId && item.Process.Order === processOrder);
        const entrada = batchRecords.filter(item => item.Movement === 'Entrada').sort()[0];
        const saida = batchRecords.filter(item => item.Movement === 'Saída').sort().reverse()[0];
        // console.log('Entrada: ', entrada)
        // console.log('Saida: ', saida)
        
        if (entrada && saida) {
          const entradaTime = new Date(entrada.created_at);
          const saidaTime = new Date(saida.created_at);
          const diffInMilliseconds = saidaTime - entradaTime;
          const diffInHours = diffInMilliseconds / (1000 * 60); // Convert to minutes
  
          timeDiffs.push(diffInHours);
        }
      });
  
      if (timeDiffs.length > 0) {
        // Calculate average time for this process order
        const avgTime = timeDiffs.reduce((sum, time) => sum + time, 0) / timeDiffs.length;
        machineTime[processOrder - 1] = roundTo(avgTime, 2);
      }
    });
    
    setProcessTime(machineTime);
    return { machineTime };
  };
  
  const calculateProcessEntranceTimes = () => {
    let processEntranceTime = Array(data.length).fill(0); // Assuming 9 processes
    
    // Start from the second process (index 1), as the first should always be zero
    for (let processOrder = 2; processOrder <= data.length; processOrder++) {
      const previousProcessOrder = processOrder - 1;
  
      const batches = [...new Set(vsm
        .filter(item => item.Process.Order === previousProcessOrder)
        .map(item => item.BatchId))]; // Unique Batch IDs for the previous process
  
      let timeDiffs = [];
      
      // console.log('Batches: ', batches)
      
      batches.forEach(batchId => {
        // Get last 'Saída' for the previous process
        const previousProcessRecords = vsm.filter(item => item.BatchId === batchId && item.Process.Order === previousProcessOrder);
        const firstSaida = previousProcessRecords.filter(item => item.Movement === 'Saída').sort()[0];
        console.log('first Saida: ', firstSaida)

        // Get first 'Entrada' for the current process
        const currentProcessRecords = vsm.filter(item => item.BatchId === batchId && item.Process.Order === processOrder);
        const lastEntrada = currentProcessRecords.filter(item => item.Movement === 'Entrada').sort().reverse()[0];
        console.log('Last Entrada: ', lastEntrada)
  
        if (firstSaida && lastEntrada) {
          const saidaTime = new Date(firstSaida.created_at);
          const entradaTime = new Date(lastEntrada.created_at);
          const diffInMilliseconds = entradaTime - saidaTime;
          const diffInHours = diffInMilliseconds / (1000 * 60); // Convert to minutes
          console.log('Diff in minutes:', diffInHours)
          timeDiffs.push(diffInHours);
        }
      });
  
      if (timeDiffs.length > 0) {
        const avgTime = timeDiffs.reduce((sum, time) => sum + time, 0) / timeDiffs.length;
        processEntranceTime[processOrder - 1] = roundTo(avgTime, 2); // Subtract 1 for zero-based index
      }
    }
  
    processEntranceTime[0] = 0; // Ensure the first element is always zero
    setProcessEntranceTime(processEntranceTime)
    return processEntranceTime;
  };

  //initial data get
  useEffect(() => {
    apiUrl
      .get("/process/get")
      .then((response) => {
        // console.log(response.data);
        setData(response.data.sort((a, b) => a.Order - b.Order));
        // console.log(data);
      })
      .catch((error) => {
        console.log("Erro ao buscar dados do processo: ", error);
      });

    apiUrl
      .get(`/vsm/filtered/${period * multiplier}`)
      .then((response) => {
        console.log(response.data)
        setVsm(response.data)
      })
      .catch((error) => {
        console.log("Erro ao buscar dados do vsm: ", error);
      });
  }, []);


  // calculate 
  useEffect(() => {
      const newProcessedVsm = calculateBatchQnt();
      console.log(newProcessedVsm)
      setProcessedVsm(newProcessedVsm);

      const machineTimes = calculateMachineTimes();
      console.log(machineTimes)

      const machineEntranceTimes = calculateProcessEntranceTimes();
      console.log('Machine Entrance: ', machineEntranceTimes)
  }, [vsm, data]);
  
  // refresh data
  useEffect(() => {
    apiUrl
      .get(`/vsm/filtered/${period * multiplier}`)
      .then((response) => {
        setVsm(response.data)
      })
      .catch((error) => {
        console.log("Erro ao buscar dados do vsm: ", error);
      });
  }, [period, selected]);

  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const years = Array.from({ length: 5 }, (_, i) => i + 1);

  const changeSelectOptionHandler = (event) => {
    const newSelection = event.target.value;
    setSelected(newSelection);

    // Adjust period based on the new selection
    let maxPeriod;
    if (newSelection === "Days") {
      maxPeriod = days.length;
      setMultiplier(1)
    } else if (newSelection === "Months") {
      maxPeriod = months.length;
      setMultiplier(30)
    } else if (newSelection === "Years") {
      maxPeriod = years.length;
      setMultiplier(365)
    }

    // Ensure the period value is valid for the new selection
    if (period > maxPeriod) {
      console.log("atualizou pra 1")
      setPeriod(1); // Set to a default value if the current period is not valid
    }
  };

  const changePeriodOptionHandler = (event) => {
    const newPeriod = Number(event.target.value);
    console.log(newPeriod)
    setPeriod(newPeriod);
  };

  // Define options based on the selected unit
  if (selected === "Days") {
    type = days;
  } else if (selected === "Months") {
    type = months;
  } else if (selected === "Years") {
    type = years;
  }

  if (type) {
    options = type.map((el) => <option key={el} value={el}>{el}</option>);
  }

  return (
    <>
      <Row>
        <div className={styles.filterRow}>
          Filtros aqui
          <Form.Select
            value={period} // Ensure the current period is selected in the dropdown
            onChange={changePeriodOptionHandler}
            aria-label="Select period"
          >
            {options}
          </Form.Select>
          <Form.Select
            value={selected}
            onChange={changeSelectOptionHandler}
            aria-label="Select time unit"
          >
            <option value="Days">Days</option>
            <option value="Months">Months</option>
            <option value="Years">Years</option>
          </Form.Select>
        </div>
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
          <img src={TruckArrowDown} className={styles.truckLineUp} alt="Truck Arrow Down" />
        </Col>
        <Col sm={8}>
          <ProductionOrders numOrders={50} />
        </Col>
        <Col sm={2} className={styles.col}>
          <img src={TruckArrowUp} className={styles.truckLineDown} alt="Truck Arrow Up" />
        </Col>
      </Row>
      <div className={styles.container}>
        {data.length === 0 ? (
          <p>Loading data...</p>
        ) : (
          <>
            {data.map((item, index) => (
              <div key={item.id} className={styles.cardWrapper}>
                <div className={styles.flexTables}>
                  <div className={styles.center}>
                    <Image src={triangle} width={50} fluid alt="Triangle" />
                    <div className={styles.placa}>
                      <div>
                        <span>{processedVsm[index]}</span>
                      </div>
                      <div>Placas</div>
                    </div>
                    <div className={styles.arrow}>
                      <Image src={right_arrow} fluid width={70} alt="Right Arrow" />
                      {/* <CIcon icon={cilArrowThickFromLeft} /> */}
                    </div>
                    <div className={styles.entrance}>
                      {processEntranceTime[index]}
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
                      <span>{processTime[index]}</span>
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
