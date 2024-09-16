import { Container, Col } from "react-bootstrap";

import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import Formulario from "../../components/Formulario/formulario";

import styles from "./Process.module.css";
import EditProcessForm from "../../components/EditProcessForm/EditProcessForm";
import DeleteProcessForm from "../../components/DeleteProcessForm/DeleteProcessForm";

function ProcessPage() {
  let tab = localStorage.getItem("tab");

  if (tab == "" || !tab) tab = "cadastro";

  const fields = [
    { label: "Nome", type: "text", name: "Name" },
    { label: "CT", type: "text", name: "CT" },
    { label: "OEE", type: "number", name: "OEE" },
    { label: "POT", type: "number", name: "POT" },
    { label: "Quantidade MAE", type: "number", name: "MAEQnt" },
    { label: "Ordem na Linha", type: "number", name: "Order" },
  ];
  const actions = [
    { label: "Cadastrar", type: "normal" },
    { label: "Cancelar", type: "cancel" },
  ];
  const actionsEdit = [
    { label: "Atualizar", type: "normal" },
    { label: "Cancelar", type: "cancel" },
  ];
  const actionsDelete = [
    { label: "Deletar", type: "normal" },
    { label: "Cancelar", type: "cancel" },
  ];

  function handleSelect(key) {
    switch (key) {
      case "cadastro":
        localStorage.setItem("tab", "cadastro");
        break;

      case "editar":
        localStorage.setItem("tab", "editar");
        console.log(tab);
        break;

      case "excluir":
        localStorage.setItem("tab", "excluir");
        console.log(tab);
        break;
    }
  }

  function clearLocalStorage() {
    fields.forEach(field => {
      localStorage.removeItem(`${field.name}`)
    });
    localStorage.removeItem('tab');
  }

  return (
    <Container className={styles.container}>
      <Col lg={6}>
        <Tabs
          defaultActiveKey={`${tab}`}
          id="justify-tab-example"
          className="mb-3"
          justify
          onSelect={(eventKey) => handleSelect(eventKey)}
        >
          <Tab eventKey="cadastro" title="Cadastro">
            <Formulario
              title={"Cadastro de Processo"}
              fields={fields}
              actions={actions}
              target={""}
              type={"register"}
              labelStyle={{ marginTop: "0.3em" }}
              url={"process/create"}
              onSubmit={() => clearLocalStorage()}
            />
          </Tab>
          <Tab eventKey="editar" title="Editar">
            <EditProcessForm
              titleEdit={"Editar Processo"}
              fieldsEdit={fields}
              actionsEdit={actionsEdit}
              targetEdit={""}
              typeEdit={"register"}
              labelStyleEdit={{ marginTop: "0.3em" }}
              urlEdit={"process"}
              btnStyle={{ marginTop: '1em' }}
            />
          </Tab>
          <Tab eventKey="excluir" title="Excluir">
            <DeleteProcessForm
              titleDelete={"Excluir Processo"}
              fieldsDelete={fields}
              actionsDelete={actionsDelete}
              targetDelete={""}
              typeDelete={"register"}
              labelStyleDelete={{ marginTop: "0.3em" }}
              urlDelete={"process/delete"}
              onSubmit={() => clearLocalStorage()}
            />
          </Tab>
        </Tabs>
      </Col>
    </Container>
  );
}

export default ProcessPage;
