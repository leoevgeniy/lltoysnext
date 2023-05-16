import React, {useEffect, useState} from 'react'
import Link from 'next/link'
import {useDispatch, useSelector} from 'react-redux'
import {Row, Col, ListGroup, Image, Form, Button, Card, ListGroupItem, Container, Badge} from 'react-bootstrap'
import Message from '../../components/Message'
import {addToCart, removeFromCart} from '@/redux/actions/cartActions'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useRouter} from "next/router";
import {useSearchParams} from "next/navigation";
import {faCreditCard, faTrashCan} from "@fortawesome/free-solid-svg-icons";
import {forEach} from "react-bootstrap/ElementChildren";
import SeenProductCarousel from "@/components/SeenProductCarousel";
import ProductCarousel from "@/components/ProductCarousel";
import {wrapper} from "@/redux/store";
import axios from "axios";
import {API_HOST} from "@/consts";

function Index({pageProps}) {

    const router = useRouter()
    const userLogin = useSelector(state => state.userLogin)
    const {loading, userInfo, error} = userLogin
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const {cartItems} = cart
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        router.isReady ? setIsLoading(false) : ''

    }, [router.isReady])

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => {
        if (userInfo) {
            // router.push('/login?redirect=shipping')
            router.push('/shipping')
        } else {
            router.push('/login?redirect=shipping')
        }
    }

    const desabledSizes = (item) => item.colors.map(color => {
        if (Object.keys(color)[0] === item.color) {
            if (color[item.color].length === 1) {
                return true
            }
        }
    })
    const totalQty = (cartItems.reduce((acc, item) => acc + Number(item.qty), 0))
    const totalOldPrice = cartItems.reduce((acc, item) => acc + Number(item.qty) * ((Number(item.oldPrice) > Number(item.price)) ? Number(item.oldPrice) : Number(item.price)), 0).toFixed(0)
    const totalPrice = cartItems.reduce((acc, item) => acc + Number(item.qty) * Number(item.price), 0).toFixed(0)
    let deliveryCost = 0
    if (cartItems.length === 0 || (Number(totalPrice)) >= 3000) {
        deliveryCost = 0
    } else {
        deliveryCost = 300
    }
    const finalCost = (Number(totalPrice)) + Number(deliveryCost)
    const disc = cart.cartItems
        .reduce((acc, item) => acc + item.price * item.qty, 0)
        .toFixed(0) - cart.cartItems
        .reduce((acc, item) => acc + item.discountPrice * item.qty, 0)
        .toFixed(0);
    // const {products: data} = useSelector((state) => state.productsTopRated)
    const {products: seenProducts} = useSelector((state) => state.productsSeen)

    return (
        <Container className='categ'>
            <Row className='w-100'>
                {!isLoading &&
                    <Col xs={12} sm={12} md={8}>
                        <Link href="/" className="btn btn-light my-3" onClick={(e) => {
                            e.preventDefault()
                            history.back({scroll: false})
                        }
                        }>
                            Назад
                        </Link>
                        <h1> Корзина</h1>
                        {
                            cartItems &&
                            cartItems.length === 0 ? (
                                <Message variant='info'>
                                    Корзина пуста
                                </Message>
                            ) : (
                                <ListGroup variant='flush'>
                                    {cartItems && cartItems.map((item, ind) => (

                                        <ListGroupItem key={ind}>
                                            <Row>
                                                <Col md={2} className='text-center'>
                                                    <Image src={item.image} alt={item.name} className='maxHeight-100'
                                                           fluid rounded/>
                                                </Col>
                                                <Col md={3}>
                                                    <Link href={`/products/${item.product}`}>{item.name}</Link>
                                                    {(((item.color && item.color !== 'цвет не указан')) || (item.color && Object.keys(item.colors[0]) && item.color !== 'цвет не указан')) &&
                                                        <Form.Control
                                                            as="select"
                                                            value={item.color}
                                                            disabled={Object.keys(item.colors).length === 1}
                                                            onChange={(e) => {
                                                                // setColor(e.target.value.split(' / ')[0])
                                                                // setSize(e.target.value.split(' / ')[1])
                                                                let defSize = ''
                                                                item.colors.forEach(color => {
                                                                    if (Object.keys(color)[0] === e.target.value) {
                                                                        defSize = color[Object.keys(color)[0]][0]
                                                                    }

                                                                })
                                                                dispatch(addToCart(item.product, item.qty, e.target.value, defSize, ind, 0.1))

                                                            }}
                                                        >
                                                            {
                                                                item.colors.map(item =>
                                                                        // item.countInStock > 0 &&
                                                                        // item[Object.keys(item)[0]].map(size =>

                                                                        <option key={Object.keys(item)[0]}
                                                                                value={Object.keys(item)[0]}>
                                                                            {Object.keys(item)[0]}
                                                                        </option>
                                                                    // )
                                                                )
                                                            }
                                                        </Form.Control>}
                                                    {(item.size) &&
                                                        <Form.Control
                                                            as="select"
                                                            value={item.size}
                                                                disabled={
                                                                    item.colors[0][Object.keys(item.colors[0])].length === 1
                                                            }
                                                            onChange={(e) => {
                                                                // setColor(e.target.value)
                                                                // setSize(e.target.value.split(' / ')[1])
                                                                dispatch(addToCart(item.product, item.qty, item.color, e.target.value, ind, 0.1))

                                                            }}
                                                        >

                                                            {item.colors.map(color =>
                                                                Object.keys(color)[0] === item.color ?
                                                                    color[Object.keys(color)[0]].map(size =>
                                                                        <option key={size}
                                                                                value={size}>
                                                                            {size}
                                                                        </option>
                                                                    ) : ''
                                                            )}


                                                        </Form.Control>


                                                    }
                                                </Col>
                                                <Col md={3} className='d-inline-block flex-column'>
                                                    <p className='mb-0 fw-bolder'>₽ {item.price * item.qty}</p>
                                                    {(Number(item.oldPrice) > Number(item.price)) &&
                                                        <span
                                                            className='old-price'> ₽ {item.oldPrice * item.qty}

                                                        </span>}
                                                    <Badge pill bg='success'>
                                                        <FontAwesomeIcon
                                                            icon={faCreditCard}/> {item.discountPrice * item.qty} при
                                                        оплате картой
                                                    </Badge>
                                                </Col>
                                                <Col md={3}>
                                                    <div className='mb-2 float-end'>
                                                        <span
                                                            className='asButton'
                                                            onClick={() =>{
                                                                if (item.qty > 1) {
                                                                dispatch(addToCart(item.product, item.qty-1, item.color, item.size, ind, 0.1))}
                                                            }
                                                        }
                                                        >
                                                            -
                                                        </span>
                                                        <span className='asButton'>
                                                            {item.qty}
                                                        </span>
                                                        <span
                                                            className='asButton'

                                                            onClick={() => {
                                                                if (item.countInStock > item.qty) {
                                                                    dispatch(addToCart(item.product, item.qty+1, item.color, item.size, ind, 0.1))
                                                                }
                                                            }}
                                                        >
                                                            +
                                                        </span>

                                                    </div>

                                                    {/*<Form.Control*/}
                                                    {/*    as='select'*/}
                                                    {/*    // as="select"*/}
                                                    {/*    value={Number(item.qty)}*/}
                                                    {/*    onChange={(e) => {*/}
                                                    {/*        // setQty(Number(e.target.value))*/}
                                                    {/*        dispatch(addToCart(item.product, Number(e.target.value), item.color, item.size, ind, 0.1))*/}

                                                    {/*    }*/}
                                                    {/*    }*/}
                                                    {/*>*/}
                                                    {/*    {*/}

                                                    {/*        [...Array(item.countInStock).keys()].map((x) => (*/}
                                                    {/*            <option key={x + 1} value={x + 1}>*/}
                                                    {/*                {x + 1}*/}
                                                    {/*            </option>*/}
                                                    {/*        ))*/}
                                                    {/*    }*/}

                                                    {/*</Form.Control>*/}

                                                </Col>

                                                <Col md={1}>
                                                    <Button
                                                        type='button'
                                                        variant='light'
                                                        onClick={() => removeFromCartHandler(ind)}
                                                    >
                                                        <FontAwesomeIcon icon={faTrashCan}/>
                                                    </Button>
                                                </Col>
                                            </Row>

                                        </ListGroupItem>
                                    ))}
                                </ListGroup>
                            )
                        }
                    </Col>}
                {!isLoading &&
                    <Col md={4}>
                        <Card>
                            {cartItems &&
                                <ListGroupItem>
                                    <Button
                                        type='button'
                                        variant='success'
                                        className='w-100 mb-3'
                                        disabled={cartItems.length === 0}
                                        onClick={checkoutHandler}
                                    >
                                        Перейти к оформлению
                                    </Button>
                                    <p style={{'color': '#808d9a', 'fontSize': '14px'}}>Доступные способы и время
                                        доставки можно выбрать при
                                        оформлении заказа</p>
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
                                            <span className='fs-6'>Скидка</span>
                                            <span style={{
                                                'color': '#f91155',
                                                'fontWeight': '700'
                                            }}>
                                            {(totalOldPrice - totalPrice).toFixed(0)}
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
                                        }}>{finalCost}
                                        </span>
                                    </div>
                                    <div className='d-flex justify-content-between'>
                                        <span className='fs-6'>При оплате картой на сайте</span>
                                        <span style={{
                                            'color': '#10C44C',
                                            'fontWeight': '700'
                                        }}>
                                            {finalCost - disc}
                                        </span>
                                    </div>

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
                    </Col>
                }
            </Row>
            {seenProducts && seenProducts.length > 0 &&
                <>
                    <div className='popular my-3'>
                        <span className='mx-3 fs-4 text-white'>Вы смотрели</span>
                        <div className='line'></div>
                    </div>
                    <SeenProductCarousel/>
                </>
            }
            {pageProps.topData &&
                <>
                    <div className='popular my-3'>
                        <span className='mx-3 fs-4 text-white'>Популярное</span>
                        <div className='line'></div>
                    </div>
                    <ProductCarousel data={pageProps.topData}/>
                </>}
        </Container>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(store => async (ctx) => {
    const {data} = await axios.get(`${API_HOST}/api/products/top`);
    if (!data) {
        return {
            notFound: true,
        }
    }
    return {props: {topData: data}}
})
export default Index