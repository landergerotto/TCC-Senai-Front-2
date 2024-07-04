import { Container } from "react-bootstrap";
import Formulario from "../../components/Formulario/formulario";
import Input from "../../components/Input/input";

function LoginPage() {
    const fields = [
        { label: "Email", type: "email", name: "email" },
        { label: "Senha", type: "password", name: "password" }
    ];
    let actions = ["Entrar", "Cancelar"];
    return (
        <Container>
            <Formulario title={"Login"} fields={fields} actions={actions} />
        </Container>
    )
}

export default LoginPage;