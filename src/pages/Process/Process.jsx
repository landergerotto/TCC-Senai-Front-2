import { Container, Col } from "react-bootstrap";

import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import Formulario from "../../components/Formulario/formulario";

import styles from "./Process.module.css";
import EditProcessForm from "../../components/EditProcessForm/EditProcessForm";

function ProcessPage() {
  let tab = localStorage.getItem("tab");

  if (tab == "" || !tab) {
    tab = "cadastro";
  }

  const fields = [
    { label: "Nome", type: "text", name: "Name" },
    { label: "CT", type: "text", name: "CT" },
    { label: "OEE", type: "number", name: "OEE" },
    { label: "POT", type: "number", name: "POT" },
    { label: "Quantidade MAE", type: "number", name: "MAEQnt" },
    { label: "Ordem na Linha", type: "number", name: "Order" },
  ];
  const actions = [
    { label: "Atualizar", type: "normal" },
    { label: "Cancelar", type: "cancel" },
  ];

  return (
    <Container className={styles.container}>
      <Col lg={6}>
        <Tabs
          defaultActiveKey={`${tab}`}
          id="justify-tab-example"
          className="mb-3"
          justify
        >
          <Tab
            eventKey="cadastro"
            title="Cadastro"
            onClick={() => localStorage.setItem("tab", "cadastro")}
          >
            <Formulario
              title={"Cadastro de Processo"}
              fields={fields}
              actions={actions}
              target={""}
              type={"register"}
              labelStyle={{ marginTop: "0.3em" }}
              url={"process/create"}
            />
          </Tab>
          <Tab
            eventKey="editar"
            title="Editar"
            onClick={() => localStorage.setItem("tab", "editar")}
          >
            <EditProcessForm
              titleEdit={"Editar Processo"}
              fieldsEdit={fields}
              actionsEdit={actions}
              targetEdit={""}
              typeEdit={"register"}
              labelStyleEdit={{ marginTop: "0.3em" }}
              urlEdit={"process/update"}
            />
          </Tab>
        </Tabs>
      </Col>
    </Container>
  );
}

export default ProcessPage;
