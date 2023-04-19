import React from 'react'
import {Nav} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import Link from "next/link";

function CheckoutSteps({step1, step2, step3, step4}) {
    return (
        <Nav className='justify-content-center mb-4 px-0'>
            <Nav.Item>
                {step1 ? (
                    <Link href='/login'>
                        Логин
                    </Link>
                ) : (
                    <span>Логин</span>
                )}

            </Nav.Item>
            <Nav.Item>
                {step2 ? (
                    <Link href='/shipping'>
                        Доставка
                    </Link>
                ) : (
                    <span>Доставка</span>
                )}

            </Nav.Item>
            <Nav.Item>
                {step3 ? (
                    <Link href='/payment'>Оплата</Link>
                ) : (
                    <span>Оплата</span>
                )}
            </Nav.Item>
            <Nav.Item>
                {step4 ? (
                    <Link href='/placeorder'>
                        Заказ
                    </Link>
                ) : (
                    <span>Заказ</span>
                )}

            </Nav.Item>
        </Nav>
    )
}

export default CheckoutSteps