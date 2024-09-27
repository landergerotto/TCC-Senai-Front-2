import {
  Card,
  CardBody,
  CardText,
  CardTitle,
  Col,
  Container,
  Row,
} from "react-bootstrap";

import styles from "./Codigo.module.css";
import Button from "../../components/Button/button";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { apiUrl } from "../../Api/apiUrl";
import ModalComponent from "../../components/Modal/ModalComponent";

function CodigoPage() {
  const navigate = useNavigate();
  const inputRefs = useRef([]);
  const size = 6;

  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [modalFunc, setModalFunc] = useState();
  const [modalFunc2, setModalFunc2] = useState();

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  function checkInput(input) {
    let letters = [...input];
    return letters;
  }

  function handleChange(event, id) {
    const value = event.target.value;
    const letters = checkInput(value, id);
    if (letters.length > 1) {
      letters.forEach((letter, index) => {
        const currentInput = inputRefs.current[id + index];
        if (currentInput) {
          currentInput.value = letter;
        }
      });
      const lastFilledInputIndex = id + letters.length - 1;
      const isLastInput = lastFilledInputIndex >= inputRefs.current.length - 1;

      if (isLastInput) inputRefs.current[inputRefs.current.length - 1].focus();
      else inputRefs.current[lastFilledInputIndex + 1].focus();
    } else if (value && id < inputRefs.current.length - 1) {
      inputRefs.current[id + 1].focus();
    }
  }

  function handleKeyDown(event, id) {
    if (event.key === "Backspace") {
      if (inputRefs.current[id].value === "") {
        if (id > 0) inputRefs.current[id - 1].focus();
      } else {
        inputRefs.current[id].value = "";
      }
    }
  }

  function onlyNumbers(string) {
    return /^\d+$/.test(string);
  }

  function verifyToken() {
    const token = inputRefs.current.map((input) => input.value).join("");
    const Email = localStorage.getItem("Email");
    const EDV = localStorage.getItem("EDV");

    if (token.length != 6 || !onlyNumbers) {
      setModalData({
        title: "Erro",
        text: "Código Inválido, tente novamente.",
        btnCancel: "Fechar",
      });
      setShowModal(true);
      return;
    }

    if (!EDV || !Email) {
      setModalData({
        title: "Erro",
        text: "Houve um problema ao processar a solicitação, tente novamente.",
        btnCancel: "Fechar",
      });
      setShowModal(true);
      return;
    }

    apiUrl
      .post("/auth/validtoken", { EDV, Email, token })
      .then((response) => {
        navigate("/redefine");
      })
      .catch((error) => {
        console.error("Houve um erro na requisição: ", error);
        setModalData({
          title: "Erro",
          text: "Houve um erro na requisição, tente novamente.",
          btnCancel: "Fechar",
        });
        setShowModal(true);
      });
  }

  return (
    <>
      <Container style={{ marginTop: "8em" }}>
        <Row className={styles.container}>
          <Col sm={8} lg={6}>
            <Card>
              <CardBody>
                <CardTitle className={styles.title}>
                  Inserir Código de Verificação
                </CardTitle>
                <CardText className={styles.inputs}>
                  {Array.from({ length: size }).map((_, index) => (
                    <Col key={index} className={styles.col} xs={1}>
                      <input
                        type="number"
                        id={index}
                        ref={(el) => (inputRefs.current[index] = el)}
                        onChange={(e) => handleChange(e, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        maxLength={1}
                        className={styles.inputCode}
                      />
                    </Col>
                  ))}
                </CardText>
                <div className={styles.btnGroup}>
                  <Button
                    text={"Verificar Código"}
                    onClick={() => verifyToken()}
                  />
                  <Button
                    text={"Cancelar"}
                    type={"cancel"}
                    onClick={() => navigate("/")}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      <ModalComponent
        isOpened={showModal}
        onClose={handleCloseModal}
        data={modalData}
        confirmOnClick={modalFunc}
        confirmOnClick2={modalFunc2}
      />
    </>
  );
}

export default CodigoPage;
