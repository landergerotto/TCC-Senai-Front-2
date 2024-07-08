import { Card, CardBody, CardTitle } from "react-bootstrap";
import Input from "../Input/input";
import styles from './formulario.module.css';
import Button from '../Button/button';

import axios from "axios";

function Formulario({ title, fields, actions }) {
    function getValue(id) {
        const element = document.getElementById(id);
        localStorage.setItem(`${id}`, element.value);
    }

    function sendForm() {
        let informations = [];
        fields.map((field, index) => {
            const info = localStorage.getItem(`${field.name}`);
            
            if(!info || info.split.length < 1) {
                alert(`É necessário preencher o campo ${field.label}`);
                return;
            }
            informations[index] = info;
        });

        // axios.post() CONFIGURAR O POST AQUI 
    }

    return (
        <Card className={styles.card}>
            <CardBody>
                <div className={styles.cardTitle}>
                    <CardTitle className={styles.title}>{title}</CardTitle>
                </div>
                {fields.map((field, index) => {
                    return (
                        <Input key={index} label={field.label} type={field.type} name={field.name} id={field.name} onChange={() => getValue(field.name)}/>
                    )
                })}
                <div className={styles.btn}>
                    <Button text={actions[0]} style={{ marginTop: '1em' }} onClick={() => sendForm()}/>
                    <Button text={actions[1]} type={"cancel"} style={{ marginTop: '1em' }} />
                </div>
            </CardBody>
        </Card>
    )
}

export default Formulario;