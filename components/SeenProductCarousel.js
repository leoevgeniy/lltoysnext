import React, { useEffect, useState } from "react";
import {useSelector} from "react-redux";
import Image from "next/image";
import ItemsCarousel from "react-items-carousel";
import Link from "next/link";
import Loader from "./Loader";
import Message from "./Message";
import {listSeenProducts} from "@/redux/actions/productAction";
import {Button, Container} from "react-bootstrap";

let pageWidth = 0
// if (typeof document !== 'undefined') {
//     pageWidth = document.documentElement.scrollWidth}
let numberOfCards = 0
if (pageWidth < 1400 && pageWidth > 1200) {
    numberOfCards = 7
} else if (pageWidth <= 1200 && pageWidth > 991) {
    numberOfCards = 7
} else if (pageWidth < 992 && pageWidth > 574) {
    numberOfCards = 7
} else if (pageWidth < 575 && pageWidth > 360) {
    numberOfCards = 3
} else if (pageWidth < 361) {
    numberOfCards = 3
} else {numberOfCards = 7}
const chevronWidth = 30;
const autoPlayDelay = 4000;

function ProductCarousel() {
    const { loading, error, products} = useSelector(
        (state) => state.productsSeen
    );
    const [state, setState] = useState({activeItemIndex: 0})
    // useEffect(() => {
    //     const tick = () => setState(prevState => ({
    //         activeItemIndex: (prevState.activeItemIndex + 1),
    //       }));
    //     let interval = setInterval(tick, autoPlayDelay);
    //     return () => {
    //         clearInterval(interval)
    //     }
    //
    // }, []);

    const onChange = value => setState({ activeItemIndex: value });


    return (
        loading? 
        <Loader/>
        : error ?
        <Message/> : (products ?
            <Container style={{ padding: `0 `, width: '100%' }}>
                <ItemsCarousel
                    infiniteLoop
                    gutter={10}
                    numberOfCards={numberOfCards}
                    activeItemIndex={state.activeItemIndex}
                    requestToChangeActive={onChange}
                    chevronWidth={chevronWidth}
                    alwaysShowChevrons
                    leftChevron={<span style={{'width': '20px', 'height':'20px', 'color': 'black'}}>{'<'}</span>}
                    rightChevron={<span style={{'width': '20px', 'height':'20px', 'color': 'black'}}>{'>'}</span>}

                >
                    {products.map((product, i) => (
                        <Link key={product._id} href={`/products/${product._id}`}>
                            <img src={product.imageSmall} alt={product.name} />
                        </Link>
                    ))}
                </ItemsCarousel>
            </Container> : '  '
                )
    );
}
export default ProductCarousel;
