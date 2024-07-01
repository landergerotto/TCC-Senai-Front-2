import Date from "../../components/Date/date";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import styles from './index.module.css';

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
                <Col>
                    {/* Denis dj */}
                </Col>
            </Row>
        </>
    )
}

export default HomePage;