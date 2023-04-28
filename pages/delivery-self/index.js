import React from 'react'
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Head from "next/head";
import {Container} from "react-bootstrap";
import {Map, Placemark, YMaps} from "react-yandex-map";

function SelfDelivery() {
    let width = '320px'

    return (
        <Container className="callout-colors-example fs-4 w-100 pb-3 text-white">
            <Head>
                <title>Самовывоз</title>
                {/*<meta name='description' content={product.description}/>*/}
                {/*<meta name='keywords' content={product.name}/>*/}
                <meta name='keywords'
                      content='sexshop, сексшоп, магазин интимных товаров для взрослых, секс игрушки, sex toys, интимшоп, интим шоп, intimshop, секс, вибратор, фаллоимитатор, вагина, фаллос, клитор, стимулятор, мастурбатор, куклы, эротическое белье'/>

            </Head>
            <Breadcrumb>
                <Breadcrumb.Item href='/'>Главная</Breadcrumb.Item>
                <Breadcrumb.Item href='/about'>
                    Информация
                </Breadcrumb.Item>
            </Breadcrumb>
            <h1 className='py-4'>Самовывоз из офиса г. Москва, м. Автозаводская</h1>
            <p>
                Вы можете самостоятельно забрать свой заказ по адресу г.Москва, ул. Автозаводская, дом 16, корпус 2, строение 8.
            </p>
            <p>
                Время работы: ежедневно с 9:00 до 21:00.
            </p>
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
            <p>

                После того, как заказ будет полностью укомплектован, ваш персональный менеджер свяжется с вами по указанным вами координатам и подтвердит готовность вашего заказа. После этого Вы можете забрать свой заказ в любой удобный день согласно графику работы нашего склада.
            </p>
            <p>
                Укомплектованный заказ хранится в пункте выдачи заказов в течение одной недели (7 календарных дней). Если получатель не забрал свой заказ в течение этого времени, заказ возвращается обратно на склад и расформировывается. Клиент уведомляется по электронной почте об отказе от заказа в связи с его неполучением.
            </p>

        </Container>
    )
}

export default SelfDelivery