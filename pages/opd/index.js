import React, {useEffect} from 'react'
import Breadcrumb from "react-bootstrap/Breadcrumb";
import {Container} from "react-bootstrap";
import Head from "next/head";

function Opd() {
    useEffect(() => {
        // width = document.getElementById('YMap').clientWidth
    }, [])

    return (<Container className="callout-colors-example fs-4 w-100 pb-3">
        <Head>
            <title>Согласие на обработку персональных данных</title>
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
        <div className="article-container style-1">
            <h1>Согласие на обработку персональных данных</h1>
            <div style={{"height": "20px"}}>
            </div>
            <p>
                Настоящим пользователь сайта <b>lltoys.ru</b> (далее – «Сайт»), установивший «флажок» в
                соответствующей части Сайта (далее – Пользователь Сайта), свободно, своей волей и в своём интересе
                предоставляет <b>ИП Тихоненков Евгений Владимирович</b>&nbsp;(<b>ИНН:
                732508791379, ОГРНИП:&nbsp;318732500033201</b>, адрес склада: <b>РФ, 115114, г. Москва, ул. Автозаводская, дом 16, корпус 2, строение 8</b>, далее – «Оператор») свое конкретное, информированное и сознательное согласие на обработку своих
                персональных данных на нижеуказанных условиях:
            </p>
            <p>
                Цель обработки персональных данных:&nbsp;получение от Оператора информации и материалов рекламного
                характера, в том числе информации о специальных предложениях и скидках, использование возможностей Сайта
                и его сервисов.
            </p>
            <p>
                Перечень персональных данных, на обработку которых дается согласие субъекта персональных
                данных:&nbsp;настоящее согласие предоставлено Пользователем Сайта Оператору на обработку тех
                персональных данных, которые предоставлены Пользователем Сайта при заполнении полей в соответствующей
                части Сайта (в том числе, адрес электронного почтового ящика, фамилия, имя, отчество).
            </p>
            <p>
                Перечень действий с персональными данными, на совершение которых дается согласие:&nbsp;сбор, запись,
                систематизация, накопление, хранение, уточнение (обновление, изменение), извлечение, использование,
                обезличивание, блокирование, удаление, уничтожение персональных данных.
            </p>
            <p>
                Общее описание используемых Оператором способов обработки персональных данных:&nbsp;неавтоматизированная
                обработка&nbsp;персональных данных, автоматизированная обработка персональных данных, в том числе с
                передачей и без передачи по сети «Интернет», смешанная обработка&nbsp;персональных данных.
            </p>
            <p>
                Настоящее согласие на обработку его персональных данных действует бессрочно и может быть отозвано в
                любой момент путем направления соответствующего заявления Оператору на адрес электронного почтового
                ящика: <b><a href="mailto:support@lltoys.ru">support@lltoys.ru</a></b>.
            </p>
            <p>
                Настоящим Пользователь Сайта подтверждает, что ознакомлен с правами и обязанностями субъекта
                персональных данных, предоставленными ему в соответствии с Федеральным законом от 27.07.2006 N 152-ФЗ «О
                персональных данных», а также с&nbsp;Политикой организации в отношении обработки персональных данных.
            </p>
            <br/>

        </div>
    </Container>
)
}

export default Opd