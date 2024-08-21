import { Container, Col } from "react-bootstrap";
import Formulario from "../../components/Formulario/formulario";

import styles from './Partnumber.module.css'

function CadastroPartNumber() {
    const fields = [
        { label: "Nome", type: "text", name: "PartNumber" }
    ];
    const actions = [
        { label: "Cadastrar", type: "normal" },
        { label: "Cancelar", type: "cancel" }
    ];
    
    return (
        <Container className={styles.container}>
            <Col lg={6}>
                <Formulario title={"Cadastro de PartNumber"} fields={fields} actions={actions} target={''} labelStyle={{ marginTop: '0.3em' }} url={"partnr/create"} />
            </Col>
        </Container>
    )
}

export default CadastroPartNumber;