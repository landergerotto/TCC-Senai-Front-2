/* eslint-disable no-unused-vars */
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
        { label: "Processo", type: "text", name: "processo", id: "processo" },
        { label: "ID Lote", type: "number", name: "idLote", id: "idLote" },
        { label: "Qntd Lote", type: "number", name: "qntdLote", id: "qntdLote" },
        { label: "Qntd de Refugo", type: "number", name: "qntdRefugo", id: "qntdRefugo" },
        { label: "PartNumber", type: "text", name: "partnumber", id: "partnumber" },
        { label: "Movimentação", type: "text", name: "movimentacao", id: "movimentacao" },
        { label: "EDV", type: "text", name: "edv", id: "edv" },
        { label: "Interditado", type: "text", name: "interditado", id: "interditado" }
    ]
    
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
                <HomeForm title={"Lançamento"} fields={fields} target={'/'} />
            </Row>
        </>
    )
}

export default HomePage;