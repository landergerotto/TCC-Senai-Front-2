import { Card, CardBody, CardTitle } from "react-bootstrap";
import Input from "../Input/input";
import styles from './formulario.module.css';
import Button from '../Button/button'

function Formulario({ title, fields, actions }) {
    return (
        <Card className={styles.card}>
            <CardBody>
                <div className={styles.cardTitle}>
                    <CardTitle className={styles.title}>{title}</CardTitle>
                </div>
                {fields.map((field, index) => {
                    return (
                        <Input key={index} label={field.label} type={field.type} name={field.name} />
                    )
                })}
                <div className={styles.btn}>
                    <Button text={actions[0]} style={{ marginTop: '1em' }} />
                    <Button text={actions[1]} type={"cancel"} style={{ marginTop: '1em' }} />
                </div>
            </CardBody>
        </Card>
    )
}

export default Formulario;