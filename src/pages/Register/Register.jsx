import { Container } from "react-bootstrap";
import Formulario from "../../components/Formulario/formulario";

function RegisterPage() {
    const fields = [
        { label: "Nome", type: "text", name: "nome" },
        { label: "edv", type: "number", name: "edv" },
        { label: "Senha", type: "password", name: "password" },
        { label: "Confirmar senha", type: "password", name: "confirm" }
    ];
    const actions = ["Registrar", "Cancelar"];
    return (
        <Container>
            <Formulario title={"Registro"} fields={fields} actions={actions} target={'/login'} type={'register'}/>
        </Container>
    )
}

export default RegisterPage;