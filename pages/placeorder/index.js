import React, {useEffect, useState} from "react";
import {
    Button,
    Row,
    Col,
    ListGroup,
    Image,
    Card,
    ListGroupItem, Form, Container,
} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import Message from "@/components/Message";
import CheckoutSteps from "@/components/CheckoutSteps";
import {createOrder, p5sCreateOrder} from "@/redux/actions/orderActions";
import {ORDER_CREATE_RESET} from "@/redux/typesOrders";
import Link from "next/link";
import {useRouter} from "next/router";

function PlaceOrderScreen() {
    const history = useRouter()
    const orderCreate = useSelector((state) => state.orderCreate);
    const {order, error, success} = orderCreate;
    const dispatch = useDispatch();
    const [comments, setComments] = useState('')
    const cart = useSelector((state) => state.cart);
    cart.itemsPrice = cart.cartItems
        .reduce((acc, item) => acc + item.price * item.qty, 0)
        .toFixed(0);
    let disc = 0
    if (cart.paymentMethod === 'bankCard') {
        disc = cart.cartItems
            .reduce((acc, item) => acc + item.price * item.qty, 0)
            .toFixed(0) - cart.cartItems
            .reduce((acc, item) => acc + item.discountPrice * item.qty, 0)
            .toFixed(0);
    }
    cart.totalPrice = Number(cart.itemsPrice).toFixed(0) - disc


    if (!cart.paymentMethod) {
        history.push("/payment").then(r => {});
    }
    useEffect(() => {
        // shippmentCostCalculation()
        if (success) {
            history.push(`/order/${order._id}`).then(r => {});
            dispatch({type: ORDER_CREATE_RESET});
        }
        window.scrollTo(0, 0)
    }, [success, history, cart.shippingPrice]);

    const placeOrder = () => {
        dispatch(
            createOrder({
                orderItems: cart.cartItems,
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,
                itemsPrice: cart.itemsPrice,
                shippingPrice: cart.shippingPrice,
                taxPrice: cart.taxPrice,
                totalPrice: cart.totalPrice,

                size: cart.size,
                comments: comments
            })
        );
    };

    return (
        <Container>
            <CheckoutSteps step1 step2 step3 step4/>

            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroupItem>
                            <h2>Доставка</h2>
                            <p>
                                {/* <strong>Доставка: </strong> */}
                                {cart.shippingAddress.postalcode}, {cart.shippingAddress.country}
                                {"  "}
                                {cart.shippingAddress.address}
                            </p>
                        </ListGroupItem>
                        <ListGroupItem>
                            <h2>Способ оплаты</h2>
                            <p>
                                {/* <strong>Способ оплаты: </strong> */}
                                {cart.paymentMethod === 'bankCard' ? 'Банковской картой онлайн'
                                    : cart.paymentMethod === 'deliveyCard' ? 'Банковской картой при получении' : 'Наличными при получении'}
                            </p>
                        </ListGroupItem>
                        <ListGroupItem>
                            <h2>Заказанный товар:</h2>
                            {cart.cartItems.length === 0 ? (
                                <Message variant="info">Ваша корзина пуста !</Message>
                            ) : (
                                <ListGroup variant="flush">
                                    {cart.cartItems.map((item, index) => (
                                        <ListGroupItem key={index}>
                                            <Row>
                                                <Col md={1} className='text-center'>
                                                    <Image
                                                        src={item.image}
                                                        alt={item.name}
                                                        fluid
                                                        rounded
                                                    />
                                                </Col>
                                                <Col>
                                                    <Link href={`/products/${item.product}`}>
                                                        {item.name}
                                                    </Link>
                                                </Col>
                                                <Col md={4} className='text-end'>
                                                    {/*<Row>*/}
                                                        {item.qty} x {item.price} ₽ ={" "}

                                                        <strong>
                                                            ₽ {(item.qty * item.price).toFixed(2)}
                                                        </strong>
                                                    {/*</Row>*/}
                                                    <Row className='text-end'>
                                                        {
                                                            (item.color && item.color !== 'цвет не указан') &&
                                                            <strong>Цвет: {item.color} </strong>
                                                        }
                                                        {item.size &&
                                                            <strong>Размер: {item.size} </strong>
                                                        }

                                                    </Row>
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
                                    <Col>₽ {cart.itemsPrice}</Col>
                                </Row>
                            </ListGroupItem>
                            {cart.paymentMethod === 'bankCard' &&
                                <ListGroupItem>
                                    <Row>
                                        <Col>Скидка:</Col>
                                        <Col>₽ {disc}</Col>
                                    </Row>
                                </ListGroupItem>
                            }
                            <ListGroupItem>
                                <Row>
                                    <Col>Всего:</Col>
                                    <Col>₽ {cart.totalPrice}</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                {error && <Message variant="danger">{error}</Message>}
                                <Form.Group controlId='Comments'>
                                    <Form.Label>Комментарии к заказу</Form.Label>
                                    <Form.Control
                                        onChange={(e) => setComments(e.target.value)}
                                        type="text-area"
                                    ></Form.Control>
                                </Form.Group>
                            </ListGroupItem>

                            <ListGroupItem>
                                <Button
                                    type="button"
                                    className="w-100"
                                    disabled={cart.cartItems === 0}
                                    onClick={placeOrder}
                                >
                                    Разместить заказ
                                </Button>
                            </ListGroupItem>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default PlaceOrderScreen;
