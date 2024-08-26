/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import Modal from "react-bootstrap/Modal";

import styles from "./ModalComponent.module.css";
import Button from "../Button/button";

function ModalComponent({ isOpened, onClose, data, confirmOnClick, confirmOnClick2 }) {
  return (
    <>
      <Modal show={isOpened} onHide={onClose} keyboard={false} className={styles.modal} size={'lg'}>
        <Modal.Header closeButton className={styles.header}>
          <Modal.Title className={styles.title}>{data.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.body}>
          <div className={styles.img}>{data.image}</div>
          <div className={styles.text}>{data.text}</div>
        </Modal.Body>
        <Modal.Footer className={styles.footer}>
          <Button onClick={confirmOnClick} text={data.btnConfirm} />
          {
            data.btnConfirm2 != null ?
            <Button onClick={confirmOnClick2} text={data.btnConfirm2} />
            :
            <></>
          }
          <Button onClick={onClose} text={data.btnCancel} type={'cancel'}/>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalComponent;
