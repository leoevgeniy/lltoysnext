import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import {Form, Button, Row, Col, Container, ListGroupItem, ButtonGroup} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import {login, phoneLogin, register} from '@/redux/actions/userActions'

import Modal from "react-bootstrap/Modal";
import validator from "validator";
import axios from "axios";
import {useRouter, useSearchParams} from "next/navigation";
import {API_HOST} from "@/consts";

function LoginScreen() {
    const [email, setEmail] = useState('')
    const [phone_number, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [inputcode, setInputcode] = useState('')
    const [receivedCode, setReceivedCode] = useState({})
    const [axiosError, setAxiosError] = useState('')
    const [show, setShow] = useState(false);
    const [name, setName] = useState('')
    const [isValidPhone, setIsValidPhone] = useState('')
    const dispatch = useDispatch()
    const [exist, setExist] = useState(false)
    const searchParams = useSearchParams();
    const redirect = (searchParams.get('redirect') ? searchParams.get('redirect') : '/')
    // ? searchParams.split('=')[1] : '/'
    const [byPhone, setByPhone] = useState(!!searchParams.get('redirect'))
    const [byEmail, setByEmail] = useState(!searchParams.get('redirect'))

    const userLogin = useSelector(state => state.userLogin)
    const {loading, userInfo, error} = userLogin
    const handleClose = () => {
        if (inputcode === receivedCode) {
            setShow(false)
            dispatch(phoneLogin(phone_number, inputcode))
        } else {
            alert('Введен неверный код');
        }

    }
    const history = useRouter()
    const closeModal = () => {
        setShow(false)
    }
    const handleShow = () => setShow(true);

    // try {
    //     const loginPT = document.querySelector('.inRoute').scrollHeight * 0.5
    //     document.querySelector('.inRoute').style['justifyContent'] = 'center'
    //     let loginHeight = document.querySelector('.login').style.getCalculatedOffset()
    // } catch {
    // }

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
        // if (!loading && window.innerHeight > document.body.scrollHeight) {
        //     const height = window.innerHeight
        //     document.getElementById('root').style.height = String(window.innerHeight - document.querySelector('.footer').scrollHeight) + 'px'
        // }

    }, [userInfo, redirect, history])

    const submitHandler = (e) => {
        e.preventDefault()
        if (exist) {
        dispatch(login(email, password))}
        else {
            dispatch(register(name, email, inputcode, phone_number))
                .then(dispatch(phoneLogin(phone_number, inputcode)))
            setShow(false)
            history.push(`${redirect}`)
        }
    }

    const submitHandlerByPhone = async (e) => {
        e.preventDefault()
        if (validator.isMobilePhone(phone_number, ['ru-RU'])) {
            // Изменил state

            try {
                await axios.get(`${API_HOST}/api/users/profile/exist?phone=${phone_number}`)
                    .then(async exist => {
                        console.log(exist)
                        exist.data['detail'] ?
                            // setAxiosError(exist.data['detail'])
                            await axios.get(`${API_HOST}/api/users/phone_confirmation?phone=${phone_number}&key=iKa0EzMTcxYzNSuPgKecMEZt0K948dP0&service_id=450214&email=${email}`)
                                .then(response => {
                                    setReceivedCode(response.data['code'])
                                    setIsValidPhone(true)
                                    handleShow()
                                    setExist(false)
                                })                            :
                            await axios.get(`${API_HOST}/api/users/phone_confirmation?phone=${phone_number}&key=iKa0EzMTcxYzNSuPgKecMEZt0K948dP0&service_id=450214`)
                                .then(response => {
                                    setReceivedCode(response.data['code'])
                                    setIsValidPhone(true)
                                    handleShow(exist)
                                    setExist(true)

                                })
                    })


            } catch (error) {
                error.response && error.response.data.detail
                    ? setAxiosError(error.response.data.detail)
                    : setAxiosError(error.message)
            }


        } else {
            // Предупреждаю, что номер неверный
            alert('Некоректный номер телефона');
            // Подсвечиваю input с номером телефона для удобства
        }
    }
    return (
        <Container className='login mw-80'>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Введите последние 4 цифры</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Control

                        placeholder='4 цифры'
                        value={inputcode}
                        onChange={(e) => setInputcode(e.target.value)}
                    />
                    <p>Это будет Ваш пароль при авторизации на email. Пароль можно изменить в личном профиле</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        Отменить
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Проверить
                    </Button>
                </Modal.Footer>
            </Modal>

            <h1 className='text-white'>Логин</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader/>}
            <ListGroupItem className="border-0 d-flex justify-content-around">
                <ButtonGroup className="btn-group mr-2 fs-5 border-0">
                    <Button
                        style={byEmail ? {'backgroundColor': '#e5097f', 'border': 'none'} : {}}
                        onClick={(e) => {
                            setByEmail(true)
                            setByPhone(false)
                        }
                        }>
                        По email
                    </Button>
                    <Button
                        style={byPhone ? {'backgroundColor': '#e5097f', 'border': 'none'} : {}}
                        onClick={(e) => {
                            setByEmail(false)
                            setByPhone(true)
                        }
                        }>
                        По телефону
                    </Button>
                </ButtonGroup>
            </ListGroupItem>
            {byEmail &&
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='email'>
                        <Form.Label>Email адрес</Form.Label>
                        <Form.Control
                            type='email'
                            placeholder='Введите email адрес'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='password' className='mb-2'>
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Введите пароль:'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        >

                        </Form.Control>
                    </Form.Group>
                    <Button type='submit' variant='primary'>Войти</Button>

                </Form>
            }
            {byPhone &&
                <Form onSubmit={submitHandlerByPhone} className='d-flex flex-column'>
                    <Form.Group controlId='phone' className='mb-2'>
                        <Form.Label>Номер телефона</Form.Label>
                        <Form.Control
                            type='phone'
                            placeholder='Введите свой номер телефона'
                            value={phone_number}
                            onChange={(e) => setPhone(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Button type='submit' variant='primary' className='text-center'>Войти</Button>

                </Form>
            }

            {axiosError && <Message variant='danger'>{axiosError}</Message>}

            {byEmail &&
                <>
                    <Row className='py-3 text-white'>
                        <Col>
                            Новый пользователь? <Link
                            href={redirect ? `/inputpd?redirect=${redirect}` : '/inputpd'}
                        >
                            Зарегистрироваться
                        </Link>
                        </Col>
                    </Row>
                    {/*<Row className='py-2 text-white'>*/}
                    {/*    <Col>*/}
                    {/*        Забыли пароль? <Link*/}
                    {/*        href={'/login-restore'}*/}
                    {/*    >*/}
                    {/*        Восстановить*/}
                    {/*    </Link>*/}
                    {/*    </Col>*/}
                    {/*</Row>*/}
                </>
            }

        </Container>
    )
}

export default LoginScreen