import React, {useState, useEffect} from "react";
import {
    Row,
    Col,
    ListGroup,
    Image,
    Card,
    ListGroupItem,
    Button,
    Form,
} from "react-bootstrap";
import Link from 'next/link'
import Head from 'next/head'
import {useDispatch, useSelector, getState} from "react-redux";
import Message from "@/components/Message";
import Loader from "@/components/Loader";
import {
    getOrderDetails,
    payOrder,
    deliverOrder,
    p5sCreateOrder,
    payOrderRequest,
    payOrderDetails,
    p5sgetOrderDetails,
} from "@/redux/actions/orderActions";
import {
    ORDER_PAY_RESET,
    ORDER_DELIVER_RESET,
} from "@/redux/typesOrders";
import {useRouter} from "next/router";
import Script from "next/script";

const getServerSideProps = (context) => {
    const id = context.params.id
    return {props: {id}}
}

function OrderScreen({pageProps}) {
    const history = useRouter()
    const orderId = pageProps.id;
    const dispatch = useDispatch();

    const [sdkReady, setSdkReady] = useState(false);
    const orderDetails = useSelector((state) => state.orderDetails);
    const {order, error, loading} = orderDetails;
    const paymentRequest = useSelector((state) => state.paymentRequest);
    const {
        response,
        error: paymentError,
        loading: paymentLoading,
        success: paymentSuccess,
    } = paymentRequest;
    const orderPay = useSelector((state) => state.orderPay);
    const {loading: loadingPay, success: successPay} = orderPay;

    const orderDeliver = useSelector((state) => state.orderDeliver);
    const {loading: loadingDeliver, success: successDeliver} = orderDeliver;

    const p5sDetails = useSelector((state) => state.p5sDetails);
    const {
        p5sOrder,
        loading: p5sDetailsLoading,
        error: p5sDetailsError,
    } = p5sDetails;

    const userLogin = useSelector((state) => state.userLogin);
    const {userInfo} = userLogin;

    const userDetails = useSelector((state) => state.userDetails);
    const [cururl, setCururl] = useState("");

    if (!loading && !error) {
        order.itemsPrice = order.orderItems
            .reduce((acc, item) => acc + item.price * item.qty, 0)
            .toFixed(0);
    }

    // function yookassaaddScript() {
    //     const script = document.createElement("script");
    //     script.src =
    //         "https://yookassa.ru/checkout-widget/v1/checkout-widget.js";
    //     script.async = true; // чтобы гарантировать порядок
    //     document.body.appendChild(script);
    // }
    //
    // yookassaaddScript();
    //
    // //

    useEffect(() => {
        if (!userInfo) {
            history.push("/login");
        }
        if (
            !order ||
            successPay ||
            order._id !== Number(orderId) ||
            successDeliver
        ) {
            dispatch({type: ORDER_PAY_RESET});
            dispatch({type: ORDER_DELIVER_RESET});
            dispatch(getOrderDetails(orderId));
            dispatch(p5sgetOrderDetails(orderId));
        }

        if (!loading && p5sDetailsError) {
            if (
                order.paymentMethod === "cash" ||
                order.paymentMethod === "deliveryCard"
            ) {
                dispatch(
                    p5sCreateOrder({
                        orderItems: order.orderItems,
                        shippingAddress: order.shippingAddress,
                        paymentMethod: order.paymentMethod,
                        itemsPrice: order.itemsPrice,
                        shippingPrice: order.shippingPrice,
                        taxPrice: order.taxPrice,
                        totalPrice: order.totalPrice,
                        size: order.size,
                        orderID: Number(orderId),
                        comments: order.comments,
                    })
                );
            }
        }
        if (!loading && p5sDetailsError) {
            if (order.paymentMethod === "bankCard" && order.isPaid) {
                dispatch(
                    p5sCreateOrder({
                        orderItems: order.orderItems,
                        shippingAddress: order.shippingAddress,
                        paymentMethod: order.paymentMethod,
                        itemsPrice: order.itemsPrice,
                        shippingPrice: order.shippingPrice,
                        taxPrice: order.taxPrice,
                        totalPrice: order.totalPrice,
                        size: order.size,
                        orderID: Number(orderId),
                        comments: order.comments,
                    })
                )
            }
        }
        if (!loading && order.paymentMethod === "bankCard" && sdkReady) {
            const confirmation_token = response.confirmation_url;
            const checkout = new window.YooMoneyCheckoutWidget({
                confirmation_token: confirmation_token, //Токен, который перед проведением оплаты нужно получить от ЮKassa
                return_url: "http://lltoys.ru/" + cururl, //Ссылка на страницу завершения оплаты

                //Настройка виджета
                customization: {
                    //Настройка способа отображения
                    modal: true,
                },
                error_callback: function (error) {
                    setSdkReady(false);
                },
            });
            checkout.render().then(() => {
                setSdkReady(false);
            });
        }

        if (!loading && order && order.paymentMethod == "bankCard") {
            dispatch(payOrderDetails(order, userInfo));
        }
        setCururl(history.pathname);

        // eslint-disable-next-line
    }, [
        dispatch,
        order,
        orderId,
        successPay,
        successDeliver,
        p5sDetailsError,
        sdkReady,
    ]);

    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(orderId, paymentResult));
    };

    const deliverHandler = () => {
        dispatch(deliverOrder(order));
    };

    const paymentInitialization = () => {
        dispatch(
            payOrderRequest(order, userInfo, "http://lltoys.ru/" + cururl, () =>
                setSdkReady(true)
            )
        );
    };

    return loading ? (
        <Loader/>
    ) : error ? (
        <Message variant="danger">{error}</Message>
    ) : (
        <>
            {/*<Head>*/}
                <Script src = "https://yookassa.ru/checkout-widget/v1/checkout-widget.js"/>
            {/*</Head>*/}
            <div>
                <h1>Заказ: {order._id}</h1>
                <Row>
                    <Col md={8}>
                        <ListGroup variant="flush">
                            <ListGroupItem>
                                <h2>Доставка</h2>
                                <p>
                                    <strong>Имя: </strong>
                                    {order.user.name}
                                </p>
                                <p>
                                    <strong>E-mail: </strong>
                                    <a href={`mailto:${order.user.email}`}>
                                        {order.user.email}
                                    </a>
                                </p>
                                <p>
                                    <strong>Адрес: </strong>
                                    {order.shippingAddress.postalcode},{" "}
                                    {order.shippingAddress.country}
                                    {"  "}
                                    {order.shippingAddress.city},{"  "}
                                    {order.shippingAddress.address}
                                </p>
                                {order.isDelivered && (
                                    <Message variant="success">
                                        Заказ доставлен {order.deliveredAt}
                                    </Message>
                                )}

                                {p5sOrder && p5sOrder.status && (
                                    <Message variant="warning">
                                        Статус: {p5sOrder.status}
                                    </Message>
                                )}
                                {order.paymentMethod === 'bankCard' && !order.isPaid &&
                                    <Message variant="warning">
                                        Статус: Заказ будет обработан после произведения оплаты
                                    </Message>
                                }
                            </ListGroupItem>
                            <ListGroupItem>
                                <h2>Способ оплаты</h2>
                                <p>
                                    {/* <strong>Способ оплаты: </strong> */}
                                    {order.paymentMethod === "bankCard"
                                        ? "Банковсковской картой онлайн"
                                        : order.paymentMethod === "deliveryCard"
                                            ? "Банковской картой при получении"
                                            : "Наличными при получении"}
                                </p>
                                {order.isPaid ? (
                                    <Message variant="success">
                                        Оплата прошла{" "}
                                        {order.paidAt.substring(0, 10)}
                                    </Message>
                                ) : (
                                    <Message variant="warning">Не оплачен</Message>
                                )}
                            </ListGroupItem>
                            <ListGroupItem>
                                <h2>Заказанный товар:</h2>
                                {order.orderItems.length === 0 ? (
                                    <Message variant="info">
                                        Ваш заказ пуста !
                                    </Message>
                                ) : (
                                    <ListGroup variant="flush">
                                        {order.orderItems.map((item, index) => (
                                            <ListGroupItem key={index}>
                                                <Row>
                                                    <Col md={1}>
                                                        <Image
                                                            src={item.image}
                                                            alt={item.name}
                                                            fluid
                                                            rounded
                                                        />
                                                    </Col>
                                                    <Col>
                                                        <Link
                                                            to={`/products/${item.product}`}
                                                        >
                                                            {item.name}
                                                        </Link>
                                                    </Col>
                                                    <Col
                                                        md={4}
                                                        className="text-end"
                                                    >
                                                        {item.qty} x {item.price} ₽
                                                        ={" "}
                                                        <strong>
                                                            ₽{" "}
                                                            {(
                                                                item.qty *
                                                                item.price
                                                            ).toFixed(2)}
                                                        </strong>
                                                        {(item.color !== "" && item.color !== 'цвет не указан') &&
                                                            <div>
                                                                <Row className="text-end">
                                                                    <strong>
                                                                        Цвет:{" "}
                                                                        {item.color}{" "}
                                                                    </strong>
                                                                </Row>
                                                                {item.size !== '' &&
                                                                    <Row className="text-end">
                                                                        <strong>
                                                                            Размер:{" "}
                                                                            {item.size}{" "}
                                                                        </strong>
                                                                    </Row>
                                                                }
                                                            </div>
                                                        }
                                                    </Col>
                                                </Row>
                                            </ListGroupItem>
                                        ))}
                                    </ListGroup>
                                )}
                            </ListGroupItem>
                        </ListGroup>
                    </Col>
                    <Col md={4}>
                        <Card>
                            <ListGroup variant="flush">
                                <ListGroupItem>
                                    <h2>Заказ</h2>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Row>
                                        <Col>Товар</Col>
                                        <Col>₽ {order.itemsPrice}</Col>
                                    </Row>
                                </ListGroupItem>
                                {/*{order.paymentMethod === 'bankCard' &&*/}
                                {/*    <ListGroupItem>*/}
                                {/*        <Row>*/}
                                {/*            <Col>Скидка 10%</Col>*/}
                                {/*            <Col>₽ {(order.itemsPrice * 0.1).toFixed(0)}</Col>*/}
                                {/*        </Row>*/}
                                {/*    </ListGroupItem>*/}
                                {/*}*/}
                                <ListGroupItem>
                                    <Row>
                                        <Col>Всего:</Col>
                                        <Col>₽ {Number(order.totalPrice).toFixed(0)}</Col>
                                    </Row>
                                </ListGroupItem>

                                {!order.isPaid &&
                                    order.paymentMethod === "bankCard" && (
                                        <>
                                            <ListGroupItem>
                                                {paymentLoading && <Loader/>}
                                                <ListGroupItem>
                                                    <Button
                                                        type="button"
                                                        className="btn w-100"
                                                        onClick={
                                                            paymentInitialization
                                                        }
                                                    >
                                                        Оплатить
                                                    </Button>
                                                </ListGroupItem>
                                            </ListGroupItem>
                                        </>
                                    )}
                            </ListGroup>
                            {loadingDeliver && <Loader/>}
                            {userInfo &&
                                userInfo.isAdmin &&
                                order.isPaid &&
                                !order.isDelivered && (
                                    <ListGroupItem>
                                        <Button
                                            type="button"
                                            className="btn w-100"
                                            onClick={deliverHandler}
                                        >
                                            Пометить как доставлен
                                        </Button>
                                    </ListGroupItem>
                                )}

                            {/*<ListGroupItem>*/}
                            {/*    <Button*/}
                            {/*        type="button"*/}
                            {/*        className="btn"*/}
                            {/*        onClick={testp5s}*/}
                            {/*    >*/}
                            {/*        Тест p5s*/}
                            {/*    </Button>*/}
                            {/*</ListGroupItem>*/}
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    );
}

export default OrderScreen;
