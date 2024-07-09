import styles from './Login.module.css'

import { Container, Col } from "react-bootstrap";

import Formulario from "../../components/Formulario/formulario";

import { useNavigate } from "react-router-dom";

function LoginPage() {
    const navigate = useNavigate();

    const fields = [
        { label: "Email", type: "email", name: "email" },
        { label: "Senha", type: "password", name: "password" }
    ];
    const actions = [
        { label: "Entrar", type: "normal" },
        { label: "Cancelar", type: "cancel" }
    ];

    return (
        <Container className={styles.container}>
            <Col lg={6}>
                <Formulario title={"Login"} fields={fields} actions={actions} target={'/'} navigate={navigate} />
            </Col>
        </Container>
    )
}

export default LoginPage;