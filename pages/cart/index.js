import React, {useEffect, useState} from 'react'
import Link from 'next/link'
import {useDispatch, useSelector} from 'react-redux'
import {Row, Col, ListGroup, Image, Form, Button, Card, ListGroupItem, Container} from 'react-bootstrap'
import Message from '../../components/Message'
import {addToCart, removeFromCart} from '@/redux/actions/cartActions'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from '@fortawesome/fontawesome-svg-core/import.macro';
import {useRouter} from "next/router";
import {useSearchParams} from "next/navigation";


function Index() {
    const [sizeChange, setSizeChange] = useState('')

    const router = useRouter()
    const productId = router.query
    console.log(productId)
    const [amount, setAmount] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)
    const query = useSearchParams();
    // const query = new URLSearchParams(location.search)
    const [qty, setQty] = useState(Number(query.get('qty')))
    const userLogin = useSelector(state => state.userLogin)
    const {loading, userInfo, error} = userLogin
    // const qty = parseInt()
    const [color, setColor] = useState(query.get('color'))
    const [size, setSize] = useState(query.get('size'))


    // const qty = location.search ? location.search.indexOf('&') !== -1 ? Number(location.search.split('&')[0].split('=')[1]) : Number(location.search.split('=')[1]) : 1
    // const color = location.search.indexOf('color') !== -1 ? decodeURI(location.search.split('color')[1].split('=')[1]) :''
    // const size = location.search.indexOf('size') !== -1 ? decodeURI(location.search.split('size')[1].split('=')[1]) :''
    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const {cartItems} = cart
    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty, color, size, 'undefined', 0.1))
            router.push('/cart')
        }
    }, [dispatch, productId, qty, size, color])
    // useEffect(() => {
    //     // shippmentCostCalculation();
    //     // if (query.get('color')) {setColor(}
    //     // if (query.get('size')) {setSize()}
    //
    //
    //     // setAmount(cartItems.reduce((acc, item) => acc + Number(item.qty), 0))
    //     // setTotalPrice(cartItems.reduce((acc, item) => acc + Number(item.qty) * item.price, 0).toFixed(0))
    // }, [dispatch, productId, qty, size, color, router, amount, totalPrice])

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => {
        if (userInfo) {
            // router.push('/login?redirect=shipping')
            router.push('/shipping')
        } else {
            router.push('/inputpd')
        }
    }

    return (
        <Container>
            <Row className='w-100'>
                <Col xs={12} sm={12} md={8}>
                    <Link href="/" className="btn btn-light my-3">
                        Назад
                    </Link>
                    <h1> Корзина</h1>
                    {
                        cartItems &&
                        cartItems.length === 0 ? (
                            <Message variant='info'>
                                Корзина пуста <Link href='/'>Назад</Link>
                            </Message>
                        ) : (
                            <ListGroup variant='flush'>
                                {cartItems && cartItems.map((item, ind) => (

                                    <ListGroupItem key={ind}>
                                        <Row>
                                            <Col md={2} className='text-center'>
                                                <Image src={item.image} alt={item.name} fluid rounded/>
                                            </Col>
                                            <Col md={3}>
                                                <Link href={`/products/${item.product}`}>{item.name}</Link>
                                            </Col>
                                            <Col md={2}>
                                                ₽ {item.price}
                                            </Col>
                                            <Col md={4}>
                                                <Form.Control
                                                    as='select'
                                                    // as="select"
                                                    value={Number(item.qty)}
                                                    onChange={(e) => {
                                                        // setQty(Number(e.target.value))
                                                        dispatch(addToCart(item.product, Number(e.target.value), item.color, item.size, ind))

                                                    }
                                                    }
                                                >
                                                    {

                                                        [...Array(item.countInStock).keys()].map((x) => (
                                                            <option key={x + 1} value={x + 1}>
                                                                {x + 1}
                                                            </option>
                                                        ))
                                                    }

                                                </Form.Control>
                                                {(item.color && item.color !== 'цвет не указан') &&
                                                    <Form.Control
                                                        as="select"
                                                        value={item.color + (item.size ? (' / ') : ('')) + item.size}
                                                        disabled={Object.keys(item.colors).length === 1 && item.colors[0][Object.keys(item.colors[0])][0].length === 1}
                                                        onChange={(e) => {
                                                            // setColor(e.target.value.split(' / ')[0])
                                                            // setSize(e.target.value.split(' / ')[1])
                                                            dispatch(addToCart(item.product, item.qty, e.target.value.split(' / ')[0], e.target.value.split(' / ')[1], ind))

                                                        }}
                                                    >
                                                        {
                                                            item.colors.map(item =>
                                                                // item.countInStock > 0 &&
                                                                item[Object.keys(item)[0]].map(size =>

                                                                    <option key={Object.keys(item)[0] + size}
                                                                            value={Object.keys(item)[0] + (size ? (' / ') : ('')) + size}>
                                                                        {Object.keys(item)[0] + (size ? (' / ') : ('')) + size}
                                                                    </option>
                                                                )
                                                            )
                                                        }
                                                    </Form.Control>


                                                }
                                            </Col>

                                            <Col md={1}>
                                                <Button
                                                    type='button'
                                                    variant='light'
                                                    onClick={() => removeFromCartHandler(ind)}
                                                >
                                                    <FontAwesomeIcon icon={solid('trash')}/>
                                                </Button>
                                            </Col>
                                        </Row>

                                    </ListGroupItem>
                                ))}
                            </ListGroup>
                        )
                    }
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroupItem>
                                {cartItems && <>
                                    <h6>Общее кол-во
                                        ({cartItems.reduce((acc, item) => acc + Number(item.qty), 0)}) </h6>
                                    ₽ {cartItems.reduce((acc, item) => acc + Number(item.qty) * item.price, 0).toFixed(0)}
                                </>
                                }
                            </ListGroupItem>
                        </ListGroup>
                        { cartItems &&
                            <ListGroupItem>
                            <Button
                                type='button'
                                className='w-100'
                                disabled={cartItems.length === 0}
                                onClick={checkoutHandler}
                            >
                                Заказать
                            </Button>
                        </ListGroupItem>}
                    </Card>
                </Col>

            </Row>
        </Container>
    )
}

export default Index