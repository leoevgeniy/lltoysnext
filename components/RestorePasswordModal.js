import React from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';



export default function RestorePasswordModal(props) {
    return (
        <Modal

            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            // fullscreen
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Проверьте почту
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    Мы отправили Вам письмо с инструкцией по сбросу пароля (не забудьте проверить в папке &quotспам&quot)
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>ОК</Button>
                {/*<Button onClick={denided}>Нет</Button>*/}
            </Modal.Footer>
        </Modal>
    );
}