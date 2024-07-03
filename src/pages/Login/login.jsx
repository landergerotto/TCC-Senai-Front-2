import { Container } from "react-bootstrap";
import Formulario from "../../components/Formulario/formulario";
import Input from "../../components/Input/input";

function LoginPage() {
    return (
        <Container>
            <Formulario title={"Login"} action={"Entrar"}/>
        </Container>
    )
}

export default LoginPage;