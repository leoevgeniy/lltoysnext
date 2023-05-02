import React, {useState, useEffect} from 'react'
import {LinkContainer} from 'react-router-bootstrap'
import {Form, Button, Row, Col, Table, Container} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Loader from '@/components/Loader'
import Message from '@/components/Message'
import {getUserDetails, logout, updateUserProfile} from '@/redux/actions/userActions'
import {USER_UPDATE_PROFILE_RESET} from '@/redux/typesUsers'
import {listMyOrders} from '@/redux/actions/orderActions'
import {useRouter} from "next/router";
import Link from "next/link";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function ProfileScreen({pageProps}) {
    const myOrders = pageProps.orders
    const history = useRouter()
    const [name, setName] = useState('')
    const [phone_number, setPhone_number] = useState('')
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')

    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const {loading, user, error} = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const {success} = userUpdateProfile

    const orderListMy = useSelector(state => state.orderListMy)
    const {loading: loadingOrders, error: errorOrders, orders} = orderListMy

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        } else {
            if (!user || !user.name || success || orders || userInfo._id !== user._id) {
                dispatch({type: USER_UPDATE_PROFILE_RESET})
                dispatch(getUserDetails('profile'))
                dispatch(listMyOrders())


            } else {
                setName(user.name)
                setEmail(user.email)
                setPhone_number(user.phone_number)
            }
        }
    }, [dispatch, history, userInfo, user, success])

    const submitHandler = (e) => {
        e.preventDefault()
        if (pass !== confirmPassword) {
            setMessage('Пароли не совпадают!')
        } else {
            dispatch(updateUserProfile({
                'id': user._id,
                'name': name,
                'email': email,
                'password': pass,
                'phone_number': phone_number
            }))
            setMessage('')
        }

    }
    const logoutHendler = () => {
        dispatch(logout())
        history.push('/')

    };

    return (
        <Container>
            <Row>
                {!myOrders &&
                    <Col md={3} className='text-white'>
                    <h2>Профиль</h2>
                    {message && <Message variant='danger'>{message}</Message>}
                    {error && <Message variant='danger'>{error}</Message>}
                    {loading && <Loader/>}
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
                </Col>}
                <Col md={myOrders ? 12 : 9}  className='text-white'>
                    <h2>Заказы</h2>
                    {loadingOrders ? (
                        <Loader/>
                    ) : errorOrders ? (
                        <Message variant='danger'>{errorOrders}</Message>
                    ) : (
                        <Table striped responsive className='table-sm w-100'>
                            <thead>
                            <tr  className='text-white w-100'>
                                <th>Номер</th>
                                <th className='d-none d-md-block'>Дата</th>
                                <th>Итого</th>
                                <th>Оплачено</th>
                                <th className='d-none d-md-block'>Доставлено</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {orders.map(order => (
                                <tr key={order._id}  className='text-white'>
                                    <td className='text-white'>{order._id}</td>
                                    <td className='text-white d-none d-md-block'>{order.createdAt.substring(0, 10)}</td>
                                    <td className='text-white'>₽ {order.totalPrice}</td>
                                    <td className='text-white'>{order.isPaid ? order.paidAt.substring(0, 10) : (
                                        <FontAwesomeIcon icon={faXmark} style={{color: 'red'}}/>
                                    )}</td>
                                    <td className='text-white d-none d-md-block'>{order.isDelivered ? order.deliveredAt.substring(0, 10) : (
                                        <FontAwesomeIcon icon={faXmark} style={{color: 'red'}}/>
                                    )}</td>
                                    <td className='text-white'>
                                        <Link href={`/order/${order._id}`}>
                                            <Button className='btn-sm'>Детали</Button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    )}
                </Col>
            </Row>
            <Button variant='primary' onClick={logoutHendler}>Выйти</Button>

        </Container>
    )
}

export const getServerSideProps = (context) => {
    const orders = context.query.orders || null
    return {props : {orders}}
}
export default ProfileScreen


