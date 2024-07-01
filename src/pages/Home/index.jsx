import Date from "../../components/Date/date";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import styles from './index.module.css';
import Button from "../../components/Button/button";

function HomePage() {
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
                    <Button text={"cock and ball torture"} type={'cancel'}/>
                </Col>
                <Col></Col>
            </Row>
        </>
    )
}

export default HomePage;