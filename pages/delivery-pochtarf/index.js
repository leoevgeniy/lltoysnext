import React from 'react'
import Breadcrumb from "react-bootstrap/Breadcrumb";
import {Container} from "react-bootstrap";
import Head from "next/head";

function PochtaRF() {
    return (
        <Container className="callout-colors-example fs-4 w-100 pb-3 text-white">
            <Head>
                <title>Доставка почтой России</title>
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
            <h1 className='py-4'>Почта России</h1>
            <p>
                Если Вы желаете получить Ваш заказ в любом населенном пункте в пределах России, то при оформлении заказа
                выбирайте этот способ доставки.

                Если Вы полностью указали ФИО получателя и полный почтовый адрес, Ваш заказ будет выслан в течение 1-2
                рабочих дней. Точную дату отправки заказа мы сообщим Вам по е-мейл.
            </p>
            <p>
                В случае, если дом частный просьба во избежание дополнительной переписки с менеджерами указать в адресе
                после номера дома слово *частный*. Это значительно ускорит отправку Вашего заказа.
            </p>
            <p>

                Пожалуйста, указывайте правильный номер дома, т.е. если дом пишется через дробь, тогда правильный номер
                дома будет выглядеть так: д.2/7. Если номер дома указывается отдельно, но дом имеет строение (или
                корпус), то правильный адрес будет следующий: д.5 стр.1 (или д.4, корпус 2).
            </p>
            <p>
                Через 5-20 дней (в зависимости от скорости работы почты) в Ваш физический почтовый ящик придет
                уведомление о получении почтового отправления (бандероли). Это уведомление Вам нужно будет заполнить и
                отнести в Ваше почтовое отделение связи, где Вам выдадут бандероль с Вашим заказом.
            </p>
            <p>
                Пожалуйста, не забывайте указывать Ваш город и индекс!
            </p>
            <p>
                Если в течение 30 дней после получения от нас е-мейла об отправке заказа к Вам не пришло уведомление с
                почты о поступлении бандероли, мы настоятельно рекомендуем Вам взять паспорт, сходить на почту и
                спросить почтовых работников, пришла ли бандероль на Ваше имя и адрес. Бывают случаи, что уведомления о
                поступлении бандероли в почтовое отделение не приходят в почтовый ящик, т.е. получателя не уведомляют о
                том, что бандероль пришла.
            </p>
            <p>
                В случае доставки бандероли *до востребования* получателя тоже не извещают о приходе бандероли, поэтому
                Вам нужно будет это учесть.
            </p>
            <p>
                Если получатель не забрал бандероль в течение 30 дней, то она отправляется нам обратно.
            </p>
            <p>Об упаковке бандеролей Вы можете узнать на странице Упаковка и конфиденциальность. </p>

        </Container>
    )

}

export default PochtaRF