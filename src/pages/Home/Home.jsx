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
        { label: "ID Lote", type: "number", name: "idLote" },
        { label: "Qntd Lote", type: "number", name: "qntdLote" },
        { label: "Qntd de Refugo", type: "number", name: "qntdRegufo" },
        { label: "PartNumber", type: "text", name: "partnumber" },
        { label: "Movimentação", type: "text", name: "movimentacao" },
        { label: "EDV", type: "text", name: "edv" },
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
                <HomeForm fields={fields} target={'/'} />
            </Row>
        </>
    )
}

export default HomePage;