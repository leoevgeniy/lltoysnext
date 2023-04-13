import {Button, Col, Container, Form, Row} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import axios from "axios";
import Message from "../components/Message";
import Loader from "../components/Loader";
import RestorePasswordModal from "../components/RestorePasswordModal";
import {Link} from "react-router-dom";


function LoginRestoreScreen({history}) {
    const userLogin = useSelector(state => state.userLogin)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [email, setEmail] = useState('')
    const [modalShow, setModalShow] = useState(false);
    useEffect(() => {
        if (error) {

        }
            }, [])
    const submitHandler = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {

            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };
            const {data} = await axios.post(
                "/api/users/restore/",
                {email: email},
                config
            );
            setModalShow(true)
            setLoading(false)
            // history.push('/login')
        } catch (error) {
            setError(error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message)
            setLoading(false)
        }
        // if (!error) {
        //
        //     history.push('/login')
        // }
    }
    return (
        <Container className='vh-100'>
            {/*<RestorePasswordModal*/}
            {/*    backdrop="static"*/}
            {/*    keyboard={true}*/}
            {/*    show={modalShow}*/}
            {/*    onHide={() => {*/}
            {/*        setModalShow(false)*/}
            {/*        history.push('/login')*/}
            {/*    }}*/}
            {/*/>*/}
            {
                loading ? <Loader/>
                    : ( modalShow ?
                        <>
                            <h1 className='py-5'>Инструкция по восстановлению отправлена на Ваш email.</h1>
                            <Link to='/login'>Войти в систему</Link>
                        </>
                        :
                        <>
                            <h1>Восстановление забытого пароля.</h1>
                            <Form onSubmit={submitHandler}>
                                <Form.Group controlId='email'>
                                <Form.Label className='pb-3'>Забыли пароль? Введите ваш email для начала процесса восстановления пароля.</Form.Label>
                                <Form.Control
                                    type='email'
                                    placeholder='Введите email адрес'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                >
                                </Form.Control>
                                </Form.Group>
                                <Button type='submit' variant='primary' className='mt-5'>Отправить</Button>

                            </Form>
                        </>
                )
            }

        </Container>
    )

}

export default LoginRestoreScreen