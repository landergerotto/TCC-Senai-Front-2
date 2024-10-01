import styles from "./Login.module.css";

import { Col, Container, Row, Tab, Tabs } from "react-bootstrap";

import Formulario from "../../components/Formulario/formulario";

import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  const localTabs = ["login", "register"];

  let tab = localStorage.getItem("tab");
  if (!tab || tab === "" || !localTabs.includes(tab)) tab = "login";

  var recuperaSenha = () => navigate("/recupera");

  var underTextStyle = {
    marginLeft: "0.25em",
    marginTop: "0.15em",
    color: "#007BC0",
    cursor: "pointer",
    width: "fit-content",
  };

  const fieldsLogin = [
    { label: "Email", type: "email", name: "email" },
    {
      label: "Senha",
      type: "password",
      name: "password",
      underText: "Esqueceu sua senha?",
      underTextAction: recuperaSenha,
      underTextStyle: underTextStyle,
    },
  ];

  const actionsLogin = [
    { label: "Entrar", type: "normal" },
    { label: "Cancelar", type: "cancel" },
  ];

  const fieldsRegister = [
    { label: "EDV", type: "number", name: "EDV" },
    { label: "Primeiro Nome", type: "text", name: "FirstName" },
    { label: "Último Nome", type: "text", name: "LastName" },
    { label: "Usuário Bosch", type: "text", name: "DisplayName" },
    { label: "Email", type: "email", name: "Email" },
    { label: "Data de Nascimento", type: "date", name: "Birth" },
    { label: "Senha", type: "password", name: "Password" },
    { label: "Confirmar senha", type: "password", name: "confirm" },
    { label: "Bosch ID", type: "text", name: "BoschId" },
  ];
  const actionsRegister = [
    { label: "Registrar", type: "normal" },
    { label: "Cancelar", type: "cancel" },
  ];

  function clearLocalStorage(fields) {
    fields.forEach((field) => {
      localStorage.removeItem(`${field.name}`);
    });
  }

  function handleSelect(key) {
    switch (key) {
      case "login":
        localStorage.setItem("tab", "login");
        break;

      case "register":
        localStorage.setItem("tab", "register");
        break;
    }
  }

  return (
    <Container className={styles.container}>
      <Tabs
        defaultActiveKey={`${tab}`}
        id="justify-tab-example"
        justify
        onSelect={(eventKey) => handleSelect(eventKey)}
      >
        <Tab eventKey="login" title="Login" className={styles.tab}>
          <Row>
            <Col>
              <Formulario
                title={"Login"}
                fields={fieldsLogin}
                actions={actionsLogin}
                target={""}
                navigate={navigate}
                labelStyle={{ marginTop: "0.5em" }}
                url={"auth/login"}
                onSubmit={() => {
                  clearLocalStorage(fieldsLogin);
                  localStorage.setItem("hasReloaded", false);
                }}
              />
            </Col>
          </Row>
        </Tab>
        <Tab eventKey="register" title="Registro" className={styles.tab}>
          <Row>
            <Col>
              <Formulario
                title={"Registro"}
                fields={fieldsRegister}
                actions={actionsRegister}
                type={"register"}
                target={"login"}
                labelStyle={{ marginTop: "0.5em" }}
                bgStyle={{ width: "15em" }}
                url={"user/create"}
                onSubmit={() => {
                  localStorage.setItem("tab", "login");
                  clearLocalStorage(fieldsRegister);
                }}
              />
            </Col>
          </Row>
        </Tab>
      </Tabs>
    </Container>
  );
}

export default LoginPage;
