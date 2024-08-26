import { Container } from "react-bootstrap";
import styles from './Test.module.css'
import Vsm from "../../components/Vsm/Vsm";

function TestPage() {
    return (
        <Container className={styles.container}>
            <Vsm />
        </Container>
    )
}

export default TestPage;