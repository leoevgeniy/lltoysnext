import React, {useState, useEffect} from 'react'
// import {Form, Button, Container} from 'react-bootstrap'
// import {useDispatch, useSelector} from 'react-redux'
// import validator from 'validator'
// import {login, phoneLogin, register} from '@/redux/actions/userActions'
// import {LinkContainer} from "react-router-bootstrap";
// import isEmail from 'validator/lib/isEmail'
// // import '../components/css/inputPD.css'
// import Modal from 'react-bootstrap/Modal';
// import Message from "@/components/Message"
// import axios from "axios";
// // import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
// import {useRouter} from "next/router";
//
//
function InputPD() {
//     const history = useRouter()
//     const [phone_number, setPhone] = useState('')
//     const [name, setName] = useState('')
//     const [inputcode, setInputcode] = useState('')
//     const [email, setEmail] = useState('')
//     const [isValidPhone, setIsValidPhone] = useState('')
//     const [isExist, setIsExist] = useState('')
//     const userRegister = useSelector(state => state.userRegister)
//     let {loading, userInfo, error} = userRegister
//     const [receivedCode, setReceivedCode] = useState({})
//     const [axiosError, setAxiosError] = useState('')
//     const dispatch = useDispatch()
//     const [show, setShow] = useState(false);
//     const handleClose = () => {
//         if (inputcode === receivedCode) {
//             if (isExist) {
//                 dispatch(phoneLogin(phone_number, inputcode))
//                 history.push('/shipping')
//             } else {
//             setShow(false)
//             dispatch(register(name, email, inputcode, phone_number))
//                 .then(dispatch(phoneLogin(phone_number, inputcode)))
//             setShow(false)
//             history.push('/shipping')
//         }} else {
//             alert('Введен неверный код');
//         }
//
//     }
//     const closeModal = () => {
//         setShow(false)
//     }
//     const handleShow = () => setShow(true);
//     // try {
//     //     document.querySelector('.inRoute').scrollHeight*0.5
//     //     document.querySelector('.inRoute').style['justifyContent'] = 'center'
//     //     document.querySelector('.login').style.getCalculatedOffset()
//     // } catch {}
//
//     // useEffect(() => {
//     //     if (window.innerHeight > document.body.scrollHeight) {
//     //         const height = window.innerHeight
//     //         document.getElementById('root').style.height = String(window.innerHeight - document.querySelector('.footer').scrollHeight) + 'px'
//     //     }
//     //
//     //
//     // }, [window.innerHeight, document.body.scrollHeight])
//
//     const submitHandler = async (e) => {
//         e.preventDefault()
//         if (validator.isMobilePhone(phone_number, ['ru-RU'])) {
//             // Изменил state
//
//             try {
//                 await axios.get(`/api/users/phone_confirmation?phone=${phone_number}&key=${process.env.VALID_KEY}&service_id=450214&email=${email}`)
//                     .then(response => {
//                         setReceivedCode(response.data['code'])
//                         setIsValidPhone(true)
//                         handleShow()
//                     })
//             } catch (error) {
//                 error.response && error.response.data.detail
//                     ? setAxiosError(error.response.data.detail)
//                     : setAxiosError(error.message)
//             }
//
//
//         } else {
//             // Предупреждаю, что номер неверный
//             alert('Неверный номер телефона');
//             // Подсвечиваю input с номером телефона для удобства
//         }
//
//         // dispatch(login(email, password))
//
//     }
//
//
    return (
//         <>
//             <Modal show={show} onHide={handleClose}>
//                 <Modal.Header closeButton>
//                     <Modal.Title>Введите последние 4 цифры</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <Form.Control
//
//                         placeholder='4 цифры'
//                         value={inputcode}
//                         onChange={(e) => setInputcode(e.target.value)}
//                     />
//                     <p>Это будет Ваш пароль при авторизации на email. Пароль можно изменить в личном профиле</p>
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={closeModal}>
//                         Отменить
//                     </Button>
//                     <Button variant="primary" onClick={handleClose}>
//                         Проверить
//                     </Button>
//                 </Modal.Footer>
//             </Modal>
//             <Container className='login w-100 p-3'>
//
//                 <Form onSubmit={submitHandler}>
//                     {/*<p className='text-center fw-bold mt-3' style={{'fontSize': '20px'}}>Как Вас зовут </p>*/}
//                     {/*<Form.Group controlId='name'>*/}
//                     {/*    <Form.Control*/}
//
//                     {/*        placeholder='Введите Ваше ФИО'*/}
//                     {/*        value={name}*/}
//                     {/*        onChange={(e) => setName(e.target.value)}*/}
//                     {/*    />*/}
//
//                     {/*</Form.Group>*/}
//                     {/*<p className='text-center fw-bold mt-3' style={{'fontSize': '20px'}}> Ваш email*/}
//                     {/*    /!*<span className='text-danger'>*</span>*!/*/}
//                     {/*</p>*/}
//                     {/*<Form.Group controlId='phone' aria-required>*/}
//                     {/*    <Form.Control*/}
//                     {/*        placeholder='Введите Ваш email'*/}
//                     {/*        value={email}*/}
//                     {/*        onChange={(e) => setEmail(e.target.value)}*/}
//                     {/*    />*/}
//
//                     {/*</Form.Group>*/}
//                     <h2 className='text-center fw-bold mt-3' style={{'fontSize': '20px'}}>Введите номер телефона <span
//                         className='text-danger'>*</span></h2>
//                     <p style={{'fontSize': '15px'}}>Мы отправим код или позвоним. Отвечать на звонок не нужно.</p>
//
//                     <Form.Group controlId='phone'>
//                         <Form.Control
//                             required
//                             placeholder='+7 999 9999999'
//                             value={phone_number}
//                             onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
//                         />
//
//                     </Form.Group>
//                     <Button type='submit' variant='primary' className='my-3 text-center w-100'>Войти</Button>
//                     <p>Уже есть пользователь? <LinkContainer to='/login'><span
//                         className='text-primary'>Авторизоваться.</span></LinkContainer></p>
//                 </Form>
//
//             </Container>
//             {axiosError && <Message variant='danger'>{axiosError}</Message>}
//
//         </>
   <span>wsaegweg</span> )
}
//
export default InputPD