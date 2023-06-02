import React from "react";
import Modal from 'react-bootstrap/Modal';
import Image from "next/image";
// import '../components/css/imageModal.css'

export default function ImageModal(props, history) {

    return (

         <Modal
             {...props}
             // size="lg"
             aria-labelledby="contained-modal-title-vcenter"
             centered
             fullscreen
         >
             <Modal.Header closeButton></Modal.Header>
             <Modal.Body className='position-relative w-full'>
                 <Image fill style={{objectFit:'contain', height: '100%', width: '100%'}} loading="lazy" alt='полное фото' src={props.src} className='fullImage'></Image>
             </Modal.Body>
        </Modal>
    )
}