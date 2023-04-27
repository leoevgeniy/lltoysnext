import Head from 'next/head'
import React from "react";
import {Row, Col, Container, Badge, FormCheck} from 'react-bootstrap'
import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import Product from '@/components/Product'
import Paginate from '@/components/Paginate'
import Message from '@/components/Message'
import Loader from '@/components/Loader'
import {
    listCatalog,
    listTopProducts,
    listProducts,
    listCategoryProducts,
    listSeenProducts
} from '@/redux/actions/productAction'
import ProductCarousel from '@/components/ProductCarousel'
import SeenProductCarousel from '@/components/SeenProductCarousel'
import {useSearchParams} from "next/navigation";
import {PRODUCT_DETAILS_RESET} from '@/redux/types'
import {Router, useRouter, withRouter} from "next/router";
import ReactPaginate from 'react-paginate';
import App, {AppContext} from "next/app";
import axios from "axios";
import {API_HOST} from "@/consts";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Link from "next/link";


const Category = ({pageProps}) => {
    const history = useRouter()
    // const id = history.query.id
    // const productList = useSelector((state) => state.categoryproduct);
    const category = pageProps.category
    const {error, loading, products, productsLength, subCategoriesList, page, pages} = pageProps.data;
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
    // const searchParams = useSearchParams();
    let keyword = pageProps.keyword
    const [isSuperSale, setIsSuperSale] = useState(false)

    useEffect(() => {
        if (localStorage.getItem('oppenedItems')) {
            setOppenedItems(JSON.parse(localStorage.getItem("oppenedItems")))
        }
        dispatch(listTopProducts())


    }, [])
    useEffect(() => {
        console.log(isSuperSale, history.asPath)
        if (isSuperSale) {
            if (history.asPath.includes('?')) {history.push(history.asPath+'&isSuperSale=1')}
            else {history.push(history.asPath+'?isSuperSale=1')}
        } else {
            if (history.asPath.includes('isSuperSale')) {history.push(history.asPath.split('isSuperSale=')[0].slice(0,-1))}
        }
    }, [isSuperSale])
    useEffect(() => {
        if (oppenedItems) {
            dispatch(listSeenProducts(oppenedItems))
        }


    }, [dispatch, oppenedItems])
    const brCategory = `/category/${category}`
    return (
        <Container className='categ'>
            {loading ? (
                <Loader/>
            ) : error ? (
                    <Message variant="danger">{error}</Message>
                ) :
                <>
                    <Head>
                        <title>{category}</title>
                        <meta name='description' content={category}/>
                        <meta name='keywords' content={category}/>
                        <meta name='keywords'
                              content='sexshop, сексшоп, магазин интимных товаров для взрослых, секс игрушки, sex toys, интимшоп, интим шоп, intimshop, секс, вибратор, фаллоимитатор, вагина, фаллос, клитор, стимулятор, мастурбатор, куклы, эротическое белье'/>

                    </Head>
                    <h1 className='text-start'>{category}
                        {productsLength > 0 &&
                            <span className='prod-length pl-2'>{productsLength} товаров</span>}
                    </h1>

                    <Row>
                        <Col sm={0} md={3}>
                            <p className='fw-bolder fs-5'>Категория</p>
                            <p className='ml-5'>  {category}</p>
                            {Object.keys(subCategoriesList).map((item) =>
                                <ul key={item}>
                                    <li>
                                        <Link href={'/category/' + category + '/' + item}>{item}<span
                                            className='prod-length pl-2'>{subCategoriesList[item]}</span></Link>
                                    </li>
                                </ul>
                            )}
                            <br/>
                            <div className='d-flex justify-content-between'>
                            <span>
                                Распродажа</span>
                                <FormCheck type='switch' onChange={() => setIsSuperSale(!isSuperSale)} className=''></FormCheck>
                            </div>
                        </Col>
                        <Col sm={12} md={9}>
                            <div className="content">


                                <div>
                                    <Breadcrumb>
                                        <Breadcrumb.Item
                                            href='/'
                                        >
                                            Главная
                                        </Breadcrumb.Item>
                                        <Breadcrumb.Item
                                            href={brCategory}
                                            active
                                        >
                                            {category}
                                        </Breadcrumb.Item>

                                    </Breadcrumb>
                                    {products.length === 0 &&
                                        <span>К сожалению по Вашему запросу ничего не нашлось. <br/></span>

                                    }
                                    {keyword &&
                                        <Badge>
                                            {keyword}
                                            <Badge onClick={() => history.push(`/category/${category}`)}>
                                                x
                                            </Badge>

                                        </Badge>
                                    }

                                    <Row className='mb-4 mx-0 w-100 justify-content-center text-center'>
                                        {Array.from(products).map(
                                            (product) => (
                                                <Col
                                                    className='px-0'
                                                    key={product._id}
                                                    xs={12}
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
                                        keyword={keyword ? brCategory + '?keyword=' + keyword : brCategory}
                                    />
                                </div>
                            </div>
                        </Col>
                    </Row>
                </>
            }

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
            <ProductCarousel data={pageProps.topData}/>
        </Container>

    )
}

export const getServerSideProps = async (context) => {
    console.log(context)
    let {category, page, keyword, isSuperSale} = context.query
    if (page) {
        page = '?page=' + page
    } else {
        page = ''
    }
    let res = {}
    let data = {}
    let superSale = ''
    if (isSuperSale) {
        if (context.resolvedUrl.includes('?')) {superSale = `&isSuperSale=1`}
        else {superSale = `?isSuperSale=1`}
    }
    if (keyword && page) {
        res = await axios.get(`${API_HOST}/api/products/category/${category}${page}&keyword=${keyword}${superSale}`);
    } else if (keyword && !page) {
        res = await axios.get(`${API_HOST}/api/products/category/${category}?keyword=${keyword}${superSale}`);
    } else {
        keyword = null
        console.log(superSale)
        res = await axios.get(`${API_HOST}/api/products/category/${category}${page}${superSale}`);
    }
    const topData = await axios.get(`${API_HOST}/api/products/top`);
    if (!res.data) {
        return {
            notFound: true,
        }
    }
    return {props: {data: res.data, topData: topData.data, category, keyword}}
}

export default Category