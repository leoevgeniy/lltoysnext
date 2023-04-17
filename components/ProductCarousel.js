import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
import ItemsCarousel from "react-items-carousel";
import Link from "next/link";
import Loader from "./Loader";
import Message from "./Message";
import axios from "axios";
import {API_HOST} from "@/consts";




function ProductCarousel({data}) {
    const products = data
    const {error, loading} =
        useSelector((state) => state.productsTopRated
    );
    let numberOfCards = 0
    const chevronWidth = 60;
    const autoPlayDelay = 4000;

    // const [activeItemIndex, setActiveItemIndex] = useState(0);
    const [state, setState] = useState({activeItemIndex: 0})
    useEffect(() => {
        const tick = () => setState(prevState => ({
            activeItemIndex: (prevState.activeItemIndex + 1),
          }));
        let interval = setInterval(tick, autoPlayDelay);
        return () => {
            clearInterval(interval)
        }
        
    }, [state]);
    useEffect(() => {
        let pageWidth = 0
        if (typeof document !== 'undefined') {
        pageWidth = document.documentElement.scrollWidth}
        if (pageWidth < 1400 && pageWidth > 1200) {
            numberOfCards = 7
        } else if (pageWidth <= 1200 && pageWidth > 991) {
            numberOfCards = 5
        } else if (pageWidth < 992 && pageWidth > 574) {
            numberOfCards = 3
        } else if (pageWidth < 575 && pageWidth > 360) {
            numberOfCards = 2
        } else if (pageWidth < 361) {
            numberOfCards = 2
        } else {numberOfCards = 7}
    },[])

    const onChange = value => setState({ activeItemIndex: value });


    return (
        // loading?
        // <Loader/>
        // : error ?
        // <Message/> :
        <div style={{ padding: `0 `, width: '100%' }}>
            <ItemsCarousel
                infiniteLoop
                gutter={20}
                numberOfCards={numberOfCards}
                activeItemIndex={state.activeItemIndex}
                requestToChangeActive={onChange}
                chevronWidth={chevronWidth}
            >
                {products.map((product, i) => (
                    <Link key={product._id} href={`/products/${product._id}`}>
                        <img loading="lazy"  src={product.imageSmall} alt={product.name} />
                    </Link>
                ))}
            </ItemsCarousel>
        </div>
    );
}

export default ProductCarousel;