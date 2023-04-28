import React, {useEffect, useState} from 'react'
import {Badge, Button, Card, Form} from 'react-bootstrap'
import Rating from './Rating'
import Link from 'next/link'
import Image from "next/image";
import {PRODUCT_DETAILS_RESET} from "@/redux/types";
import {addToCart} from "@/redux/actions/cartActions";
import {useDispatch} from "react-redux";
import {useRouter} from "next/router";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCreditCard} from "@fortawesome/free-solid-svg-icons";

function Product({product}) {
    const dispatch = useDispatch();
    let price = Number(product.retailPrice)
    const rPrice = Number(product.baseRetailPrice)
    const [qty, setQty] = useState(1);
    // const [color, setColor] = useState(Object.keys(product.colors)[0])
    // const [size, setSize] = useState('')
    function move_to_cart(picture, cart) {

        let picture_pos = document.getElementById(picture).getBoundingClientRect();
        let cart_pos = document.getElementById(cart).getBoundingClientRect();

        let picture2 = document.getElementById(picture).cloneNode();

        picture2.style.position = "fixed";
        picture2.style.left = picture_pos['x'] + "px";
        picture2.style.top = picture_pos['y'] + "px";
        picture2.style.border = "none";
        picture2.style.zIndex = 32767;

        let start_x = picture_pos['x'] + 0.5 * picture_pos['width'];
        let start_y = picture_pos['y'] + 0.5 * picture_pos['height'];

        let delta_x = (cart_pos['x'] + 0.5 * cart_pos['width']) - start_x;
        let delta_y = (cart_pos['y'] + 0.5 * cart_pos['height']) - start_y;

        document.body.appendChild(picture2);
        void picture2.offsetWidth;
        picture2.style.transform = "translateX(" + delta_x + "px)";
        picture2.style.transform += "translateY(" + delta_y + "px)";
        picture2.style.transform += "scale(1.50)"; // уменьшаем до 25%
        picture2.style.transition = "2s"; // всё происходит за 1 секунду

        setTimeout(() => document.body.removeChild(picture2), 960);
    }

    let cat = 999999
    if (Number(product.prodId) < 9999) {
        cat = 0;
    } else if (product.prodId.length === 5) {
        cat = product.prodId[0]
    } else if (product.prodId.length === 6) {
        cat = product.prodId[0] + product.prodId[1]
    }
    const addToCartHandler = (e) => {
        e.preventDefault()
        const sendColor = Object.keys(product.colors[0])[0] || ''
        dispatch(addToCart(product._id, qty, sendColor,'', 'undefined', 0.1))
        dispatch({type: PRODUCT_DETAILS_RESET})

        // move_to_cart('toCart', 'cart')
    }
    const history = useRouter()

    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }

    // const oldPrice = product.superSaleCost ? (price * getRandomArbitrary(3,4)).toFixed(0) : (price * getRandomArbitrary(1.3,1.8)).toFixed(0)
    const oldPrice = (rPrice > price) ? Number(rPrice).toFixed(0) : price
    const srcLink = `https://feed.p5s.ru/images/mid/${cat}/mid_${product.prodId}.jpg`
    const priceStyle = 'text-lowercase fw-bold card-buy d-inline-block text-start py-0 fs-6'
    // const assortimentBool = (product.colors[0] && Object.keys(product.colors[0])[0] && Object.keys(product.colors[0])[0] != 'цвет не указан') && product.colors[0][Object.keys(product.colors[0])[0]] !== ''
    return (
        <Card itemScope itemType="http://schema.org/Product" className='my-1 py-0 h-100 rounded cardstyle head'
        >
            <div className='cardimg'>
                <Card.Img
                    onClick={() => history.push(`/products/${product._id}`)}
                    src={srcLink}
                    alt={product.name}
                >
                </Card.Img>


                {(rPrice > price && (1 - (price / rPrice)) > 0.04) && <Badge pill bg='danger' className='badge'>
                    - {((1 - (price / oldPrice)) * 100).toFixed(0)} %
                </Badge>}
                {product.superSaleCost &&
                    <Badge pill bg='danger' className='badge-sale'>
                        Распродажа
                    </Badge>

                }
            </div>

            <Card.Body itemProp="offers" itemScope itemType="http://schema.org/Offer"

                       className='py-1 body'>
                {/*<Card.Title*/}

                {/*    // style={{'font-size' : '1vw', 'font-weight': 'bold'}}*/}

                {/*>*/}
                <p className='text-lowercase fw-bold card-buy d-inline-block text-start py-3 fs-6 '
                   onClick={() => history.push(`/products/${product._id}`)}
                >
                    <meta itemProp="price" content={price.toFixed(0)}/>
                    <meta itemProp="priceCurrency" content="RUB"/>
                    <span
                        className={product.superSaleCost ? 'price text-bg-danger fs-3' : rPrice > price ? 'price fs-3' : 'price  fs-3'}> ₽ {price.toFixed(0)} </span>
                    {(rPrice > price) ?
                        <span
                            className='old-price '> ₽ {oldPrice}

                    </span> : <br/>}
                    <Badge pill bg='success' className='badgeCard float-end'>
                        <FontAwesomeIcon icon={faCreditCard}/> - 10%
                    </Badge>
                </p>
                {/*</Card.Title>*/}
                <span onClick={() => history.push(`/products/${product._id}`)}
                      className='fw-bold card-buy d-inline-block text-start py-0 mb-0 fs-6 align-text-top'>

                    <span itemProp="name" className='card-title fw-bold text-black'>{product.name}</span>


                </span>
                {!product.colors[0] || product.colors[0][Object.keys(product.colors[0])][0] === '' &&
                    <span
                        id='toCart'
                        className='picture asButton text-center mt-1 mb-1 pl-0'
                        style={{'background-color': ''}}
                        onClick={addToCartHandler}
                    >В корзину</span>}


            </Card.Body>
        </Card>
    )
}

export default Product