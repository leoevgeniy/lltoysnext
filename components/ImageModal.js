import React from "react";
import Modal from 'react-bootstrap/Modal';
// import '../components/css/imageModal.css'

export default function ImageModal(props, history) {

    return (

         <Modal
             {...props}
             size="lg"
             aria-labelledby="contained-modal-title-vcenter"
             // centered
             fullscreen
         >
             <Modal.Header closeButton closeVariant='white'></Modal.Header>
             <Modal.Body>
                 <img src={props.src} className='fullImage'></img>
             </Modal.Body>
        </Modal>
    )
}