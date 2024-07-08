import { Container } from "react-bootstrap";
import Formulario from "../../components/Formulario/formulario";

function ProcessPage() {
    const fields = [
        { label: "Nome", type: "text", name: "nome" },
        { label: "CT", type: "text", name: "ct" },
        { label: "OEE", type: "number", name: "oee" },
        { label: "POT", type: "number", name: "pot" },
        { label: "Quantidade MAE", type: "number", name: "qndtMAE" }    
    ];
    const actions = ["Registrar", "Cancelar"];
    return (
        <Container>
            <Formulario title={"Cadastro de Processo"} fields={fields} actions={actions} target={'/login'} type={'register'}/>
        </Container>
    )
}

export default ProcessPage;