/* eslint-disable no-unused-vars */
import styles from './Home.module.css';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Date from "../../components/Date/date";
import Button from "../../components/Button/button";
import Formulario from "../../components/Formulario/formulario";

import { useNavigate } from "react-router-dom";
import HomeForm from '../../components/HomeForm/Homeform';
import { useEffect, useState } from 'react';

function HomePage() {
    const fields = [
        { label: "Processo", type: "text", name: "ProcessName", id: "ProcessName" },
        { label: "ID Lote", type: "number", name: "BatchId", id: "BatchId" },
        { label: "Qntd Lote", type: "number", name: "BatchQnt", id: "BatchQnt" },
        { label: "Qntd de Refugo", type: "number", name: "ScrapQnt", id: "ScrapQnt" },
        { label: "PartNumber", type: "text", name: "PartNumber", id: "PartNumber" },
        { label: "Movimentação", type: "text", name: "Movement", id: "Movement" },
        { label: "EDV", type: "text", name: "OperatorEDV", id: "OperatorEDV" },
        { label: "Interditado", type: "text", name: "Interditated", id: "Interditated" }
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