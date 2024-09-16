/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-dupe-keys */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import styles from "./CardGraph.module.css";

function CardGraph({ data }) {
  const [bgColor, setBgColor] = useState("");

  useEffect(() => {
    if (data.value == 1)
      setBgColor("linear-gradient(to right, #FF4B2B, #FF416C)"); // red
    else if (data.value == 2) {
      setBgColor("linear-gradient(to left, #2c3e50, #bdc3c7)"); // gray
    } else {
      setBgColor("linear-gradient(20deg, #0ba360 0%, #3cba92 100%)"); // green
    }
  }, []);

  return (
    <div className={styles.cardBg} style={{ background: bgColor }}>
      {data.label}:
      <div>{data.value}</div>
    </div>
  );
}

export default CardGraph;
