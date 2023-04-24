import React from 'react'
import {Badge, Nav} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import Link from "next/link";
import {useRouter} from "next/router";

function CheckoutSteps({step1, step2, step3, step4}) {
    const history = useRouter()
    return (
        <Nav className='justify-content-center mb-4 px-0 fs-3'>
            <Nav.Item>
                {step1 ? (
                    <div className='px-2 py-3'>
                        <Badge bg='primary'>
                            Авторизация
                        </Badge>
                        {/*<Link href='/login'>*/}
                        {/*    Авторизация*/}
                        {/*</Link>*/}
                    </div>
                ) : (
                    <div className='px-2 py-3'>
                        <Badge bg='secondary'>
                            Авторизация
                        </Badge>
                        {/*<span>Авторизация</span>*/}
                    </div>
                )}

            </Nav.Item>
            <Nav.Item>
                {step2 ? (
                    <div className='px-2 py-3'>
                        <Badge onClick={() => history.push('/shipping')} bg='primary'>
                            Оформление заказа
                        </Badge>
                    </div>
                ) : (
                    <div className='px-2 py-3'>
                        <Badge bg='secondary'>
                            Оформление заказа

                        </Badge>
                    </div>
                )}

            </Nav.Item>
            <Nav.Item>
                {step3 ? (
                        <div className='px-2 py-3'>
                            <Badge onClick={() => history.push('/placeorder')} bg='primary'>
                                Оформление заказа
                            </Badge>
                        </div>
                ) : (
                    <div className='px-2 py-3'>
                        <Badge bg='secondary'>
                            Оформление заказа

                        </Badge>
                    </div>                )}

            </Nav.Item>
        </Nav>
    )
}

export default CheckoutSteps