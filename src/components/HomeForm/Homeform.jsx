/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Row, Col, Container } from "react-bootstrap";

import Input from "../Input/input";
import Button from "../Button/button";

import styles from "./Homeform.module.css";
import Tabela from "../Tabela/Tabela";
import { apiUrl } from "../../Api/apiUrl";

function HomeForm({
  title,
  fields,
  actions = [],
  target,
  type,
  labelStyle,
  url,
}) {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [link, setLink] = useState(url);
  const [optionsProcesso, setOptionsProcesso] = useState([]);

  const optionsInterditado = ["Sim", "Não"];

  useEffect(() => {
    const storedData = localStorage.getItem("data");
    if (storedData) setData(JSON.parse(storedData));

    apiUrl
      .get("process/get")
      .then((response) => {
        const listOptions = [];
        response.data.map((resp) => {
          listOptions.push(resp.Name);
        });
        console.log(listOptions);
        setOptionsProcesso(listOptions);
      })
      .catch((error) => {
        console.log("Erro ao buscar dados do processo: ", error);
      });
  }, []);

  function getValue(id) {
    const element = document.getElementById(id);
    localStorage.setItem(`${id}`, element.value);
  }

  function clearInputs() {
    fields.map((field) => {
      localStorage.setItem(field.name, "");
      document.getElementById(field.id).value = "";
    });
  }

  function sendForm() {
    const storedData = localStorage.getItem("data");
    if (storedData) setData(JSON.parse(storedData));

    console.log("data: ", data);

    let informations = {};

    for (let i = 0; i < fields.length; i++) {
      const field = fields[i];
      const info = localStorage.getItem(`${field.name}`);

      if (!info || info.trim().length < 1) {
        alert(`É necessário preencher o campo ${field.label}`);
        return;
      }
      informations[field.name] = info;
    }

    setData((prevData) => {
      const updatedData = Array.isArray(prevData) ? prevData : [];
      return [...updatedData, informations];
    });

    localStorage.setItem("data", JSON.stringify([...data, informations]));

    navigate(`${target}`);
    alert(`${title} realizado com sucesso.`);
  }

  const renderInput = (field) => {
    const commonProps = {
      label: field.label,
      type: field.type,
      name: field.name,
      id: field.name,
      onChange: () => getValue(field.name),
      style: { marginInline: "0.5em", width: "100%", marginBottom: "2em" },
      labelStyle: { fontWeight: "600", fontSize: "1.3em", marginLeft: "0.6em" },
    };

    if (field.label === "Processo") {
      return <Input {...commonProps} select={true} options={optionsProcesso} />;
    }

    if (field.label === "Interditado") {
      return (
        <Input {...commonProps} select={true} options={optionsInterditado} />
      );
    }

    return <Input {...commonProps} />;
  };

  return (
    <Container className={styles.container}>
      <Row>
        <div className={styles.inputs}>
          {fields.map((field, index) => {
            return (
              <Col lg={3} key={index} className={styles.center}>
                <div style={{ width: "85%" }}>{renderInput(field)}</div>
              </Col>
            );
          })}
        </div>
      </Row>
      {actions.length > 0 && (
        <Row>
          <div className={styles.btn}>
            {actions.map((action, index) => {
              if (action.label === "Cancelar") {
                return (
                  <Button
                    key={index}
                    text={action.label}
                    type={action.type}
                    style={{ marginTop: "1em" }}
                    onClick={() => console.log("ta fazendo ainda calma")}
                  />
                );
              } else {
                return (
                  <Button
                    key={index}
                    text={action.label}
                    type={action.type}
                    style={{ marginTop: "1em" }}
                    onClick={() => console.log("ta fazendo ainda calma")}
                  />
                );
              }
            })}
          </div>
        </Row>
      )}
      <Row>
        <Tabela title={"Últimos Lançamentos"} fields={fields} data={data} />
      </Row>
      <Row>
        <Col className={styles.col}>
          <Button
            text={"Confirmar"}
            onClick={() => sendForm()}
            style={styles.btn}
          />
        </Col>
        <Col className={styles.col}>
          <Button
            text={"Cancelar"}
            onClick={() => clearInputs()}
            style={styles.btn}
          />
        </Col>
        <Col className={styles.col}>
          <Button
            text={"Limpar Lançamentos"}
            onClick={() => console.log("ta fazendo ainda calma")}
            style={styles.btn}
          />
        </Col>
        <Col className={styles.col}>
          <Button
            text={"Salvar na Nuvem"}
            onClick={() => console.log("ta fazendo ainda calma")}
            style={styles.btn}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default HomeForm;
