import React, { useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import { Image } from "react-bootstrap";
import ItemsCarousel from "react-items-carousel";
import { Link } from "react-router-dom";
import Loader from "./Loader";
import Message from "./Message";
import {listSeenProducts} from "../actions/productActions";

const pageWidth = document.documentElement.scrollWidth
let numberOfCards = 0
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
const chevronWidth = 60;
const autoPlayDelay = 4000;

function ProductCarousel() {
    const { loading, error, products, oppenedItems } = useSelector(
        (state) => state.productsSeen
    );
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

    const onChange = value => setState({ activeItemIndex: value });


    return (
        loading? 
        <Loader/>
        : error ?
        <Message/> : (products ?
            <div style={{ padding: `0 `, width: '100%' }}>
                <ItemsCarousel
                    infiniteLoop
                    gutter={20}
                    numberOfCards={numberOfCards}
                    activeItemIndex={state.activeItemIndex}
                    requestToChangeActive={onChange}
                    chevronWidth={chevronWidth}
                    children={products.map((product, i) => (
                        <Link key={product._id} to={`/products/${product._id}`}>
                            <Image src={product.imageSmall} alt={product.name} />
                        </Link>
                    ))}
                />
            </div> : '  '
                )
    );
}
export default ProductCarousel;
