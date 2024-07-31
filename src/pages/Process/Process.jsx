import { Container, Col } from "react-bootstrap";
import Formulario from "../../components/Formulario/formulario";

import styles from './Process.module.css'

function ProcessPage() {
    const fields = [
        { label: "Nome", type: "text", name: "Name" },
        { label: "CT", type: "number", name: "CT" },
        { label: "OEE", type: "number", name: "OEE" },
        { label: "POT", type: "number", name: "POT" },
        { label: "Quantidade MAE", type: "number", name: "MAEQnt" }
    ];
    const actions = [
        { label: "Cadastrar", type: "normal" },
        { label: "Cancelar", type: "cancel" }
    ];
    
    return (
        <Container className={styles.container}>
            <Col lg={6}>
                <Formulario title={"Cadastro de Processo"} fields={fields} actions={actions} target={'/login'} type={'register'} labelStyle={{ marginTop: '0.3em' }} url={"process/create"} />
            </Col>
        </Container>
    )
}

export default ProcessPage;