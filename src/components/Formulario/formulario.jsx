/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Card, CardBody, CardTitle } from "react-bootstrap";

import Input from "../Input/input";
import Button from "../Button/button";

import styles from "./formulario.module.css";
import { apiUrl } from "../../Api/apiUrl";

import cryptoService from "../../service/cryptoService";

function Formulario({
  title,
  fields,
  actions = [],
  target,
  type,
  labelStyle,
  url,
  bgStyle,
  onClickButton,
}) {
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [link, setLink] = useState(url);
  const [user, setUser] = useState();

  function getValue(id) {
    const element = document.getElementById(id);
    localStorage.setItem(`${id}`, element.value);
  }

  function confirmPassword() {
    if (!localStorage.getItem("confirm")) return true;

    let senha = localStorage.getItem("Password");
    let confirma = localStorage.getItem("confirm");

    if (senha != confirma) return false;
    return true;
  }

  function sendForm() {
    let informations = {};

    for (let i = 0; i < fields.length; i++) {
      const field = fields[i];
      const info = localStorage.getItem(`${field.name}`);

      if (!info || info.trim().length < 1) {
        alert(`É necessário preencher o campo ${field.label}`);
        return;
      }
      if (confirmPassword() == true) {
        if (field.name != "confirm") informations[field.name] = info;
      } else {
        alert("As senham não coincidem.");
        return;
      }
    }

    setData(informations);

    const EncryptedBody = cryptoService.encryptData(informations);
    if (user) {
      console.log("user: ", user);
      if (user.Email == informations.Email) {
        const EDV = user.EDV;
        console.log(EDV);
        const Email = user.Email;
        console.log(Email);
        apiUrl
          .post(`/${link}`, { EDV, Email })
          .then((response) => {
            console.log(response);
            if (response.data.valid) navigate("/codigo");
            else {
              alert("As informações inseridas não são válidas.");
              return;
            }
          })
          .catch((error) => {
            console.log("deu errado ai brother: ", error);
          });
        return;
      }
      alert("O email inserido não é válido.");
      return;
    }

    apiUrl
      .post(`/${link}`, { EncryptedBody: EncryptedBody })
      .then((response) => {
        console.log(response.data);
        alert(`${title} realizado com sucesso.`);
      })
      .catch((error) => {
        console.error("Houve um erro na requisição:", error);
        alert("Um erro ocorreu, tente novamente.");
      });
  }

  const validateField = () => {
    if (title != "Recuperar Senha") return;

    const EDV = localStorage.getItem("EDV");
    if (!EDV) return;

    apiUrl
      .get(`/user/get/${EDV}`)
      .then((response) => {
        console.log(response);
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Houve um erro na requisição: ", error);
      });
  };

  return (
    <Card className={styles.card}>
      <CardBody className={styles.cardBody}>
        <div className={styles.cardTitle}>
          <CardTitle className={styles.title}>{title}</CardTitle>
        </div>
        <div className={title == "Registro" ? styles.inputs : ""}>
          {fields.map((field, index) => {
            return (
              <>
                <Input
                  key={index}
                  label={field.label}
                  type={field.type}
                  name={field.name}
                  id={field.name}
                  onChange={() => getValue(field.name)}
                  labelStyle={labelStyle}
                  bgStyle={bgStyle}
                  onBlur={() => validateField()}
                />
                {field.underTextAction && (
                  <div>
                    <p
                      onClick={field.underTextAction}
                      style={field.underTextStyle}
                    >
                      {field.underText}
                    </p>
                  </div>
                )}
              </>
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
