import { Container, Col } from "react-bootstrap";
import Formulario from "../../components/Formulario/formulario";

import styles from './Register.module.css'

function RegisterPage() {
    const fields = [
        { label: "EDV", type: "number", name: "EDV" },
        { label: "Primeiro Nome", type: "text", name: "firstName" },
        { label: "Último Nome", type: "text", name: "lastName" },
        { label: "Usuário Bosch", type: "text", name: "displayName" },
        { label: "Email", type: "email", name: "email" },
        { label: "Data de Nascimento", type: "date", name: "birth" }, 
        { label: "Bosch ID", type: "text", name: "boschId" }, 
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
                <Formulario title={"Registro"} fields={fields} actions={actions} target={'/login'} type={'register'} labelStyle={{ marginTop: '0.5em' }} />
            </Col>
        </Container>
    )
}

export default RegisterPage;