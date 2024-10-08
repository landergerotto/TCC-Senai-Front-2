/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Card, CardBody, CardTitle } from "react-bootstrap";

import Input from "../Input/input";
import Button from "../Button/button";
import ModalComponent from "../Modal/ModalComponent";

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
  onSubmit = null,
}) {
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [link, setLink] = useState(url);
  const [user, setUser] = useState();

  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [modalFunc, setModalFunc] = useState();

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

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
        setModalData({
          title: "Erro",
          text: `É necessário preencher o campo ${field.label}`,
          btnCancel: "Fechar",
        });
        setShowModal(true);
        return;
      }

      if (field.type === "number") {
        if (isNaN(info) || /^\s*$/.test(info)) {
          setModalData({
            title: "Erro",
            text: `O campo ${field.label} deve conter apenas números.`,
            btnCancel: "Fechar",
          });
          setShowModal(true);
          return;
        }
      }

      if (field.type === "text" && field.label != "CT") {
        if (/^\s*$/.test(info) || /^\d+$/.test(info)) {
          setModalData({
            title: "Erro",
            text: `O campo ${field.label} não pode ter apenas números.`,
            btnCancel: "Fechar",
          });
          setShowModal(true);
          return;
        }
      }

      if (field.type === "email" && !info.includes("@")) {
        setModalData({
          title: "Erro",
          text: `O campo ${field.label} deve conter um "@" válido.`,
          btnCancel: "Fechar",
        });
        setShowModal(true);
        return;
      }

      if (confirmPassword() == true) {
        if (field.name != "confirm") informations[field.name] = info;
      } else if (field.name == "confirm") localStorage.removeItem("confirm");
      else {
        setModalData({
          title: "Erro",
          text: "As senhas não coincidem.",
          btnCancel: "Fechar",
        });
        setShowModal(true);
        return;
      }
    }

    setData(informations);

    const EncryptedBody = cryptoService.encryptData(informations);

    if (user) {
      if (user.Email == informations.Email) {
        const EDV = user.EDV;
        const Email = user.Email;
        apiUrl
          .post(`/${link}`, { EDV, Email })
          .then((response) => {
            if (response.data.valid) navigate("/codigo");
            else {
              setModalData({
                title: "Erro",
                text: "As informações inseridas não são válidas",
                btnCancel: "Fechar",
              });
              setShowModal(true);
              return;
            }
          })
          .catch((error) => {
            console.error("Erro: ", error);
            setModalData({
              title: "Erro",
              text: "Houve um erro com a sua requisição, tente novamente.",
              btnCancel: "Fechar",
            });
            setShowModal(true);
          });
        return;
      }
      setModalData({
        title: "Erro",
        text: "O email inserido não é válido.",
        btnCancel: "Fechar",
      });
      setShowModal(true);
      return;
    }

    apiUrl
      .post(`/${link}`, { EncryptedBody: EncryptedBody })
      .then((response) => {
        setModalData({
          title: "Confirmação",
          text: `${title} realizado com sucesso.`,
          btnCancel: "Fechar",
        });
        setShowModal(true);
        if (title == "Login") {
          sessionStorage.setItem(
            "token",
            cryptoService.decrypt(response.data.data)
          );
          sessionStorage.setItem("email", informations.email);
        }

        if (onSubmit) onSubmit();

        setModalFunc(() => () => navigate(`/${target}`));
      })
      .catch((error) => {
        console.error("Houve um erro na requisição:", error);
        setModalData({
          title: "Erro",
          text: `${error.response.data.message}`,
          btnCancel: "Fechar",
        });
        setShowModal(true);
      });
  }

  const validateField = () => {
    if (title != "Recuperar Senha") return;

    const EDV = localStorage.getItem("EDV");
    if (!EDV) return;

    apiUrl
      .get(`/user/get/${EDV}`)
      .then((response) => {
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
              <div key={index}>
                <Input
                  label={field.label}
                  type={field.type}
                  name={field.name}
                  id={field.name}
                  value={
                    field.name === "Interditated"
                      ? localStorage.getItem("Interditated") === "true"
                        ? "Sim"
                        : "Não"
                      : localStorage.getItem(field.name) || ""
                  }
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
              </div>
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
      <ModalComponent
        isOpened={showModal}
        onClose={handleCloseModal}
        data={modalData}
        confirmOnClick={modalFunc}
      />
    </Card>
  );
}

export default Formulario;
