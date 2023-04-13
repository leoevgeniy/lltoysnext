import React, {useEffect} from 'react'
import {Helmet} from "react-helmet";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import {Link} from "react-router-dom";
import {Map, Placemark, YMaps} from "react-yandex-maps";
import {Col, Container, Row} from "react-bootstrap";

function Recvisits() {
    let width = '320px'
    useEffect(() => {
        width = document.getElementById('YMap').clientWidth
    }, [])

    return (
        <Container className="callout-colors-example fs-4 w-100 pb-3">
            <Helmet>
                <title>Информация</title>
                {/*<meta name='description' content={product.description}/>*/}
                {/*<meta name='keywords' content={product.name}/>*/}
                <meta name='keywords'
                      content='sexshop, сексшоп, магазин интимных товаров для взрослых, секс игрушки, sex toys, интимшоп, интим шоп, intimshop, секс, вибратор, фаллоимитатор, вагина, фаллос, клитор, стимулятор, мастурбатор, куклы, эротическое белье'/>

            </Helmet>


            <Breadcrumb>
                <Breadcrumb.Item linkAs={Link} linkProps={{to: '/'}}>Главная</Breadcrumb.Item>
                <Breadcrumb.Item linkAs={Link} linkProps={{to: `/about`}}>
                    Информация
                </Breadcrumb.Item>
                {/*<Breadcrumb.Item linkAs={Link}*/}
                {/*                 linkProps={{to: `/?filter=${brSubCategory}`}}>*/}
                {/*    Доставка и оплата*/}
                {/*</Breadcrumb.Item>*/}
            </Breadcrumb>

            <YMaps className='YMap w-100'>
                <div id='YMap'>
                    <Map
                        width={width + 'px'}
                        defaultState={{
                            center: [55.705944, 37.646597],
                            zoom: 15,
                            autoFocus: true,

                            controls: ['zoomControl', 'fullscreenControl']
                        }} modules={['control.ZoomControl', 'control.FullscreenControl']}
                    >
                        <Placemark defaultGeometry={[55.705944, 37.646597]}/>
                    </Map>

                </div>
            </YMaps>
            <Row className='fs-4'>
                <Col>
                    <Row>
                        <h1 className=' pb-5'>Контакты</h1>
                        <div className='border-bottom'></div>
                        <p className='fw-bold'>АДРЕС СКЛАДА</p>
                        <p className=''>Москва, ул. Автозаводская,
                            дом 16, корпус 2, строение 8.
                        </p>
                        <p className='fw-bold'>Контактная информация</p>
                        <p>Email: <a href="mailto:support@lltoys.ru">support@lltoys.ru</a></p>
                        <p>Телефон: +7 (995) 131-08-12</p>
                        <p className='fw-bold'>Реквизиты</p>
                        <p>ИП Тихоненков Евгений Владимирович</p>
                        <p>Фактический адрес склада: Москва, ул. Автозаводская, дом 16, корпус 2, строение 8.</p>
                        <p>ОГРНИП: 318732500033201</p>

                    </Row>
                </Col>
                <Col>
                    <Row>
                        <h1 className=' pb-5'>График работы</h1>
                        <div className='border-bottom'></div>
                        <p className='fw-bold'>РАБОТА СКЛАДА</p>
                        <p className=''>Cклад работают <strong>ежедневно с 9.00 до 21.00.</strong></p>
                        <p className='fw-bold text-uppercase'>Прием заказов </p>
                        <p className=''>Прием заказов на сайте круглосуточно, без выходных, в удобное для Вас
                            время. </p>
                        <p className='fw-bold text-uppercase'>Обработка заказов</p>
                        <p className=''>Обработка заказов осуществляется ежедневно с 9.00 до 21.00. </p>
                        <p className='fw-bold text-uppercase'>Выдача заказов</p>
                        <p className=''>Выдача заказов в пункте самовывоза по адресу г. Москва, ул. Автозаводская, дом
                            16, корпус 2, строение 8 осуществляется ежедневно с 9.00 до 21.00. </p>
                        <p className='fw-bold text-uppercase'>Курьерская доставка</p>
                        <p className=''>Курьерская доставка заказов по Москве производится собственной курьерской
                            службой в любое удобное для Вас время с 10.00 до 19.00 по рабочим дням. </p>
                        <p className='fw-bold text-uppercase'>Доставка почтой</p>
                        <p className=''>Доставка почтой по России производится согласно почтовым срокам отправлений из
                            г. Москвы до города получателя и может варьироваться от 1 до 5 недель по России. Подробнее о
                            доставке почтой по России. </p>
                    </Row>
                </Col>
                <Col>
                    <Row>
                        <h1 className=' pb-5'>Наши приемущества</h1>
                        <div className='border-bottom'></div>
                        <h5 className='fw-bold ' > <i className='fa fa-calculator' style={{"color":"red"}}> БЕСПЛАТНАЯ ДОСТАВКА</i></h5>
                        <h5 className='fw-bold'> <i className='fa fa-scissors' style={{"color":"red"}}> ГАРАНТИЯ НИЗКОЙ ЦЕНЫ</i></h5>
                        <p>Постоянные распродажи со скидками до 70% + необыкновенные акции </p>
                        <h5 className='fw-bold'> <i className='fa fa-desktop' style={{"color":"red"}}> МЕГАМАРКЕТ 14.000 ТОВАРОВ</i></h5>
                        <p>Представленные в нашем каталоге товары действительно есть в наличии и готовы к продаже! </p>


                    </Row>
                </Col>

            </Row>
        </Container>
    )
}

export default Recvisits