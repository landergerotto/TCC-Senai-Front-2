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
    const [data, setData] = useState([]);

    const optionsProcesso = ["Máquina 1", "Máquina 2", "Máquina 3"]; // PEGAR OS IDS DE MÁQUINAS CADASTRADAS AQUI
    const optionsInterditado = ["Sim", "Não"];

    // useEffect(() => {
    //     setData([{
    //         "proccess": "teste1",
    //         "lote": "123456",
    //         "qntdLote": 20,
    //         "qntdRefugo": 2,
    //         "partNumber": "F0R123",
    //         "movimentacao": "Entrada",
    //         "edv": "123456",
    //         "interditado": 5,
    //         "status": "approved"
    //     },
    //     {
    //         "proccess": "teste2",
    //         "lote": "123456",
    //         "qntdLote": 22,
    //         "qntdRefugo": 11,
    //         "partNumber": "F0R123",
    //         "movimentacao": "Saída",
    //         "edv": "123456",
    //         "interditado": 5,
    //         "status": "waiting"
    //     },
    //     {
    //         "proccess": "teste3",
    //         "lote": "123456",
    //         "qntdLote": 22,
    //         "qntdRefugo": 11,
    //         "partNumber": "F0R123",
    //         "movimentacao": "Saída",
    //         "edv": "123456",
    //         "interditado": 5,
    //         "status": "waiting"
    //     },
    //     {
    //         "proccess": "teste4",
    //         "lote": "123456",
    //         "qntdLote": 22,
    //         "qntdRefugo": 11,
    //         "partNumber": "F0R123",
    //         "movimentacao": "Saída",
    //         "edv": "123456",
    //         "interditado": 5,
    //         "status": "waiting"
    //     },
    //     {
    //         "proccess": "teste5",
    //         "lote": "123456",
    //         "qntdLote": 22,
    //         "qntdRefugo": 11,
    //         "partNumber": "F0R123",
    //         "movimentacao": "Saída",
    //         "edv": "123456",
    //         "interditado": 5,
    //         "status": "waiting"
    //     }
    //     ])
    // }, [1]);

    function getValue(id) {
        const element = document.getElementById(id);
        localStorage.setItem(`${id}`, element.value);
    }

    function getSelectValue(selectElement) {
        localStorage.setItem(selectElement.id, selectElement.value);
    }

    function confirmPassword() {
        if (type !== 'register')
            return true;

        let senha = localStorage.getItem('password');
        let confirma = localStorage.getItem('confirm');

        if (senha !== confirma)
            return false;
        return true;
    }

    function sendForm() {
        let lancamento = [];

        if (localStorage.getItem('lancamento'))
            lancamento = JSON.parse(localStorage.getItem('lancamento'));
        console.log('type lancamento: ', typeof (lancamento));
        console.log('lancamento: ', lancamento);

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
            } else {
                alert('As senham não coincidem.');
                return;
            }
        }
        // lancamento.push(informations);
        console.log('lancamento: ', lancamento);
        localStorage.setItem('lancamento', JSON.stringify(lancamento));
        setData(prevData => [...prevData, informations]);

        navigate(`${target}`);
        alert(`${title} realizado com sucesso.`);
    }


    const renderInput = (field) => {
        const commonProps = {
            label: field.label,
            type: field.type,
            name: field.name,
            id: field.name,
            onChange: () => getValue(field.name),
            style: { marginInline: '0.5em', width: '100%', marginBottom: '2em' },
            labelStyle: { fontWeight: '600', fontSize: '1.3em', marginLeft: '0.6em' }
        };

        if (field.label === 'Processo') {
            return <Input {...commonProps} select={true} options={optionsProcesso} />;
        }

        if (field.label === 'Interditado') {
            return <Input {...commonProps} select={true} options={optionsInterditado} />;
        }

        return <Input {...commonProps} />;
    };

    return (
        <Container className={styles.container}>
            <Row>
                <div className={styles.inputs}>
                    {
                        fields.map((field, index) => {
                            return (
                                <Col lg={3} key={index} className={styles.center}>
                                    <div style={{ width: '85%' }}>
                                        {renderInput(field)}
                                    </div>
                                </Col>
                            )
                        })
                    }
                </div>
            </Row>
            {
                actions.length > 0 &&
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
            }
            <Row>
                <Tabela title={'Últimos Lançamentos'} fields={fields} data={data} />
            </Row>
            <Row>
                <Col className={styles.col}>
                    <Button text={"Confirmar"} onClick={() => sendForm()} style={styles.btn} />
                </Col>
                <Col className={styles.col}>
                    <Button text={"Cancelar"} onClick={() => console.log("ta fazendo ainda calma")} style={styles.btn} />
                </Col>
                <Col className={styles.col}>
                    <Button text={"Salvar na Nuvem"} onClick={() => console.log("ta fazendo ainda calma")} style={styles.btn} />
                </Col>
            </Row>
        </Container>
    );
}

export default HomeForm;
