// import React from "react";
import {Modal} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import React from "react";


export default function MyVerticallyCenteredModal(props) {
    const denided = () => {
        window.location.assign('http://yandex.ru')
    }
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            // fullscreen
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Вам уже исполнилось 18 лет?
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    Содежимое сайта предназначено для просмотра исключительно лицам, достигшим совершеннолетия!
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Да</Button>
                <Button onClick={denided}>Нет</Button>
            </Modal.Footer>
        </Modal>
    );
}