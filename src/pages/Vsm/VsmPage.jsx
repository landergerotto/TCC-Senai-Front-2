import { Container } from "react-bootstrap";
import styles from './VsmPage.module.css'
import Vsm from "../../components/Vsm/Vsm";

function VsmPage() {
    return (
        <Container className={styles.container} style={{ marginBlock: '2em' }}>
            <Vsm />
        </Container>
    )
}

export default VsmPage;