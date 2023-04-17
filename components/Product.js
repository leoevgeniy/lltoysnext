import React, {useEffect, useState} from 'react'
import {Button, Card, Form} from 'react-bootstrap'
import Rating from './Rating'
import Link from 'next/link'
import Image from "next/image";

function Product({product}) {

    let price = Number(product.retailPrice)
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


    })

    let szString = ''
    if (color && size) {
        szString = '&color=' + color + '&size=' + size
    } else if (color && !size) {
        szString = '&color=' + color
    } else if (!color && size) {
        szString = '&size=' + size
    }

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
    let cat = 999999
    if (Number(product.prodId) < 9999) {
        cat = 0;
    } else if (product.prodId.length === 5) {
        cat = product.prodId[0]
    } else if (product.prodId.length === 6) {
        cat = product.prodId[0] + product.prodId[1]
    }
    const srcLink = `https://feed.p5s.ru/images/mid/${cat}/mid_${product.prodId}.jpg`

    return (
        <Card itemScope itemType="http://schema.org/Product" className='my-3 py-0 h-100 rounded cardstyle head'>
            <Link href={`/products/${product._id}`}>
                <Card.Img

                    src={srcLink}
                    alt={product.name}/>


        </Link>

    <Card.Body itemProp="offers" itemScope itemType="http://schema.org/Offer" className='py-0 body'>
        <Link href={`/products/${product._id}`}>
            <Card.Title
                // style={{'font-size' : '1vw', 'font-weight': 'bold'}}
            >
                <span itemProp="name" className='card-title fw-bold text-lowercase'>{product.name}</span>
            </Card.Title>
        </Link>
        {product.numReviews > 10 &&
            <Card.Text as="div">
                <div className="my-1">
                    <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'}/>
                </div>
            </Card.Text>}
        <p className='text-lowercase fw-bold card-buy d-inline-block text-center py-0'>
            <meta itemProp="price" content={price.toFixed(0)}/>
            <meta itemProp="priceCurrency" content="RUB"/>
            <span className='price py-0'>₽ {price.toFixed(0)} </span></p>
        <div className='d-inline-block pb-3 w-100'>
            {((product.colors[0] && Object.keys(product.colors[0])[0] && Object.keys(product.colors[0])[0] != 'цвет не указан') && product.colors[0][Object.keys(product.colors[0])[0]] !== '') &&
                <Form.Control
                    className='size'
                    as="select"

                    disabled={Object.keys(product.colors).length === 1 && product.colors[0][Object.keys(product.colors[0])].length === 1}
                    // value={aid}
                    onChange={(e) => {
                        setColor(e.target.value.split(' / ')[0])
                        setSize(e.target.value.split(' / ')[1])

                    }}
                >
                    {product.colors.map(item =>
                        item[Object.keys(item)[0]].map(size =>
                            (
                                <option
                                    className='text-center'
                                    key={product.assortiment[0].aID + Object.keys(item)[0] + ' / ' + size}
                                    value={Object.keys(item)[0] + (size ? (' / ') : ('')) + size}
                                >
                                    {Object.keys(item)[0] + (size ? (' / ') : ('')) + size}
                                </option>
                            )
                        )
                    )
                    }
                </Form.Control>


            }
            <Link className='asButton w-100 text-center mt-4'
                  href={`/cart/${product._id}?qty=${qty}${szString}`}>Купить</Link>
        </div>

    </Card.Body>
</Card>
)
}

export default Product