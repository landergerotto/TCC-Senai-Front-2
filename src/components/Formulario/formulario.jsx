import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Card, CardBody, CardTitle } from "react-bootstrap";

import Input from "../Input/input";
import Button from '../Button/button';

import styles from './formulario.module.css';

function Formulario({ title, fields, actions = [], target, type }) {
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.clear();
    }, [1])

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
        let informations = [];

        for (let i = 0; i < fields.length; i++) {
            const field = fields[i];
            const info = localStorage.getItem(`${field.name}`);

            if (!info || info.trim().length < 1) {
                alert(`É necessário preencher o campo ${field.label}`);
                return;
            }
            if (confirmPassword() == true)
                informations.push(info);
            else {
                alert('As senham não coincidem.');
                return;
            }
        }
        // axios.post() CONFIGURAR O POST AQUI

        navigate(`${target}`);
        alert(`${title} realizado com sucesso.`);
    }

    return (
        <Card className={styles.card}>
            <CardBody className={styles.cardBody}>
                <div className={styles.cardTitle}>
                    <CardTitle className={styles.title}>{title}</CardTitle>
                </div>
                {fields.map((field, index) => {
                    return (
                        <Input key={index} label={field.label} type={field.type} name={field.name} id={field.name} onChange={() => getValue(field.name)} />
                    )
                })}
                <div className={styles.btn}>
                    {actions.map((action, index) => {
                        if (action.label === 'Cancelar') {
                            return (
                                <Button key={index} text={action.label} type={action.type} style={{ marginTop: '1em' }} onClick={() => navigate('/')} />
                            )
                        }
                        else {
                            return (
                                <Button key={index} text={action.label} style={{ marginTop: '1em' }} onClick={sendForm} />
                            )
                        }
                    })}
                </div>
            </CardBody>
        </Card>
    )
}

export default Formulario;