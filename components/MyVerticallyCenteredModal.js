// import React from "react";
import {Modal} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";


export default function MyVerticallyCenteredModal(props) {
    const [isBrowser, setIsBrowser] = useState(false);
    const history = useRouter()
    const denided = () => {
        if (history.isReady) {
        window.location.assign('http://yandex.ru')
    }}
    useEffect(() => {
        setIsBrowser(true);
    }, []);

    if (isBrowser) {
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
    } else {return null}
}