import { Card, CardBody, CardTitle } from "react-bootstrap";
import Input from "../Input/input";
import styles from './formulario.module.css';
import Button from '../Button/button'

function Formulario({ title, action }) {
    return (
        <Card className={styles.card}>
            <CardBody>
                <div className={styles.cardTitle}>
                    <CardTitle className={styles.title}>{title}</CardTitle>
                </div>
                <Input label={"teste"} type={"email"} name={"teste"} />
                <div className={styles.btn}>
                    <Button text={action} style={{ marginTop: '1em' }} />
                    <Button text={action} type={"cancel"} style={{ marginTop: '1em' }}  />
                </div>
            </CardBody>
        </Card>
    )
}

export default Formulario;