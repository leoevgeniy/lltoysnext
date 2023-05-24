import React, {useEffect, useState} from "react";
import Link from "next/link";
import {Badge, Container} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import BannersCarousel from '@/components/BannersCarousel'
import SeenProductCarousel from "@/components/SeenProductCarousel";
import ProductCarousel from "@/components/ProductCarousel";
import {listSeenProducts, listTopProducts} from "@/redux/actions/productAction";
import Image from "next/image";
import mainlady from '@/public/mainladysmall.jpg'
import sexmebel from '@/public/sexmebel.webp'
import erotic from '@/public/erotic.webp'
import bdsm from '@/public/bdsm.jpg'
import lubricants from '@/public/lubricants.webp'
import toys from '@/public/toys.webp'
import things from '@/public/things.webp'
import women from '@/public/women.webp'
import womenSmall from '@/public/womenSmall.webp'
import men from '@/public/men.webp'
import nignee from '@/public/nignee.webp'
import kupalniki from '@/public/kupalniki.webp'
import discount10 from '@/public/discount10.jpg'
import deliveryfree from '@/public/freedelivery.webp'
import {useRouter} from "next/router";
import Loader from "@/components/Loader";

const HomeScreen = (pageProps) => {
    const history = useRouter()
    const {data, bestSeller, novelties} = pageProps
    const {products: seenProducts} = useSelector((state) => state.productsSeen)
    const [oppenedItems, setOppenedItems] = useState([])
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch()
    useEffect(() => {
        if (localStorage.getItem('oppenedItems')) {
            setOppenedItems(JSON.parse(localStorage.getItem("oppenedItems")))
        }

    }, [])
    useEffect(() => {
        if (oppenedItems) {
            dispatch(listSeenProducts(oppenedItems))
        }
    }, [oppenedItems])
    return (
        <>
            {
                loading ? (
                        <Loader/>
                    ) :
                    <Container className='homescreen'>
                        <Container className='d-flex'>
                            <div className='w-75'>
                                <Image
                                    className='mainlady'
                                    src={mainlady}
                                    alt='Эротическая одежда'

                                    loading='lazy'
                                    style={{
                                        objectFit: "contain"
                                    }}
                                />
                            </div>
                            <div className='w-25 d-block'>
                                <Image
                                    src={discount10}
                                    alt='Скидка 10% при оплате картой на сайте'
                                    loading='lazy'
                                    style={{objectFit: "cover", height: "50%", width: "100%"}}
                                />
                                <Image
                                    src={deliveryfree}
                                    alt='Беслпатная доставка по России при заказе от 3000 рублей'
                                    loading='lazy' style={{objectFit: "contain", height: "50%", width: "100%"}}
                                />

                            </div>
                        </Container>
                        <Container className='d-none d-lg-block'>
                            <Link href='/search?supersale=1'
                                  className='mx-3 fs-4 text-white text-decoration-none '

                                  onClick={() => setLoading(true)}
                            >
                                <div className='popular my-2' style={{backgroundColor: '#e5097f'}}>
                                    Распродажа
                                </div>
                            </Link>
                            <ProductCarousel data={data}/>
                        </Container>
                        <Container className="w-100 pt-3">
                            <Container className='categories relative'>
                                <Link className='category category1 position-relative'
                                      href='/category/Эротическая одежда' onClick={() => setLoading(true)}>
                                    <Image placeholder='blur' fill
                                           style={{objectFit: "cover", borderRadius: '30px', overflow: 'hidden'}}
                                           loading="lazy"
                                           src={erotic}
                                           alt='Эротическая одежда'/>
                                </Link>
                                <Link className='category category2 position-relative'
                                      href='/category/BDSM, садо-мазо товары' onClick={() => setLoading(true)}>
                                    <Image placeholder='blur' fill
                                           style={{objectFit: "cover", borderRadius: '30px', overflow: 'hidden'}}
                                           object-fit="cover"
                                           loading="lazy"
                                           src={bdsm} alt='BDSM, садо-мазо товары'/>
                                </Link>
                                <Link className='category category3 position-relative'
                                      href='/category/Смазки, лубриканты' onClick={() => setLoading(true)}>
                                    <Image placeholder='blur' fill
                                           style={{objectFit: "cover", borderRadius: '30px', overflow: 'hidden'}}
                                           loading="lazy"
                                           src={lubricants}
                                           alt='Смазки, лубриканты'/>
                                </Link>
                                <Link className='category category4 position-relative '
                                      href='/category/Анальные игрушки' onClick={() => setLoading(true)}>
                                    <Image placeholder='blur' fill
                                           style={{objectFit: "cover", borderRadius: '30px', overflow: 'hidden'}}
                                           loading="lazy"
                                           src={toys}
                                           alt='Анальные игрушки'/>
                                </Link>
                                <Link className='category category5 position-relative '
                                      href='/category/Приятные мелочи' onClick={() => setLoading(true)}>
                                    <Image placeholder='blur' fill
                                           style={{objectFit: "cover", borderRadius: '30px', overflow: 'hidden'}}
                                           loading="lazy"
                                           src={things}
                                           alt='Приятные мелочи'/>
                                </Link>
                            </Container>
                        </Container>
                        <Container>
                            <Link href='/search?bestsellers=1' className='fs-4 text-light text-decoration-none'
                                  onClick={() => setLoading(true)}>
                                <div className='' style={{backgroundColor: '#e5097f'}}>
                                    Хиты
                                    продаж
                                </div>
                            </Link>
                            <ProductCarousel data={bestSeller}/>
                        </Container>
                        {/*<BannersCarousel/>*/}
                        <Container className="w-100">
                            <Container className='categories2 '>
                                <Link className='category category6 position-relative w-full'
                                      href='/category/Секс-мебель и качели' onClick={() => setLoading(true)}>
                                    <Image placeholder='blur' fill
                                           style={{objectFit: "cover", borderRadius: '10px', overflow: 'hidden'}}
                                           loading="lazy"
                                           src={sexmebel}
                                           alt='Секс-мебель и качели'/>
                                </Link>
                                <Link className='category category7 position-relative w-full'
                                      href='/category/Секс-товары для женщин' onClick={() => setLoading(true)}>
                                    <Image placeholder='blur' fill
                                           style={{objectFit: "cover", borderRadius: '30px', overflow: 'hidden'}}
                                           loading="lazy"
                                           src={women}
                                           alt='Секс-товары для женщин' className=''/>
                                </Link>
                                <Link className='category category11 position-relative w-full'
                                      href='/category/Секс-товары для женщин' onClick={() => setLoading(true)}>
                                    <Image placeholder='blur' fill
                                           style={{objectFit: "cover", borderRadius: '30px', overflow: 'hidden'}}
                                           loading="lazy"
                                           src={womenSmall}
                                           alt='Секс-товары для женщин'/>
                                </Link>
                                <Link className='category category8 position-relative w-full'
                                      href='/category/Секс-товары для мужчин' onClick={() => setLoading(true)}>
                                    <Image placeholder='blur' fill
                                           style={{objectFit: "cover", borderRadius: '30px', overflow: 'hidden'}}
                                           loading="lazy"
                                           src={men}
                                           alt='Секс-товары для мужчин'/>
                                </Link>
                                <Link className='category category9 position-relative w-full'
                                      href='/category/Нижнее белье' onClick={() => setLoading(true)}>
                                    <Image placeholder='blur' fill
                                           style={{objectFit: "cover", borderRadius: '30px', overflow: 'hidden'}}
                                           loading="lazy"
                                           src={nignee}
                                           alt='Нижнее белье'/>
                                </Link>
                                <Link className='category category10 position-relative w-full'
                                      href='/category/Купальники' onClick={() => setLoading(true)}>
                                    <Image placeholder='blur' fill
                                           style={{objectFit: "cover", borderRadius: '30px', overflow: 'hidden'}}
                                           loading="lazy"
                                           src={kupalniki}
                                           alt='Купальники'/>
                                </Link>
                            </Container>
                        </Container>
                        <Container>
                            <Link href='/search?novelties=1'
                                  className='fs-4 text-light text-decoration-none'
                                  onClick={() => setLoading(true)}>
                                <div className='popular my-1' style={{backgroundColor: '#e5097f'}}>
                                    Новинки
                                </div>
                            </Link>
                            <ProductCarousel data={novelties}/>
                        </Container>
                        {(oppenedItems && oppenedItems.length > 0 && seenProducts) &&
                            <Container>
                                <div className='popular my-1' style={{backgroundColor: '#e5097f'}}>
                                    <span className='mx-3 fs-4 text-white'>Вы смотрели</span>
                                </div>
                                <SeenProductCarousel/>
                            </Container>
                        }

                    </Container>
            }
        </>
    )
}


export default HomeScreen