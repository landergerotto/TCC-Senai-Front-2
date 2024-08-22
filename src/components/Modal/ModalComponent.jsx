/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ModalComponent({ isOpened, onClose, data, confirmOnClick }) {
  return (
    <>
      <Modal show={isOpened} onHide={onClose} keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>{data.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{data.text}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            {data.btnCancel}
          </Button>
          <Button variant="primary" onClick={confirmOnClick}>
            {data.btnConfirm}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalComponent;
