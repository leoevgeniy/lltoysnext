import React from 'react'
import Breadcrumb from "react-bootstrap/Breadcrumb";
import {Container, Image} from "react-bootstrap";
import Head from "next/head";

function PickPoint() {
    return (
        <Container className="callout-colors-example fs-4 w-100 pb-3">
            <Head>
                <title>Постаматы PickPoint по всей России</title>
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
            <h1 className='py-4'>Постаматы PickPoint по всей России</h1>
            <p>
                Оплатить заказ Вы сможете непосредственно в терминале наличными или пластиковой картой.
            </p>
            <p>
                Постаматы PickPoint – уникальная альтернатива почте и курьерской доставке, обеспечивающая полный цикл
                доставки и выдачи заказов. Этот способ идеально подходит для доставки интимных товаров - при получении
                заказа покупатель не контактирует с продавцом! Вы получаете товар в постамате без участия других людей.
            </p>
            <p>
                Через постаматы, установленные в ближайшем от Вас супермаркете или торговом центре, Вы можете
                самостоятельно в течение 3-х дней в любое удобное время получить свой заказ - без очередей и ожидания
                курьера.
            </p>
            <p>
                Сеть PickPoint насчитывает более 1800 постаматов и пунктов выдачи в более чем 460 городах и населенных
                пунктах России.
            </p>
            <p>
                При поступлении заказа в постамат или пункт выдачи, Вам на телефон, который был указан на сайте при
                оформлении заказа, поступит смс-оповещение с кодом заказа и сроком хранения. В случае, если Вы не
                успеваете в указанный срок получить Ваш заказ, то возможно самостоятельно и бесплатно продлить срок
                хранения заказа еще на три дня, с помощью <a className='text-decoration-none'
                                                              href='https://pickpoint.ru/mobile/'>мобильного
                приложения</a> или на сайте <a className='text-decoration-none'
                                               href='https://pickpoint.ru/'>PickPoint.</a>
            </p>
            <p>
                При доставке по Москве, заказ будет размещен в выбранном Вами постамате через 2 рабочих дня с момента
                передачи заказа в службу доставки PickPoint.
            </p>
            <p>
                При доставке в другие города России, заказ будет доставлен в пункт самовывоза или в выбранный Вами
                постамат через 4-5 рабочих дней после размещения заказа, в зависимости от удаленности Вашего региона.
            </p>
            <p>
                О том, зачем нужна предоплата за заказ с курьерской доставкой и как сделать подарок Любимому человеку,
                живущему в другом городе (или даже в другой стране).
            </p>
            <p>
                Заказы оформленные на сайте до 10.00 утра рабочего дня (с понедельника по пятницу) передаются в службу
                доставки PickPoint в тот же день.
            </p>
            <p>
                Заказы, оформленные после 10.00 утра последнего рабочего дня перед выходными (пятницы), а также в
                выходные дни (субботу и воскресенье), будут переданы в службу доставки PickPoint после 15.00
                понедельника.
            </p>
            <h3>Шаги покупателя при получении заказа через постамат:</h3>
            <Image src='http://stripmag.ru/images/pickpoint-way.gif' className='img-fluid mx-auto d-block'></Image>
            <p>Оплатить покупку при доставке в постамат Вы можете следующими способами: </p>
            <ul>
                <li>Наличные или кредитная карта в постамате при получении заказа (комиссия 0%)</li>
                <li>Карты VISA, MasterCard, Maestro..., предоплата (комиссия 0%)</li>
                <li>Банковский перевод, предоплата (комиссия 1-5%)</li>
            </ul>
        </Container>

    )
}

export default PickPoint