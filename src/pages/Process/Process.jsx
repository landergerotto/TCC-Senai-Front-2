import { Container, Col } from "react-bootstrap";
import Formulario from "../../components/Formulario/formulario";

import styles from './Process.module.css'

function ProcessPage() {
    const fields = [
        { label: "Nome", type: "text", name: "nome" },
        { label: "CT", type: "text", name: "ct" },
        { label: "OEE", type: "number", name: "oee" },
        { label: "POT", type: "number", name: "pot" },
        { label: "Quantidade MAE", type: "number", name: "qndtMAE" }
    ];
    const actions = [
        { label: "Cadastrar", type: "normal" },
        { label: "Cancelar", type: "cancel" }
    ];
    
    return (
        <Container className={styles.container}>
            <Col lg={6}>
                <Formulario title={"Cadastro de Processo"} fields={fields} actions={actions} target={'/login'} type={'register'} />
            </Col>
        </Container>
    )
}

export default ProcessPage;