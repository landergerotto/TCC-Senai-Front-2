import styles from './Home.module.css';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Date from "../../components/Date/date";
import Button from "../../components/Button/button";
import Formulario from "../../components/Formulario/formulario";

import { useNavigate } from "react-router-dom";
import HomeForm from '../../components/HomeForm/Homeform';

function HomePage() {
    const fields = [
        { label: "Processo", type: "text", name: "processo" },
        { label: "Identificação do Lote", type: "number", name: "idLote" },
        { label: "Quantidade do Lote", type: "number", name: "qntdLote" },
        { label: "Quantidade de Refugo", type: "number", name: "qntdRegufo" },
        { label: "PartNumber", type: "text", name: "partnumber" },
        { label: "Movimentação", type: "text", name: "movimentacao" },
        { label: "Edv do Operador", type: "text", name: "edv" },
        { label: "Interditado", type: "text", name: "interditado" },
    ]

    const navigate = useNavigate();
    return (
        <>
            <Row>
                <Col></Col>
                <Col></Col>
                <Col className={styles.end}>
                    <Date />
                </Col>
            </Row>
            <Row>
                <HomeForm fields={fields}  target={'/'}/>
            </Row>
            <Row>
                <Col></Col>
                <Col>
                    <Button text={"Login"} onClick={() => navigate('/login')} style={{ marginTop: '1em' }} />
                    <Button text={"Registro"} type={'cancel'} onClick={() => navigate('/register')} style={{ marginTop: '1em' }} />
                    <Button text={"Cadastro de Processo"} type={'cancel'} onClick={() => navigate('/create')} style={{ marginTop: '1em' }} />
                </Col>
                <Col></Col>
            </Row>
        </>
    )
}

export default HomePage;