import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {updateUserProfile} from "../actions/userActions";
import Message from "../components/Message";


function PasswordReset({history, match}) {
    const key = match.params.key
    const [pass, setPass] = useState('')
    const [error, setError] = useState('')

    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()
    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const {success} = userUpdateProfile

    const submitHandler = async (e) => {
        e.preventDefault()
        if (pass !== confirmPassword) {
            setMessage('Пароли не совпадают!')
        } else {
            try {
                const config = {
                    headers: {
                        "Content-type": "application/json",
                    },
                };

                const {data} = await axios.post(
                    "/api/users/resetpassword/",
                    {email: key, 'password' : pass},
                    config
                );
                history.push('/login')
            } catch (error) {
                setError(error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message)
            }
            setMessage('')
        }
    }
    return (
        <Container className='vh-100'>
            <h1>Введите новый пароль.</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='pass'>
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Введите пароль:'
                        value={pass}
                        onChange={(e) => {
                            setPass(e.target.value)
                        }}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='confirmPassword'>
                    <Form.Label>Подтвердите Пароль</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Подтвердите Пароль:'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary'>Обновить</Button>
            </Form>
        </Container>
    )

}

export default PasswordReset