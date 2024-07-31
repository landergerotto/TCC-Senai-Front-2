import { Container, Col } from "react-bootstrap";
import Formulario from "../../components/Formulario/formulario";

import styles from './Register.module.css'

function RegisterPage() {
    const fields = [
        { label: "EDV", type: "number", name: "EDV" },
        { label: "Primeiro Nome", type: "text", name: "FirstName" },
        { label: "Último Nome", type: "text", name: "LastName" },
        { label: "Usuário Bosch", type: "text", name: "DisplayName" },
        { label: "Email", type: "email", name: "Email" },
        { label: "Data de Nascimento", type: "date", name: "Birth" },
        { label: "Senha", type: "password", name: "Password" },
        { label: "Confirmar senha", type: "password", name: "confirm" },
        { label: "Bosch ID", type: "text", name: "BoschId" }
    ];
    const actions = [
        { label: "Registrar", type: "normal" },
        { label: "Cancelar", type: "cancel" }
    ];
    return (
        <Container className={styles.container}>
            <Col lg={6}>
                <Formulario title={"Registro"} fields={fields} actions={actions} target={'/login'} type={'register'} labelStyle={{ marginTop: '0.5em' }} bgStyle={{ width: '15em' }} url={"user/create"} />
            </Col>
        </Container>
    )
}

export default RegisterPage;