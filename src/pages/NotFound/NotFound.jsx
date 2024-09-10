import { Container, Card } from "react-bootstrap";

import styles from "./NotFound.module.css";

function NotFoundPage() {
  return (
    <Container className={styles.container}>
      <Card className={styles.card}>
        <Card.Body>
          <Card.Title className={styles.title}>ERROR 404...</Card.Title>
          <Card.Text className={styles.text}>
            A página que você tentou acessar não existe ou você não tem
            permissão para acessar
          </Card.Text>
          <div className={styles.waving}>(┬┬﹏┬┬)</div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default NotFoundPage;
