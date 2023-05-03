import React, {useEffect, useState} from "react";
import ItemsCarousel from "react-items-carousel";
import Link from "next/link";
import {Container} from "react-bootstrap";
import Image from "next/image";
import Product from "@/components/Product";
import Loader from "@/components/Loader";
import Message from "@/components/Message";

let pageWidth = 0
if (typeof document !== 'undefined') {
    pageWidth = document.documentElement.scrollWidth
}
let numberOfCards = 0
if (pageWidth < 1400 && pageWidth > 1200) {
    numberOfCards = 7
} else if (pageWidth <= 1200 && pageWidth > 991) {
    numberOfCards = 5
} else if (pageWidth < 992 && pageWidth > 574) {
    numberOfCards = 4
} else if (pageWidth < 575 && pageWidth > 360) {
    numberOfCards = 3
} else if (pageWidth < 361) {
    numberOfCards = 3
} else {
    numberOfCards = 7
}
const chevronWidth = 30;
const autoPlayDelay = 4000;

function ProductCarousel({data}) {
    const [state, setState] = useState({activeItemIndex: 0})
    const [products, setProducts] = useState()
    // useEffect(() => {
    //     const tick = () => setState(prevState => ({
    //         activeItemIndex: (prevState.activeItemIndex + 1),
    //     }));
    //     let interval = setInterval(tick, autoPlayDelay);
    //     return () => {
    //         clearInterval(interval)
    //     }
    //
    // }, []);
    useEffect(() => {
        setProducts(data)
    },[])

    return (
        // loading ?
        //     <Loader/>
        //     : error ?
        // <Message/>:
        (products &&
                <Container style={{padding: `0 `, width: '100%'}}>
                    <ItemsCarousel
                        infiniteLoop
                        gutter={3}
                        numberOfCards={numberOfCards}
                        activeItemIndex={state.activeItemIndex}
                        requestToChangeActive={(value) => setState({activeItemIndex: value})}
                        chevronWidth={chevronWidth}
                        leftChevron={<span style={{'width': '20px', 'height': '20px', 'color': 'black'}}>{'<'}</span>}
                        rightChevron={<span style={{'width': '20px', 'height': '20px', 'color': 'black'}}>{'>'}</span>}

                    >
                        {
                            products.map((product, i) => (
                                <Link key={product._id} href={`/products/${product._id}`} className='text-decoration-none product-carousel'>
                                    <Image   width="0"
                                             height="0"
                                             sizes="100vw"
                                             className="w-full h-auto"
                                             loading='lazy'
                                             src={product.imageSmall}
                                             alt={product.name}/>
                                    <span
                                        className={product.superSaleCost ? 'price text-bg-danger fs-6' : Number(product.baseRetailPrice) > Number(product.retailPrice) ? 'price fs-6 text-white' : 'price  fs-6 text-white'}> ₽ {Number(product.retailPrice).toFixed(0)} </span>

                                    {
                                        (Number(product.baseRetailPrice) > Number(product.retailPrice)) ?
                                        <span
                                            className='old-price '> ₽ {Number(product.baseRetailPrice) > Number(product.retailPrice) ? Number(product.baseRetailPrice).toFixed(0):Number(product.retailPrice).toFixed(0)}

                                        </span>
                                        : <br/>
                                    }
                                </Link>
                            )
                        )
                        }
                    </ItemsCarousel>
                </Container>
        )
    )
        ;
}

//     let numberOfCards = 0
//     const chevronWidth = 60;
//     const autoPlayDelay = 2000;
//
//     // const [activeItemIndex, setActiveItemIndex] = useState(0);
//     const [stat, setStat] = useState({activeItemIndex: 0})
//     useEffect(() => {
//         const tick = () => setStat(prevState => ({
//             activeItemIndex: (prevState.activeItemIndex + 1),
//         }));
//
//
//     }, [stat]);
//     useEffect(() => {
//         let pageWidth = 0
//         if (typeof document !== 'undefined') {
//             pageWidth = document.documentElement.scrollWidth}
//         if (pageWidth < 1400 && pageWidth > 1200) {
//             numberOfCards = 7
//         } else if (pageWidth <= 1200 && pageWidth > 991) {
//             numberOfCards = 5
//         } else if (pageWidth < 992 && pageWidth > 574) {
//             numberOfCards = 3
//         } else if (pageWidth < 575 && pageWidth > 360) {
//             numberOfCards = 2
//         } else if (pageWidth < 361) {
//             numberOfCards = 2
//         } else {numberOfCards = 7}
//     },[])
//
//     const onChange = value => setStat({ activeItemIndex: value });
//
//
//     return (
//         <Container style={{ padding: `0 `, width: '100%' }}>
//             <ItemsCarousel
//                 infiniteLoop
//                 gutter={20}
//                 numberOfCards={numberOfCards}
//                 activeItemIndex={stat.activeItemIndex}
//                 requestToChangeActive={onChange}
//                 chevronWidth={chevronWidth}
//             >
//                 {products && products.map((product, i) => (
//                     <Link key={product._id} href={`/products/${product._id}`}>
//                         {/*<Product*/}
//                         {/*    product={product}*/}
//                         {/*/>*/}
//                         <Image loading="lazy" width={150} height={150} src={product.imageSmall} alt={product.name} />
//                     </Link>
//                 ))}
//             </ItemsCarousel>
//         </Container>
//     );
// }

export default ProductCarousel;
