import React from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import '../components/css/imageModal.css'
import {Image} from "react-bootstrap";

export default function ImageModal(props, history) {
    const denided = () => {
        window.location.assign('http://yandex.ru')
    }

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