import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Card, CardBody, CardTitle } from "react-bootstrap";

import Input from "../Input/input";
import Button from "../Button/button";

import styles from "./formulario.module.css";
import { apiUser } from "../../Api/apiUser";

function Formulario({
  title,
  fields,
  actions = [],
  target,
  type,
  labelStyle,
  url,
  bgStyle,
}) {
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [link, setLink] = useState(url);
  // console.log(url);

  function getValue(id) {
    const element = document.getElementById(id);
    localStorage.setItem(`${id}`, element.value);
  }

  function confirmPassword() {
    if (type != "register") return true;

    let senha = localStorage.getItem("password");
    let confirma = localStorage.getItem("confirm");

    if (senha != confirma) return false;
    return true;
  }

  function sendForm(url) {
    let informations = {};

    for (let i = 0; i < fields.length; i++) {
      const field = fields[i];
      const info = localStorage.getItem(`${field.name}`);

      if (!info || info.trim().length < 1) {
        alert(`É necessário preencher o campo ${field.label}`);
        return;
      }
      if (confirmPassword() == true) {
        if (field.name != 'confirm')
          informations[field.name] = info;
      } else {
        alert("As senham não coincidem.");
        return;
      }
    }
    
    setData(informations);
    console.log("informations", informations);
    localStorage.setItem("data", JSON.stringify(informations));

    // REGISTRO : https://tcc-senai-back.vercel.app/user/create
    // LOGIN : https://tcc-senai-back.vercel.app/user/login

    apiUser
      .post(`/${link}`, informations)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error("Houve um erro na requisição:", error);
      });

    if (title == "Login") sessionStorage.setItem("token", informations[0]);

    // navigate(`${target}`);
    // localStorage.clear();
    alert(`${title} realizado com sucesso.`);
  }

  return (
    <Card className={styles.card}>
      <CardBody className={styles.cardBody}>
        <div className={styles.cardTitle}>
          <CardTitle className={styles.title}>{title}</CardTitle>
        </div>
        <div className={title == "Registro" ? styles.inputs : ""}>
          {fields.map((field, index) => {
            return (
              <Input
                key={index}
                label={field.label}
                type={field.type}
                name={field.name}
                id={field.name}
                onChange={() => getValue(field.name)}
                labelStyle={labelStyle}
                bgStyle={bgStyle}
              />
            );
          })}
        </div>
        <div className={styles.btn}>
          {actions.map((action, index) => {
            if (action.label === "Cancelar") {
              return (
                <Button
                  key={index}
                  text={action.label}
                  type={action.type}
                  style={{ marginTop: "1em" }}
                  onClick={() => navigate("/")}
                />
              );
            } else if (action.label === "Registrar-se") {
              return (
                <Button
                  key={index}
                  text={action.label}
                  style={{ marginTop: "1em" }}
                  onClick={() => navigate("/register")}
                />
              );
            } else {
              return (
                <Button
                  key={index}
                  text={action.label}
                  style={{ marginTop: "1em" }}
                  onClick={sendForm}
                />
              );
            }
          })}
        </div>
      </CardBody>
    </Card>
  );
}

export default Formulario;
