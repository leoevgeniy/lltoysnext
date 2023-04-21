import React, {useEffect, useState} from 'react'
import {Button, Card, Form} from 'react-bootstrap'
import Rating from './Rating'
import Link from 'next/link'
import Image from "next/image";
import {PRODUCT_DETAILS_RESET} from "@/redux/types";
import {addToCart} from "@/redux/actions/cartActions";
import {useDispatch} from "react-redux";
import {useRouter} from "next/router";

function Product({product}) {
    const dispatch = useDispatch();
    let price = Number(product.retailPrice)
    const rPrice = Number(product.baseRetailPrice)
    const [qty, setQty] = useState(1);
    const [color, setColor] = useState(Object.keys(product.colors)[0])
    // console.log(product.colors[0]);
    // console.log(Object.keys(product.colors[0])[0]);
    const [size, setSize] = useState('')
    // useState(product.colors[0][Object.keys(product.colors[0])][0])
    useEffect(() => {
        if (product.colors[0]) {
            setSize(product.colors[0][Object.keys(product.colors[0])][0])
        }


    }, [])

    // let szString = ''
    // if (color && size) {
    //     szString = '&color=' + color + '&size=' + size
    // } else if (color && !size) {
    //     szString = '&color=' + color
    // } else if (!color && size) {
    //     szString = '&size=' + size
    // }

    // if (product) {
    //     if (product.assortiment.color) {colorString = product.assortiment.color.split(',')
    //         let isSimilar = true
    //         for (let i = 0; i<colorString.length; i++){
    //             if (colorString[i+1]) {
    //                 isSimilar = colorString[i] === colorString[i + 1];
    //             }
    //             if (!isSimilar) {
    //                 break
    //             }
    //
    //         }
    //         if (isSimilar) {colorString.length = 1}
    //         }
    //     if (colorString.length > 1) {
    //        if (product.size) {sizeString = product.size.split(',')}
    //
    //        for (let i=0; i<sizeString.length; i++) {
    //            let singleSize = sizeString[i].split('-')
    //            for (let k=0; k<singleSize.length; k++) {
    //                sizeDisplayString.push(singleSize[k] + ' / ' + colorString[i])
    //            }
    //
    //        }
    //    } else if (colorString.length === 1) {
    //         if (product.size) {sizeString = product.size.split(',')}
    //
    //         for (let i=0; i<sizeString.length; i++) {
    //             let singleSize = sizeString[i].split('-')
    //             for (let k=0; k<singleSize.length; k++) {
    //                 sizeDisplayString.push(singleSize[k])
    //             }
    //
    //         }
    //    }
    //
    // }
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
        picture2.style.transform += "scale(0.25)"; // уменьшаем до 25%
        picture2.style.transition = "1s"; // всё происходит за 1 секунду

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
        dispatch({type: PRODUCT_DETAILS_RESET})
        dispatch(addToCart(product._id, qty, color, size, 'undefined', 0.1))
        move_to_cart('toCart', 'cart')
    }
    const history = useRouter()

    const srcLink = `https://feed.p5s.ru/images/mid/${cat}/mid_${product.prodId}.jpg`
    const priceStyle = 'text-lowercase fw-bold card-buy d-inline-block text-start py-0 fs-6'
    // const assortimentBool = (product.colors[0] && Object.keys(product.colors[0])[0] && Object.keys(product.colors[0])[0] != 'цвет не указан') && product.colors[0][Object.keys(product.colors[0])[0]] !== ''
    return (
        <Card itemScope itemType="http://schema.org/Product" className='my-1 py-0 h-100 rounded cardstyle head'>
            <Card.Img
                onClick={() => history.push(`/products/${product._id}`)}
                src={srcLink}
                alt={product.name}
            />


            <Card.Body itemProp="offers" itemScope itemType="http://schema.org/Offer"
                  className='py-1 body'>
                {/*<Card.Title*/}

                {/*    // style={{'font-size' : '1vw', 'font-weight': 'bold'}}*/}

                {/*>*/}
                <p className='text-lowercase fw-bold card-buy d-inline-block text-start py-3 fs-6'

                >
                    <meta itemProp="price" content={price.toFixed(0)}/>
                    <meta itemProp="priceCurrency" content="RUB"/>
                    <span
                        className={product.superSaleCost ? 'price text-bg-danger fs-3' : 'price text-bg-success fs-3'}> ₽ {price.toFixed(0)} </span>
                    <span
                        className='old-price'> ₽ {product.superSaleCost ? (price * 3.56).toFixed(0) : (price * 1.43).toFixed(0)} </span>
                </p>
                {/*</Card.Title>*/}
                <Link href={`/products/${product._id}`}
                      className='fw-bold card-buy d-inline-block text-start py-0 mb-0 fs-6 align-text-top'>

                    <span itemProp="name" className='card-title fw-bold text-black'>{product.name}</span>


                </Link>
                {/*{product.numReviews > 10 &&*/}
                {/*    <Card.Text as="div">*/}
                {/*        <div className="my-1">*/}
                {/*            <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'}/>*/}
                {/*        </div>*/}
                {/*    </Card.Text>}*/}

                {/*<div className='d-inline-block pb-1 w-100 '>*/}
                {/*    {assortimentBool &&*/}
                {/*        <Form.Control*/}
                {/*            className='size w-100'*/}
                {/*            as="select"*/}

                {/*            disabled={Object.keys(product.colors).length === 1 && product.colors[0][Object.keys(product.colors[0])].length === 1}*/}
                {/*            // value={aid}*/}
                {/*            onChange={(e) => {*/}
                {/*                console.log('target', e.target.value)*/}
                {/*                setColor(e.target.value.split(' / ')[0])*/}
                {/*                setSize(e.target.value.split(' / ')[1])*/}

                {/*            }}*/}
                {/*        >*/}
                {/*            {product.colors.map(item =>*/}
                {/*                item[Object.keys(item)[0]].map(size =>*/}
                {/*                    (*/}
                {/*                        <option*/}
                {/*                            className='text-center'*/}
                {/*                            key={product.assortiment[0].aID + Object.keys(item)[0] + ' / ' + size}*/}
                {/*                            value={Object.keys(item)[0] + (size ? (' / ') : ('')) + size}*/}
                {/*                        >*/}
                {/*                            {Object.keys(item)[0] + (size ? (' / ') : ('')) + size}*/}
                {/*                        </option>*/}
                {/*                    )*/}
                {/*                )*/}
                {/*            )*/}
                {/*            }*/}
                {/*        </Form.Control>*/}


                {/*    }*/}
                {/*</div>*/}
                {product.colors[0][Object.keys(product.colors[0])][0] === '' &&
                    <Link
                        id='toCart'
                        className='picture asButton w-50 text-center mt-1 mb-1'
                        onClick={addToCartHandler}
                        href='/'
                    >В корзину</Link>}


            </Card.Body>
        </Card>
    )
}

export default Product