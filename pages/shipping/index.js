import React, {useState, useEffect, useCallback} from "react";
import {AddressSuggestions} from "react-dadata";
// import {Map, Placemark, YMaps} from "react-yandex-map";

import "react-dadata/dist/react-dadata.css";
import {
    Form,
    Button,
    Row,
    Col,
    Container,
    FormGroup,
    FormLabel,
    FormCheck, ListGroup, ListGroupItem, Badge, Card,
} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import CheckoutSteps from "@/components/CheckoutSteps";
import {savePaymentMethod, saveShippingAddress, saveShippingCost} from "@/redux/actions/cartActions";
import {useRouter} from "next/router";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import {DADATA_TOKEN} from "@/consts";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import cards from '@/public/cards.webp'
import cash from '@/public/payment_cash.webp'
import deliveryCard from '@/public/deliveryCard.webp'
import {faRub} from "@fortawesome/free-solid-svg-icons/faRub";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {createOrder, payOrderRequest} from "@/redux/actions/orderActions";
import {ORDER_CREATE_RESET} from "@/redux/typesOrders";
import {Map, Placemark, YMaps} from "react-yandex-map";

function ShippingScreen() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true)
    const paymentRequest = useSelector((state) => state.paymentRequest);
    const userLogin = useSelector((state) => state.userLogin);
    const {userInfo} = userLogin;

    const {
        response,
        error: paymentError,
        loading: paymentLoading,
        success: paymentSuccess,
    } = paymentRequest;
    const history = useRouter()
    // const TOKEN = "c626ed218daca90f04edd627891ee1c035e86387";
    const cart = useSelector((state) => state.cart);
    const {shippingAddress} = cart;

    const dispatch = useDispatch();

    const [address, setAddress] = useState(shippingAddress.daAddress);
    const [postalcode, setPostalcode] = useState(shippingAddress.postalcode);
    const [country, setCountry] = useState('Россия');
    const [shippmentMethod, setShippmentMethod] = useState('pochtaRf');
    const [comments, setComments] = useState('')
    const {order} = useSelector(state => state.orderCreate)
    useEffect(() => {
        router.isReady ? setIsLoading(false) : ''
        dispatch({type: ORDER_CREATE_RESET});
        setSdkReady(false)
        setSubmitted(false)
    }, [])

    const {cartItems} = cart
    const [cururl, setCururl] = useState("");
    const [sdkReady, setSdkReady] = useState(false);

    function yookassaaddScript() {
        const script = document.createElement("script");
        script.src =
            "https://yookassa.ru/checkout-widget/v1/checkout-widget.js";
        script.async = true; // чтобы гарантировать порядок
        document.body.appendChild(script);
    }

    useEffect(() => {
        yookassaaddScript();
        if (cartItems.length === 0) {
            history.push('/cart')
        }
    }, [])
    let shipingAddress = {}
    const [paySubmitted, setPaySubmitted] = useState(false)
    const [submitted, setSubmitted] = useState('false')
    const submitPaymentHandler = () => {
        submit()
        setPaySubmitted(true)
    }


    const submitHandler = async () => {
        await submit()
        setSubmitted(true)
    }
    const submit = async () => {
        await dispatch(
            saveShippingAddress({
                city: address.value.split(',')[0],
                address: address.value,
                daAddress: address,
                postalcode,
                country,
                shippmentMethod,
            })
        );
        shipingAddress = {
            city: address.value.split(',')[0],
            address: address.value,
            daAddress: address,
            postalcode,
            country,
            shippmentMethod,
        }

        await dispatch(savePaymentMethod(paymentMethod));
        await dispatch(
            createOrder({
                orderItems: cart.cartItems,
                shippingAddress: shipingAddress,
                paymentMethod: paymentMethod,
                itemsPrice: finalPrice,
                shippingPrice: cart.shippingPrice,
                // taxPrice: cart.taxPrice,
                totalPrice: finalPrice,

                // size: cart.size,
                comments: comments
            })
        );
    };
    useEffect(() => {
        if (typeof address === "object") {
            setPostalcode(address.data.postal_code)
        }
        setCururl(history.asPath);
        if (paySubmitted && order && userInfo) {
            dispatch(
                payOrderRequest(order, userInfo, "http://lltoys.ru/" + cururl, () =>
                    setSdkReady(true)
                )
            );

        }
        if (!paymentLoading && order && order.paymentMethod === "bankCard" && sdkReady) {
            const confirmation_token = response.confirmation_url;
            const payMethod = response.paymentMethod === 'sbp' ? 'sbp' : ''
            const checkout = new window.YooMoneyCheckoutWidget({
                confirmation_token: confirmation_token, //Токен, который перед проведением оплаты нужно получить от ЮKassa
                return_url: "http://lltoys.ru" + cururl, //Ссылка на страницу завершения оплаты

                //Настройка виджета
                customization: {
                    //Настройка способа отображения
                    // payment_method: ['bank_card', 'yoo_money', 'sberbank', 'sbp'],
                    modal: true,
                },
                error_callback: function (error) {
                    console.log(error)
                    setSdkReady(false);
                },
            });
            //
            checkout.on('complete', () => {
                try {
                    history.push(`/order/${order._id}`)
                } catch {
                }

            })
            checkout.on('modal_close', () => {
                try {
                    history.push(`/order/${order._id}`)
                } catch {
                }

            })
            checkout.render().then(() => {
                setSdkReady(false);
            });
        }

    }, [dispatch, address, sdkReady, order])
    useEffect(() => {
        if (submitted && order) {
            history.push(`/order/${order._id}`)
        }
    }, [submitted])
    const [paymentMethod, setPaymentMethod] = useState('bankCard');
    const totalQty = (cartItems.reduce((acc, item) => acc + Number(item.qty), 0))
    const totalOldPrice = cartItems.reduce((acc, item) => acc + Number(item.qty) * ((Number(item.oldPrice) > Number(item.price)) ? Number(item.oldPrice) : Number(item.price)), 0).toFixed(0)
    const totalPrice = cartItems.reduce((acc, item) => acc + Number(item.qty) * item.price, 0).toFixed(0)
    const deliveryCost = (Number(totalPrice))>=3000 ? 0 :300

    const disc = cart.cartItems
        .reduce((acc, item) => acc + item.price * item.qty, 0)
        .toFixed(0) - cart.cartItems
        .reduce((acc, item) => acc + item.discountPrice * item.qty, 0)
        .toFixed(0);

    useEffect(() => {
        router.isReady ? setIsLoading(false) : ''
    }, [])
    const finalPrice = paymentMethod === 'bankCard' ? (Number(totalPrice)) + Number(deliveryCost) - disc : (Number(totalPrice)) + Number(deliveryCost);
    let width = '320px'

    return (

        <div className='fa-shipping-fast shipping'>
            {!isLoading &&
                <>
                    <Head>

                        <title>Куражи - Оформление заказа </title></Head>
                    <Container md="auto" className='w-100'>
                        <CheckoutSteps step1 step2/>
                        <Link href='/cart'>Вернуться в корзину</Link>
                        <h1 md="auto" className='fw-bolder'>
                            Оформление заказа
                        </h1>
                        <Row>
                            <Col ms={8}>
                                <span className='fw-bolder fs-5'>Способ оплаты <span
                                    className='text-danger'>*</span></span>

                                <ListGroup className='mt-3'>
                                    <ListGroupItem className='d-block'>
                                        <div className='d-flex'>
                                            <Image
                                                className={paymentMethod === 'bankCard' ? 'paymentBadge' : ''}
                                                src={cards}
                                                alt='Картой онлайн'
                                                width={100}
                                                onClick={() =>
                                                    setPaymentMethod('bankCard')
                                                }></Image>
                                            <Image
                                                className={paymentMethod === 'cash' ? 'paymentBadge mx-3' : 'mx-3'}
                                                src={cash}
                                                alt='Наличными при получении'
                                                width={160}
                                                height={100}
                                                onClick={() =>
                                                    setPaymentMethod('cash')
                                                }></Image>
                                            <Image
                                                className={paymentMethod === 'deliveryCard' ? 'paymentBadge mx-3' : 'mx-3'}
                                                src={deliveryCard}
                                                alt='Картой при получении'
                                                width={150}
                                                onClick={() =>
                                                    setPaymentMethod('deliveryCard')
                                                }></Image>

                                        </div>
                                        <div className={paymentMethod === 'bankCard' ? 'text-success pt-3' : 'pt-3'}
                                             style={{'backgroundColor': '#f2f5f9'}}>
                                            <FontAwesomeIcon
                                                icon={faRub}/> Получите скидку <strong>{disc}</strong> руб. при оплате
                                            Картой на сайте
                                        </div>
                                    </ListGroupItem>

                                </ListGroup>
                                <span className='fw-bolder fs-5 fw-bolder'>Доставка</span>

                                <ListGroup>
                                    <ListGroupItem className=''>
                                        <span className='fw-bolder fs-4'>Способ получения</span>
                                        <div className='d-flex fs-4 my-3'>
                                            <Badge bg='primary'
                                                // style={shippmentMethod === 'mskSelf' ? {'box-shadow': '6px 6px #989898, 12px 12px #6c6666'} : ''}
                                                   className={shippmentMethod === 'mskSelf' ? 'deliveryBadge ms-3' : ' ms-3'}
                                                   onClick={() => setShippmentMethod('mskSelf')}>
                                                Самовывоз
                                            </Badge>
                                            <Badge bg='primary'
                                                   className={shippmentMethod === 'pochtaRf' ? 'deliveryBadge ms-3' : ' ms-3'}
                                                   onClick={() => setShippmentMethod('pochtaRf')}>
                                                Почтой РФ
                                            </Badge>
                                            <Badge bg='primary'
                                                   className={shippmentMethod === 'sdek' ? 'deliveryBadge ms-3' : ' ms-3'}
                                                   onClick={() => setShippmentMethod('sdek')}>
                                                СДЭК
                                            </Badge>
                                            <Badge bg='primary'
                                                   className={shippmentMethod === 'mskCur' ? 'deliveryBadge ms-3' : ' ms-3'}
                                                   onClick={() => setShippmentMethod('mskCur')}>
                                                Курьером
                                            </Badge>
                                        </div>

                                        {shippmentMethod === 'mskSelf' &&
                                            <div>
                                                <h1 className='py-4'>Самовывоз из офиса г. Москва, м. Автозаводская</h1>
                                                <p>
                                                    Вы можете самостоятельно забрать свой заказ по адресу г.Москва, ул.
                                                    Автозаводская, дом 16, корпус 2, строение 8.
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
                                                            }}
                                                            modules={['control.ZoomControl', 'control.FullscreenControl']}
                                                        >
                                                            <Placemark defaultGeometry={[55.705944, 37.646597]}/>
                                                        </Map>

                                                    </div>
                                                </YMaps>
                                                <p>

                                                    После того, как заказ будет полностью укомплектован, ваш
                                                    персональный менеджер свяжется с вами по указанным вами координатам
                                                    и подтвердит готовность вашего заказа. После этого Вы можете забрать
                                                    свой заказ в любой удобный день согласно графику работы нашего
                                                    склада.
                                                </p>
                                                <p>
                                                    Укомплектованный заказ хранится в пункте выдачи заказов в течение
                                                    одной недели (7 календарных дней). Если получатель не забрал свой
                                                    заказ в течение этого времени, заказ возвращается обратно на склад и
                                                    расформировывается. Клиент уведомляется по электронной почте об
                                                    отказе от заказа в связи с его неполучением.
                                                </p>


                                            </div>
                                        }
                                        {['pochtaRf', 'sdek', 'mskCur'].includes(shippmentMethod) &&
                                            <Form>
                                                <FormLabel className="my-3 mb-3 d-flex justify-content-center">
                                                    <h4>Адрес доставки <span className='text-danger'>*</span></h4>
                                                </FormLabel>
                                                <Form.Group>
                                                    <Form.Label>Страна</Form.Label>
                                                    <Form.Control
                                                        disabled
                                                        readOnly
                                                        type="text"
                                                        placeholder="Введите страну"
                                                        value={country ? country : ""}
                                                    ></Form.Control>
                                                </Form.Group>
                                                <Form.Group>
                                                    <Form.Label>Город, улица .... <span className='text-danger'>*</span></Form.Label>
                                                    <AddressSuggestions

                                                        token={DADATA_TOKEN}
                                                        count={4}
                                                        autoload={true}
                                                        value={shippingAddress.daAddress}
                                                        onChange={setAddress}
                                                        filterFromBound="city"
                                                        filterToBound="flat"
                                                        filterLocations={[{country}]}
                                                    />

                                                </Form.Group>

                                                <Form.Group controlId="postalcode">
                                                    <Form.Label>Индекс<span
                                                        style={{'fontSize': '10px'}}> Заполняется автоматически</span></Form.Label>
                                                    <Form.Control
                                                        onChange={setPostalcode}
                                                        type="text"
                                                        disabled
                                                        value={postalcode ? postalcode : ""}
                                                    ></Form.Control>
                                                </Form.Group>
                                            </Form>
                                        }
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        <Form.Group controlId='Comments'>
                                            <Form.Label>Комментарии к заказу</Form.Label>
                                            <Form.Control
                                                onChange={(e) => setComments(e.target.value)}
                                                type="text-area"
                                            ></Form.Control>
                                        </Form.Group>
                                    </ListGroupItem>
                                </ListGroup>
                            </Col>
                            <Col md={4}>
                                {(!isLoading && cart) &&
                                    <Card>
                                        {cartItems &&
                                            <ListGroupItem>
                                                {paymentMethod !== 'bankCard' &&
                                                    <Button
                                                        type='button'
                                                        variant='success'
                                                        className='w-100 mb-3'
                                                        disabled={cartItems.length === 0 || !shippmentMethod || !paymentMethod || (['pochtaRf', 'sdek', 'mskCur'].includes(shippmentMethod) && !address)}
                                                        onClick={submitHandler}
                                                    >
                                                        Заказать
                                                    </Button>}
                                                {paymentMethod === 'bankCard' &&
                                                    <Button
                                                        type='button'
                                                        variant='success'
                                                        className='w-100 mb-3'
                                                        disabled={cartItems.length === 0 || !shippmentMethod || !paymentMethod || (['pochtaRf', 'sdek', 'mskCur'].includes(shippmentMethod) && !address)}
                                                        onClick={submitPaymentHandler}
                                                    >
                                                        Оплатить
                                                    </Button>}
                                                {/*<p style={{'color': '#808d9a', 'fontSize': '14px'}}>Доступные способы и*/}
                                                {/*    время*/}
                                                {/*    доставки можно выбрать при*/}
                                                {/*    оформлении заказа</p>*/}
                                            </ListGroupItem>}

                                        <ListGroup variant='flush'>
                                            <ListGroupItem>
                                                <div className='d-flex justify-content-between'>
                                                    <span className='fw-bold fs-4'>Ваша корзина</span>
                                                    <span style={{
                                                        'color': '#808d9a',
                                                        'fontSize': '14px'
                                                    }}>{cartItems.reduce((acc, item) => acc + Number(item.qty), 0)}
                                                        {[11, 12, 13, 14].includes(totalQty % 100) ? ' товаров' : totalQty % 10 === 1 ? ' товар' : [2, 3, 4].includes(totalQty % 10) ? ' товара' : ' товаров'}
                                        </span>
                                                </div>
                                                <div className='d-flex justify-content-between'>
                                                    <span className='fs-6'>Товары ({totalQty})</span>
                                                    <span style={{
                                                        // 'color': '#808d9a',
                                                        'fontWeight': '700'
                                                    }}>
                                            {cartItems.reduce((acc, item) => acc + Number(item.qty) * ((Number(item.oldPrice) > Number(item.price)) ? Number(item.oldPrice) : Number(item.price)), 0).toFixed(0)}
                                        </span>
                                                </div>
                                                {Number(totalOldPrice) > Number(totalPrice) &&
                                                    <div className='d-flex justify-content-between'>
                                                        <span className='fs-6'>Скидка на товары</span>
                                                        <span style={{
                                                            'color': '#f91155',
                                                            'fontWeight': '700'
                                                        }}>
                                                            {(totalOldPrice - totalPrice).toFixed(0)}
                                                        </span>
                                                    </div>}
                                                {paymentMethod === 'bankCard' &&
                                                    <div className='d-flex justify-content-between'>
                                                        <span className='fs-6'>Скидка при оплате картой</span>
                                                        <span style={{
                                                            'color': '#f91155',
                                                            'fontWeight': '700'
                                                        }}>
                                                            {disc}
                                                        </span>
                                                    </div>}
                                                <div className='d-flex justify-content-between'>
                                                    <span className='fs-6'>Доставка</span>
                                                        <span style={{
                                                            // 'color': '#808d9a',
                                                            'fontWeight': '700'
                                                        }}>
                                                            {deliveryCost}
                                                        </span>
                                                </div>


                                            </ListGroupItem>
                                            <ListGroupItem>
                                                <div className='d-flex justify-content-between'>
                                                    <span className='fw-bold fs-4'>Общая стоимость</span>
                                                    <span style={{
                                                        // 'color': '#808d9a',
                                                        'fontWeight': '700'
                                                    }}>{finalPrice}
                                        </span>
                                                </div>
                                                {paymentMethod !== 'bankCard' &&
                                                    <div className='d-flex justify-content-between'>
                                                        <span className='fs-6'>При оплате картой на сайте</span>
                                                        <span style={{
                                                            'color': '#10C44C',
                                                            'fontWeight': '700'
                                                        }}>
                                            {finalPrice - disc}
                                                    </span>
                                                    </div>}

                                            </ListGroupItem>
                                            {/*<ListGroupItem>*/}
                                            {/*    {cartItems && <>*/}
                                            {/*        <h6>Общее кол-во*/}
                                            {/*            ({cartItems.reduce((acc, item) => acc + Number(item.qty), 0)}) </h6>*/}
                                            {/*        ₽ {cartItems.reduce((acc, item) => acc + Number(item.qty) * item.price, 0).toFixed(0)}*/}
                                            {/*    </>*/}
                                            {/*    }*/}
                                            {/*</ListGroupItem>*/}
                                        </ListGroup>

                                    </Card>
                                }
                            </Col>
                        </Row>
                        {/*<Form onSubmit={submitHandler} className="text-center">*/}
                        {/*    <Row className='w-100'>*/}
                        {/*        <Col className="text-end ">*/}
                        {/*            <FormGroup>*/}
                        {/*                <FormLabel className="my-3 mb-5 d-flex justify-content-center">*/}
                        {/*                    <h4>Способ доставки</h4>*/}
                        {/*                </FormLabel>*/}
                        {/*                /!*<Row>*!/*/}
                        {/*                <FormCheck*/}
                        {/*                    className="mb-1 mx-3 d-flex float-start"*/}
                        {/*                    defaultChecked={shippingAddress.shippmentMethod === 'mskCur'}*/}
                        {/*                    // as='button'*/}
                        {/*                    type="radio"*/}
                        {/*                    label="По Москве - курьером"*/}
                        {/*                    id="mskCur"*/}
                        {/*                    name="shipmentMethod"*/}
                        {/*                    onChange={(e) =>*/}
                        {/*                        setShippmentMethod(e.target.id)*/}
                        {/*                    }*/}
                        {/*                ></FormCheck>*/}
                        {/*                /!*</Row>*!/*/}
                        {/*                /!*<Row className="justify-content-right">*!/*/}
                        {/*                <FormCheck*/}
                        {/*                    className="my-3 mb-1 mx-3 d-flex justify-content-center"*/}
                        {/*                    defaultChecked={shippingAddress.shippmentMethod === 'mskSelf'}*/}
                        {/*                    type="radio"*/}
                        {/*                    label="По Москве - самовывоз"*/}
                        {/*                    id="mskSelf"*/}
                        {/*                    name="shipmentMethod"*/}
                        {/*                    onChange={(e) =>*/}
                        {/*                        setShippmentMethod(e.target.id)*/}
                        {/*                    }*/}
                        {/*                ></FormCheck>*/}
                        {/*                /!*</Row>*!/*/}
                        {/*                /!*<Row className="justify-content-right">*!/*/}
                        {/*                <FormCheck*/}
                        {/*                    className="my-3 mb-1 mx-3 d-flex float-start"*/}
                        {/*                    type="radio"*/}
                        {/*                    defaultChecked={shippingAddress.shippmentMethod === 'pochtaRf'}*/}
                        {/*                    label="Почта России"*/}
                        {/*                    id="pochtaRf"*/}
                        {/*                    name="shipmentMethod"*/}
                        {/*                    onChange={(e) =>*/}
                        {/*                        setShippmentMethod(e.target.id)*/}
                        {/*                    }*/}
                        {/*                ></FormCheck>*/}
                        {/*                /!*</Row>*!/*/}
                        {/*                /!*<Row className="justify-content-right">*!/*/}
                        {/*                <FormCheck*/}
                        {/*                    className="my-3 mb-1 mx-3 d-flex justify-content-center"*/}
                        {/*                    defaultChecked={shippingAddress.shippmentMethod === 'sdek'}*/}
                        {/*                    type="radio"*/}
                        {/*                    label="СДЭК - по России"*/}
                        {/*                    id="sdek"*/}
                        {/*                    name="shipmentMethod"*/}
                        {/*                    onChange={(e) =>*/}
                        {/*                        setShippmentMethod(e.target.id)*/}
                        {/*                    }*/}
                        {/*                ></FormCheck>*/}
                        {/*                /!*</Row>*!/*/}
                        {/*            </FormGroup>*/}
                        {/*        </Col>*/}
                        {/*    </Row>*/}
                        {/*    <Button type="submit" variant="primary" className="text-center">*/}
                        {/*        Продолжить*/}
                        {/*    </Button>*/}
                        {/*</Form>*/}
                    </Container>
                </>}
        </div>

    )
        ;
}

export default ShippingScreen;
