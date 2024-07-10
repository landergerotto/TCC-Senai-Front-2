import { Container, Col } from "react-bootstrap";
import Formulario from "../../components/Formulario/formulario";

import styles from './Register.module.css'

function RegisterPage() {
    const fields = [
        { label: "Nome", type: "text", name: "nome" },
        { label: "edv", type: "number", name: "edv" },
        { label: "Senha", type: "password", name: "password" },
        { label: "Confirmar senha", type: "password", name: "confirm" }
    ];
    const actions = [
        { label: "Registrar", type: "normal" },
        { label: "Cancelar", type: "cancel" }
    ];
    return (
        <Container className={styles.container}>
            <Col lg={6}>
                <Formulario title={"Registro"} fields={fields} actions={actions} target={'/login'} type={'register'} />
            </Col>
        </Container>
    )
}

export default RegisterPage;