import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Row, Col, Container } from "react-bootstrap";

import Input from "../Input/input";
import Button from '../Button/button';

import styles from './Homeform.module.css';
import Tabela from "../Tabela/Tabela";

function HomeForm({ title, fields, actions = [], target, type, labelStyle }) {
    const navigate = useNavigate();
    const data = [{
        "proccess": "teste",
        "lote": "123456",
        "qntdLote": 20,
        "qntdRefugo": 2,
        "partNumber": "F0R123",
        "movimentacao": "Entrada",
        "edv": "123456",
        "interditado": 5,
        "status": "approved"
    },
    {
        "proccess": "teste2",
        "lote": "123456",
        "qntdLote": 22,
        "qntdRefugo": 11,
        "partNumber": "F0R123",
        "movimentacao": "Saída",
        "edv": "123456",
        "interditado": 5,
        "status": "waiting"
    },
    {
        "proccess": "teste2",
        "lote": "123456",
        "qntdLote": 22,
        "qntdRefugo": 11,
        "partNumber": "F0R123",
        "movimentacao": "Saída",
        "edv": "123456",
        "interditado": 5,
        "status": "waiting"
    },
    {
        "proccess": "teste2",
        "lote": "123456",
        "qntdLote": 22,
        "qntdRefugo": 11,
        "partNumber": "F0R123",
        "movimentacao": "Saída",
        "edv": "123456",
        "interditado": 5,
        "status": "waiting"
    },
    {
        "proccess": "teste2",
        "lote": "123456",
        "qntdLote": 22,
        "qntdRefugo": 11,
        "partNumber": "F0R123",
        "movimentacao": "Saída",
        "edv": "123456",
        "interditado": 5,
        "status": "waiting"
    }
    ];

    // useEffect(() => {
    //     localStorage.clear();
    // }, [1])

    function getValue(id) {
        const element = document.getElementById(id);
        localStorage.setItem(`${id}`, element.value);
    }

    function confirmPassword() {
        if (type != 'register')
            return true;

        let senha = localStorage.getItem('password');
        let confirma = localStorage.getItem('confirm');

        if (senha != confirma)
            return false;
        return true;
    }

    function sendForm() {
        let informations = {};

        for (let i = 0; i < fields.length; i++) {
            const field = fields[i];
            const info = localStorage.getItem(`${field.name}`);

            if (!info || info.trim().length < 1) {
                alert(`É necessário preencher o campo ${field.label}`);
                return;
            }

            if (confirmPassword()) {
                informations[field.name] = info;
            }
            else {
                alert('As senham não coincidem.');
                return;
            }
        }
        // axios.post() CONFIGURAR O POST AQUI
        localStorage.setItem('lancamento', JSON.stringify(informations));

        navigate(`${target}`);
        alert(`${title} realizado com sucesso.`);
    }

    return (
        <Container className={styles.container}>
            <Row>
                <div className={styles.inputs}>
                    {
                        fields.map((field, index) => {
                            return (
                                <Col lg={3} key={index} className={styles.center}>
                                    <div style={{ width: '85%' }}>
                                        <Input label={field.label} type={field.type} name={field.name} id={field.name} onChange={() => getValue(field.name)} style={{ marginInline: '0.5em', width: '100%', marginBottom: '2em' }} labelStyle={{ fontWeight: '600', fontSize: '1.3em', marginLeft: '0.6em' }} />
                                    </div>
                                </Col>
                            )
                        })
                    }
                </div>
            </Row>
            {
                actions.length > 0 ?
                    <Row>
                        <div className={styles.btn}>
                            {
                                actions.map((action, index) => {
                                    if (action.label === 'Cancelar') {
                                        return (
                                            <Button key={index} text={action.label} type={action.type} style={{ marginTop: '1em' }} onClick={() => console.log("ta fazendo ainda calma")} />
                                        )
                                    }
                                    else {
                                        return (
                                            <Button key={index} text={action.label} type={action.type} style={{ marginTop: '1em' }} onClick={() => console.log("ta fazendo ainda calma")} />
                                        )
                                    }
                                })
                            }
                        </div>
                    </Row>
                    :
                    <>

                    </>
            }
            <Row>
                <Tabela title={'Últimos Lançamentos'} fields={fields} data={data} />
            </Row>
            <Row>
                <Col className={styles.col}>
                    <Button text={"Confirmar"} onClick={() => sendForm()} style={styles.btn} />
                </Col>
                <Col className={styles.col}>
                    <Button text={"Salvar Lançamento"} onClick={() => console.log("ta fazendo ainda calma")} style={styles.btn} />
                </Col>
                <Col className={styles.col}>
                    <Button text={"Deletar Lançamento"} onClick={() => console.log("ta fazendo ainda calma")} style={styles.btn} />
                </Col>
            </Row>
        </Container>

    )
}

export default HomeForm;