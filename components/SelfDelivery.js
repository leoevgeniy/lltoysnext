import React from 'react'
import Accordion from "react-bootstrap/Accordion";
import {Helmet} from "react-helmet";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import {Link} from "react-router-dom";
import {Image} from "react-bootstrap";

function SelfDelivery() {
    return (
        <div className="callout-colors-example fs-4 w-100 pb-3">
            <Helmet>
                <title>Постаматы PickPoint по всей России</title>
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
            <h1 className='py-4'>Самовывоз из офиса г. Москва, м. Автозаводская</h1>
            <p>
                Вы можете самостоятельно забрать свой заказ по адресу г.Москва, ул. Автозаводская, дом 16, корпус 2, строение 8.
            </p>
            <p>
                Время работы: ежедневно с 9:00 до 21:00.
            </p>
            <p>

                После того, как заказ будет полностью укомплектован, ваш персональный менеджер свяжется с вами по указанным вами координатам и подтвердит готовность вашего заказа. После этого Вы можете забрать свой заказ в любой удобный день согласно графику работы нашего склада.
            </p>
            <p>
                Укомплектованный заказ хранится в пункте выдачи заказов в течение одной недели (7 календарных дней). Если получатель не забрал свой заказ в течение этого времени, заказ возвращается обратно на склад и расформировывается. Клиент уведомляется по электронной почте об отказе от заказа в связи с его неполучением.
            </p>

        </div>
    )
}

export default SelfDelivery