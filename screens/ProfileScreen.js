import React, {useState, useEffect} from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Form, Button, Row, Col, Table} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'
import { listMyOrders } from '../actions/orderActions'

function ProfileScreen({ history }) {
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
            if (!user || !user.name || success || orders|| userInfo._id !== user._id) {
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
                'id' : user._id,
                'name' : name,
                'email' : email,
                'password' : pass,
                'phone_number' : phone_number
            }))
            setMessage('')
        }

    }
    
    return (
        <Row>
            <Col md={3}>
                <h2>Профиль</h2>
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
            </Col>        
            <Col md={9}>
                <h2>Заказы</h2>
                {loadingOrders ? (
                    <Loader />
                ) : errorOrders ? (
                    <Message variant='danger'>{errorOrders}</Message>
                ) : (
                    <Table striped responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>Номер</th>
                                <th>Дата</th>
                                <th>Итого</th>
                                <th>Оплачено</th>
                                <th>Доставлено</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.createdAt.substring(0, 10)}</td>
                                    <td>₽ {order.totalPrice}</td>
                                    <td>{order.isPaid ? order.paidAt.substring(0, 10) : (
                                        <i className='fas fa-times' style={{color: 'red'}}></i>
                                    )}</td>
                                    <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : (
                                        <i className='fas fa-times' style={{color: 'red'}}></i>
                                    )}</td>
                                    <td>
                                        <LinkContainer to={`/order/${order._id}`}>
                                            <Button className='btn-sm'>Подробнее</Button>
                                        </LinkContainer>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </Col>        
        </Row>
    )
}

export default ProfileScreen


