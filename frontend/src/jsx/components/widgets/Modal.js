import React , { useState , useEffect} from "react";
import { Link } from "react-router-dom";
import { Button, Modal} from "react-bootstrap";

const ModalEdit = (props) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
    <div className="bootstrap-modal">
<Button variant="btn btn-primary btn-lg" className="mb-2 mr-2" onClick={handleShow} > Modifier </Button>
<Modal className="fade" show={show}>
   <Modal.Header>
      <Modal.Title>Modal title</Modal.Title>
      <Button
         onClick={handleClose}
         variant=""
         className="close"
      >
         <span>&times;</span>
      </Button>
   </Modal.Header>
   <Modal.Body>
      <p>
         Cras mattis consectetur purus sit amet
         fermentum. Cras justo odio, dapibus ac
         facilisis in, egestas eget quam. Morbi leo
         risus, porta ac consectetur ac, vestibulum at
         eros.
      </p>
   </Modal.Body>
   <Modal.Footer>
      <Button onClick={handleClose} variant="danger light" > Close </Button>
      <Button variant="primary">Save changes</Button>
   </Modal.Footer>
</Modal>
</div>
  );
};



export default ModalEdit;