import React, {useEffect, useState} from "react";
import Link from "next/link";
import {Badge, Container} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import BannersCarousel from '@/components/BannersCarousel'
import SeenProductCarousel from "@/components/SeenProductCarousel";
import ProductCarousel from "@/components/ProductCarousel";
import {listSeenProducts, listTopProducts} from "@/redux/actions/productAction";
import {reduxLogin} from "@/redux/actions/userActions";



const HomeScreen = ({data}) => {
    const {products: seenProducts} = useSelector((state) => state.productsSeen)
    const [oppenedItems, setOppenedItems] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
        // dispatch(reduxLogin)
        if (oppenedItems) {
            dispatch(listSeenProducts(oppenedItems))
        }
    },[oppenedItems])
    useEffect(() => {
        // dispatch(listCategoryProducts(id))
        if (localStorage.getItem('oppenedItems')) {
            setOppenedItems(JSON.parse(localStorage.getItem("oppenedItems")))
        }


    }, [])
    return (
        <Container className='homescreen'>
            <div className='mainlady w-100'>
                {/*<Image src={mainlady} alt='Эротическая одежда'/>*/}
            </div>
            <div className="w-100 pt-1">
                    <div className='categories'>
                        <Link className='category category1' href='/category/Эротическая одежда'>
                            {/*<Image placeholder='blur' loading="lazy" src={erotic} alt='Эротическая одежда'/>*/}
                        </Link>
                        <Link className='category category2' href='/category/BDSM, садо-мазо товары'>
                            {/*<Image placeholder='blur' loading="lazy" src={bdsm} alt='BDSM, садо-мазо товары'/>*/}
                        </Link>
                        <Link className='category category3' href='/category/Смазки, лубриканты'>
                            {/*<Image placeholder='blur' loading="lazy" src={lubricants} alt='Смазки, лубриканты'/>*/}
                        </Link>
                        <Link className='category category4' href='/category/Анальные игрушки'>
                            {/*<Image placeholder='blur' loading="lazy" src={toys} alt='Анальные игрушки'/>*/}
                        </Link>
                        <Link className='category category5' href='/category/Приятные мелочи'>
                            {/*<Image placeholder='blur' loading="lazy" src={things} alt='Приятные мелочи'/>*/}
                        </Link>
                    </div>
            </div>
            <BannersCarousel/>
            <div className="w-100">
                <div className='categories2'>
                    <Link className='category category6' href='/category/Секс-мебель и качели'>
                        {/*<Image placeholder='blur' loading="lazy" src={sexmebel} alt='Секс-мебель и качели' className='h-auto'/>*/}
                    </Link>
                    <Link className='category category7' href='/category/Секс-товары для женщин'>
                        {/*<Image placeholder='blur' loading="lazy" src={women} alt='Секс-товары для женщин'/>*/}
                    </Link>
                    <Link className='category category11' href='/category/Секс-товары для женщин'>
                        {/*<Image placeholder='blur' loading="lazy" src={womenSmall} alt='Секс-товары для женщин'/>*/}
                    </Link>
                    <Link className='category category8' href='/category/Секс-товары для мужчин'>
                        {/*<Image placeholder='blur' loading="lazy" src={men} alt='Секс-товары для мужчин'/>*/}
                    </Link>
                    <Link className='category category9' href='/category/Нижнее белье'>
                        {/*<Image placeholder='blur' loading="lazy" src={nignee} alt='Нижнее белье'/>*/}
                    </Link>
                    <Link className='category category10' href='/category/Купальники'>
                        {/*<Image placeholder='blur' loading="lazy" src={kupalniki} alt='Купальники'/>*/}
                    </Link>
                </div>
            </div>
            {(oppenedItems && oppenedItems.length > 0 && seenProducts) &&
                <>
                    <div className='popular my-3'>
                        <span className='mx-3 fs-4'>Вы смотрели</span>
                        <div className='line'></div>
                    </div>
                    <SeenProductCarousel/>
                </>
            }
            <div className='popular my-3'>
                <span className='mx-3 fs-4'>Популярное</span>
                <div className='line'></div>
            </div>
            <ProductCarousel data={data}/>

        </Container>
    )
}


export default HomeScreen