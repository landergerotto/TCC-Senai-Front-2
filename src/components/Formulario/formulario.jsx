import { Card, CardBody, CardTitle } from "react-bootstrap";
import Input from "../Input/input";
import styles from './formulario.module.css';
import Button from '../Button/button';

import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Formulario({ title, fields, actions, target, type }) {
    const navigate = useNavigate();
    const [status, setStatus] = useState(true);

    useEffect(() => {
        localStorage.clear();
    }, 1)

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
            <CardBody>
                <div className={styles.cardTitle}>
                    <CardTitle className={styles.title}>{title}</CardTitle>
                </div>
                {fields.map((field, index) => {
                    return (
                        <Input key={index} label={field.label} type={field.type} name={field.name} id={field.name} onChange={() => getValue(field.name)} />
                    )
                })}
                <div className={styles.btn}>
                    <Button text={actions[0]} style={{ marginTop: '1em' }} onClick={() => sendForm()} />
                    <Button text={actions[1]} type={"cancel"} style={{ marginTop: '1em' }} onClick={() => navigate('/')} />
                </div>
            </CardBody>
        </Card>
    )
}

export default Formulario;