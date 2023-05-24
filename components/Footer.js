import React from 'react'
// import {LinkContainer} from 'react-router-bootstrap'
import Link from 'next/link'
import {Container, Row, Col} from "react-bootstrap";
import Image from "next/image";
import kuragi from "../public/Kuragi.png";

function Footer() {
    // const footerHeight = document.querySelector('.footer_text').offsetHeight
    // const imgHeight = footerHeight*0.8 + 'px'
    // console.log(footerHeight)
    return (
        <Container className='d-none d-md-flex justify-content-center footer'>
            <Row className='py-3 text-light text-center fs-6 w-100'>
                {/*<Col className='col-3 position-relative w-full'>*/}
                {/*    /!*<Link href="/"*!/*/}
                {/*    /!*      className='d-none d-sm-none d-md-none d-lg-block d-xl-block d-xxl-block justify-self-left'>*!/*/}
                {/*        <Image fill style={{objectFit: "contain"}} loading="lazy" className='logo' src={kuragi} alt='Sex Shop logo'/>*/}
                {/*    /!*</Link>*!/*/}
                {/*</Col>*/}
                <Col className='col-12'>
                    <div className='d-flex justify-content-around fs-6'>
                        <div id='delivery'
                             className='d-none d-sm-none d-md-none d-lg-flex d-xl-flex d-xxl-flex flex-column text-light  px-5'>
                            <p>Доставка заказов</p>
                            <Link id='curerom' href='/delivery-curerom' className='link-secondary text-decoration-none'>
                                Курьером
                            </Link>
                            <Link id='pickpoint' href='/delivery-pickpoint'
                                  className='link-secondary text-decoration-none'>
                                Постоматы PickPoint
                            </Link>
                            <Link id='self' href='/delivery-self' className='link-secondary text-decoration-none'>
                                Самовывоз
                            </Link>
                            <Link id='pochtarf' href='/delivery-pochtarf'
                                  className='link-secondary text-decoration-none'>
                                Почта России
                            </Link>
                        </div>
                        <div id='delivery' className='d-flex flex-column text-light '>
                            <p>Информация</p>
                            <Link id='garanty' href='/garanty' className='link-secondary text-decoration-none'>
                                Гарантия и возврат
                            </Link>
                            <Link id='rekvisits' href='/rekvisits' className='link-secondary text-decoration-none'>
                                Наши реквизиты
                            </Link>
                            <Link id='oferta' href='/oferta' className='link-secondary text-decoration-none'>
                                Публичная оферта
                            </Link>
                            <Link id='opd' href='/opd' className='link-secondary text-decoration-none'>
                                <p>Согласие на обработку <br/>
                                    персональных данных</p>
                            </Link>
                        </div>
                        <div id='time' className='d-flex flex-column text-light '>
                            <p>Время работы</p>
                            <span id='garanty'>
                                Ежедневно: <span className='link-secondary'>9.00 - 21.00</span>
                            </span>
                            <span id='rekvisits'>
                                Телефон: <span className='link-secondary'>+7 (995) 131-08-12</span>
                            </span>

                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default Footer