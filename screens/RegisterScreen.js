import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import {Form, Button, Row, Col, FormGroup, FormCheck, NavLink} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { register } from '../actions/userActions'
import {aggreement} from "../constants/aggreement";
import Offcanvas from "react-bootstrap/Offcanvas";


function RegisterScreen({ location, history }) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone_number, setPhone_number] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()

    const redirect = location.search ? location.search.split('=')[1] : '/'
    const userRegister = useSelector(state => state.userRegister)
    const {loading, userInfo, error} = userRegister

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            setMessage('Пароли не совпадают!')
        } else {
            dispatch(register(name, email, password, phone_number))
        }

    }
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (e) => {
        e.preventDefault()
        setShow(true);
    };

    return (

        <FormContainer>
            <Offcanvas show={show} onHide={handleClose} style={{width : '80%'}} restoreFocus={true}>
                <Offcanvas.Header closeButton>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {aggreement}
                </Offcanvas.Body>
                )
            </Offcanvas>
            <h1>Логин</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>

                <Form.Group controlId='name'>
                    <Form.Label>Фамилия Имя Отчество</Form.Label>
                    <Form.Control
                        required
                        type='name'
                        placeholder='Имя'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    >

                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='email'>
                    <Form.Label>Email адрес</Form.Label>
                    <Form.Control
                        required
                        type='email'
                        placeholder='Введите email адрес'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='phone_number'>
                    <Form.Label>Номер телефона</Form.Label>
                    <Form.Control
                        required
                        type='phone_number'
                        placeholder='Введите номер телефона'
                        value={phone_number}
                        onChange={(e) => setPhone_number(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control
                        required
                        type='password'
                        placeholder='Введите пароль:'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='confirmPassword'>
                    <Form.Label>Подтвердите Пароль</Form.Label>
                    <Form.Control
                        required
                        type='password'
                        placeholder='Подтвердите Пароль:'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <FormGroup>
                    <FormCheck
                        className="mt-3 mb-3 px-5 d-flex justify-content-rounded"
                        required
                        type="radio"
                        label={
                            <label> &nbsp; &nbsp;Даю согласие на обработку <Link to='' className='' onClick={handleShow}>Персональных данных</Link>
                            </label>}
                        id="policyCheck"
                        name="policyCheck"
                    >

                    </FormCheck>
                </FormGroup>
                <Button type='submit' variant='primary'>Зарегистрироваться</Button>
            </Form>
            <Row className='py-3'>
                <Col>
                        Уже зарегистрированы? <Link
                                    to={redirect ? `/login?redirect=${redirect}` : '/login'}
                                    >
                                    Войти
                                    </Link>
                </Col>
            </Row>
        </FormContainer>
    )
    }

export default RegisterScreen