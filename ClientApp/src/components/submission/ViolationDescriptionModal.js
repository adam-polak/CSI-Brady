import React, { useState } from "react";
import { Modal, ModalBody, ModalHeader, ListGroupItem } from "reactstrap";

const ViolationDescriptionModal = ({ violation, i }) => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <>
      <button className="btn p-0" onClick={toggle}>
        {" "}
        <ListGroupItem key={i}>{violation.Name}</ListGroupItem>
      </button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>{violation.Name}</ModalHeader>
        <ModalBody>{violation.Summary}</ModalBody>
      </Modal>
    </>
  );
};

export default ViolationDescriptionModal;
