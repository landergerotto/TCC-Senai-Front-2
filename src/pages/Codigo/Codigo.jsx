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
  import { useRef } from "react";
  
  function CodigoPage() {
    const navigate = useNavigate();
    const inputRefs = useRef([]);
  
    function handleChange(event, id) {
      const value = event.target.value;
  
      if (value && id < inputRefs.current.length - 1) {
        inputRefs.current[id + 1].focus();
      }
    }
  
    function handleKeyDown(event, id) {
      if (event.key === "Backspace") {
        if (inputRefs.current[id].value === "") {
          if (id > 0) {
            inputRefs.current[id - 1].focus();
          }
        } else {
          inputRefs.current[id].value = "";
        }
      }
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
                    {Array.from({ length: 6 }).map((_, index) => (
                      <Col key={index} className={styles.col} xs={1}>
                        <input
                          type="number"
                          id={index}
                          ref={(el) => (inputRefs.current[index] = el)}
                          onChange={(e) => handleChange(e, index)}
                          onKeyDown={(e) => handleKeyDown(e, index)}
                          maxLength={1}
                        />
                      </Col>
                    ))}
                  </CardText>
                  <div className={styles.btnGroup}>
                    <Button text={"Verificar Código"} />
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
      </>
    );
  }
  
  export default CodigoPage;
  