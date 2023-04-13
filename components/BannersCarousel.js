import React, { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import Carousel from 'react-bootstrap/Carousel';
import deliveryFree from '../img/freeship.jpg'
import cardDiscount from '../img/discount10.jpg'


function BannersCarousel(props) {
    const slids = [deliveryFree, cardDiscount]
    const alts = ['Бесплатная доставка', 'Скидка 10% при оплате на сайте']
    return (
        <Carousel fade interval={2000} variant="dark">
            {
                slids.map((slide, i) =>
                    <Carousel.Item key={i}>
                        <img
                            className="d-block w-100 my-3"
                            style={{'height': '30vh'}}
                            src={slide}
                            alt={alts[i]}
                        />
                    </Carousel.Item>
                )
            }
        </Carousel>
    );
}
export default BannersCarousel;
