
import React, { useEffect, useState } from "react";
import ItemsCarousel from "react-items-carousel";
import Link from "next/link";
import {Container} from "react-bootstrap";
import Image from "next/image";
import Product from "@/components/Product";

function ProductCarousel({data}) {
    const products = data
    let numberOfCards = 0
    const chevronWidth = 60;
    const autoPlayDelay = 2000;

    // const [activeItemIndex, setActiveItemIndex] = useState(0);
    const [stat, setStat] = useState({activeItemIndex: 0})
    useEffect(() => {
        const tick = () => setStat(prevState => ({
            activeItemIndex: (prevState.activeItemIndex + 1),
        }));


    }, [stat]);
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

    const onChange = value => setStat({ activeItemIndex: value });


    return (
        <Container style={{ padding: `0 `, width: '100%' }}>
            <ItemsCarousel
                infiniteLoop
                gutter={20}
                numberOfCards={numberOfCards}
                activeItemIndex={stat.activeItemIndex}
                requestToChangeActive={onChange}
                chevronWidth={chevronWidth}
            >
                {products && products.map((product, i) => (
                    <Link key={product._id} href={`/products/${product._id}`}>
                        <Product
                            product={product}
                        />
                        {/*<Image loading="lazy" width={150} height={150} src={product.imageSmall} alt={product.name} />*/}
                    </Link>
                ))}
            </ItemsCarousel>
        </Container>
    );
}

export default ProductCarousel;
