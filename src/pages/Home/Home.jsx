import Date from "../../components/Date/date";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import styles from './Home.module.css';
import Button from "../../components/Button/button";
import { useNavigate } from "react-router-dom";

function HomePage() {
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
                <Col></Col>
                <Col>
                    <Button text={"Login"} onClick={() => navigate('/login')} style={{ marginTop: '1em' }} />
                    <Button text={"Registro"} type={'cancel'} onClick={() => navigate('/register')} style={{ marginTop: '1em' }} />
                </Col>
                <Col></Col>
            </Row>
        </>
    )
}

export default HomePage;