import Head from 'next/head'
import React from "react";
import {Row, Col, Container, Badge} from 'react-bootstrap'
import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import Product from '@/components/Product'
import Paginate from '@/components/Paginate'
import {
    listTopProducts,
    listSeenProducts
} from '@/redux/actions/productAction'
import ProductCarousel from '@/components/ProductCarousel'
import SeenProductCarousel from '@/components/SeenProductCarousel'
import {useSearchParams} from "next/navigation";
import {useRouter} from "next/router";
import axios from "axios";
import {API_HOST} from "@/consts";
import Link from "next/link";


const Search = ({pageProps}) => {
    const history = useRouter()
    // const id = history.query.id
    // const productList = useSelector((state) => state.categoryproduct);
    // const category = pageProps.category
    // const {data: products} = pageProps
    const {categoryList, subCategoryList, products, page, pages} = pageProps.data;
    const dispatch = useDispatch()
    // const [sort, setSort] = useState('')
    // const [priceSortUp, setPriceSortUp] = useState(false);
    // const [priceSortDown, setPriceSortDown] = useState(false);
    // const [nameSortDown, setNameSortDown] = useState(false);
    // const [nameSortUp, setNameSortUp] = useState(false);
    // const [vendorSelected, setVendorSelected] = useState([])
    // const [collectionSelected, setCollectionSelected] = useState([])
    // const [materialSelected, setMaterialSelected] = useState([])
    // const [colorSelected, setColorSelected] = useState([])
    // const [sizeSelected, setSizeSelected] = useState([])
    // const [categorySelected, setCategorySelected] = useState([])
    // const [vendorCanvasShow, setVendorCanvasShow] = useState(false)
    // const [collectionCanvasShow, setCollectionCanvasShow] = useState(false)
    // const [materialCanvasShow, setMaterialCanvasShow] = useState(false)
    // const [sizeCanvasShow, setSizeCanvasShow] = useState(false)
    // const [colorCanvasShow, setColorCanvasShow] = useState(false)
    // const [priceRangeCanvasShow, setPriceRangeCanvasShow] = useState(false)
    const {products: seenProducts} = useSelector((state) => state.productsSeen)
    const [oppenedItems, setOppenedItems] = useState([])
    // const [priceRange, setPriceRange] = useState([])
    // const [priceLow, setPriceLow] = useState(productList.priceLowApi)
    // const [priceUp, setPriceUp] = useState(productList.priceUpApi)
    const searchParams = useSearchParams();

    let keyword = searchParams.get('keyword')
    let supersale = searchParams.get('supersale')
    let bestseller = searchParams.get('bestsellers')
    let novelties = searchParams.get('novelties')
    let paginPath = ''
    if (supersale) {
        paginPath = 'search?supersale=1'
    } else if (bestseller) {
        paginPath = 'search?bestsellers=1'
    } else if (novelties) {
        paginPath = 'search?novelties=1'
    } else {
        paginPath = 'search?keyword='+keyword
    }
    //
    useEffect(() => {
        if (localStorage.getItem('oppenedItems')) {
            setOppenedItems(JSON.parse(localStorage.getItem("oppenedItems")))
        }
        dispatch(listTopProducts())


    }, [])
    useEffect(() => {
        if (oppenedItems) {
            dispatch(listSeenProducts(oppenedItems))
        }

    }, [dispatch, oppenedItems])
    const brCategory = `/search?keyword=${keyword}`
    return (
        <Container>
            {/*{loading ? (*/}
            {/*    <Loader/>*/}
            {/*) : error ? (*/}
            {/*        <Message variant="danger">{error}</Message>*/}
            {/*    ) :*/}
            <>
                <Head>
                    {/*<title>{category}</title>*/}
                    {/*<meta name='description' content={category}/>*/}
                    {/*<meta name='keywords' content={category}/>*/}
                    <meta name='keywords'
                          content='sexshop, сексшоп, магазин интимных товаров для взрослых, секс игрушки, sex toys, интимшоп, интим шоп, intimshop, секс, вибратор, фаллоимитатор, вагина, фаллос, клитор, стимулятор, мастурбатор, куклы, эротическое белье'/>

                </Head>
                <div className="content justify-content-center text-white">
                    {products.length > 0 ?
                        <div className='d-inline-block'>
                            {/*<span className='mb-2'> Найдено <strong>{categoryList[Object.keys(categoryList)[0]]}</strong> в категории <Link*/}
                            {/*href={'/category/' + Object.keys(categoryList)[0] + '?keyword=' + keyword}>{Object.keys(categoryList)[0]}</Link><br/> </span>*/}
                            {/*<span> <strong>{subCategoryList[Object.keys(subCategoryList)[0]]}</strong> в категории <Link*/}
                            {/*    href={'/category/' + Object.keys(categoryList)[0] + '/' + Object.keys(subCategoryList)[0] + '?keyword=' + keyword}>{Object.keys(subCategoryList)[0]}</Link><br/></span>*/}
                            {keyword &&
                                <Badge>
                                {keyword}
                                <Badge onClick={() => history.push(`/`)}>
                                    x
                                </Badge>

                            </Badge>}
                            {bestseller &&
                                <Badge>
                                Хиты продаж
                                <Badge onClick={() => history.push(`/`)}>
                                    x
                                </Badge>

                            </Badge>}
                            {supersale &&
                                <Badge>
                                Распродажа
                                <Badge onClick={() => history.push(`/`)}>
                                    x
                                </Badge>

                            </Badge>}
                            {novelties &&
                                <Badge>
                                Новинки
                                <Badge onClick={() => history.push(`/`)}>
                                    x
                                </Badge>

                            </Badge>}

                        </div>
                        : <span>К сожалению по Вашему запросу ничего не нашлось.</span>
                    }
                    <div>
                        {/*                <Breadcrumb>*/}
                        {/*                    <Breadcrumb.Item*/}
                        {/*                        href='/'*/}
                        {/*                    >*/}
                        {/*                        Главная*/}
                        {/*                    </Breadcrumb.Item>*/}
                        {/*                    <Breadcrumb.Item*/}
                        {/*                        href={brCategory}*/}
                        {/*                        active*/}
                        {/*                    >*/}
                        {/*                        {category}*/}
                        {/*                    </Breadcrumb.Item>*/}

                        {/*                </Breadcrumb>*/}
                        <Row className='mb-4 mx-0 w-100 justify-content-center text-center  text-white'>
                            {Array.from(products).map(
                                (product) => (
                                    <Col
                                        className='px-0'
                                        key={product._id}
                                        xs={6}
                                        sm={6}
                                        md={4}
                                        lg={3}
                                        xl={3}
                                    >
                                        <Product
                                            product={product}
                                        />
                                    </Col>
                                )
                            )}
                        </Row>
                        <Paginate
                            className='mt-2'
                            page={page}
                            pages={pages}
                            keyword={paginPath}
                        />
                    </div>
                </div>
            </>
            {/*}*/}

            {(oppenedItems && oppenedItems.length > 0 && seenProducts) &&
                <>
                    <div className='popular my-3'>
                        <span className='mx-3 fs-4  text-white'>Вы смотрели</span>
                        <div className='line'></div>
                    </div>
                    <SeenProductCarousel/>
                </>
            }
            {/*<div className='popular my-3'>*/}
            {/*    <span className='mx-3 fs-4  text-white'>Распродажа</span>*/}
            {/*    <div className='line'></div>*/}
            {/*</div>*/}
            {/*<ProductCarousel data={pageProps.topData}/>*/}
        </Container>

    )
}

export const getServerSideProps = async (context) => {
    let {keyword, page, novelties, supersale, bestsellers} = context.query
    let res = {}
    let data = {'supersale': false, 'novelties' : false, 'bestsellers': false}
    if (supersale) {
        data['supersale'] = true
    }
    if (novelties) {
        data['novelties'] = true
    }
    if (bestsellers) {
        data['bestsellers'] = true
    }
    if (keyword) {
        keyword = '?keyword='+keyword
    } else{keyword=''}
    // if (!page) {page=''}
    if (page) {
        if (keyword) {
            page = '&page='+page
        } else {
            page = '?page='+page
        }
    } else {
        page =''
    }
    res = await axios.post(`${API_HOST}/api/products/${keyword}${page}`, data);
    const topData = await axios.get(`${API_HOST}/api/products/top`);
    if (!topData) {
        return {
            notFound: true,
        }
    }

    return {props: {data: res.data, topData: topData.data}}


}

export default Search