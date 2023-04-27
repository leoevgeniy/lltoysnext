import Head from 'next/head'
import React from "react";
import {Row, Col, Container, Badge} from 'react-bootstrap'
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


const SubCategory = ({pageProps}) => {
    const subCategory = pageProps.subCategory
    const category = pageProps.category
    const {error, loading, products, page, pages} = pageProps.data;
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
    const history = useRouter()
    // const searchParams = useSearchParams();
    let keyword = pageProps.keyword
    useEffect(() => {
        if (localStorage.getItem('oppenedItems')) {
            setOppenedItems(JSON.parse(localStorage.getItem("oppenedItems")))
        }

    }, [])
    useEffect(() => {
        // dispatch(listCategoryProducts(id))
        dispatch(listTopProducts())

    }, [])
    useEffect(() => {
        if (oppenedItems) {
            dispatch(listSeenProducts(oppenedItems))
        }

    }, [dispatch, oppenedItems])
    const brCategory = `/category/${category}`
    const brSubCategory = `/category/${category}/${subCategory}`
    return (
        <Container>
            {loading ? (
                <Loader/>
            ) : error ? (
                    <Message variant="danger">{error}</Message>
                ) :
                <div>
                    <Head>
                        <title>{subCategory}</title>
                        <meta name='description' content={subCategory}/>
                        <meta name='keywords' content={subCategory}/>
                        <meta name='keywords'
                              content='sexshop, сексшоп, магазин интимных товаров для взрослых, секс игрушки, sex toys, интимшоп, интим шоп, intimshop, секс, вибратор, фаллоимитатор, вагина, фаллос, клитор, стимулятор, мастурбатор, куклы, эротическое белье'/>

                    </Head>
                    <div className="content justify-content-center">
                        {/*{(filter || category) ? (*/}

                        <h1 className='text-center'>{subCategory}</h1>
                        <div>
                            <Breadcrumb>
                                <Breadcrumb.Item
                                    href='/'
                                >
                                    Главная
                                </Breadcrumb.Item>
                                <Breadcrumb.Item
                                    href={brCategory}
                                >
                                    {category}
                                </Breadcrumb.Item>
                                <Breadcrumb.Item
                                    href={brSubCategory}
                                    active
                                >
                                    {subCategory}
                                </Breadcrumb.Item>
                            </Breadcrumb>
                            {keyword &&
                                <Badge>
                                    {keyword}
                                    <Badge onClick={()=> history.push(brSubCategory)}>
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
                                keyword={keyword ? brSubCategory+'?keyword='+keyword: brSubCategory}
                            />
                        </div>
                    </div>
                </div>
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
    let {category, page, keyword} = context.query
    let subCategory = context.params.id
    if (page) {page = '?page=' + page} else {page = ''}
    let res = {}

    if (keyword && page) {
        res = await axios.get(`${API_HOST}/api/products/category/${category}/${subCategory}${page}&keyword=${keyword}`);
    } else if (keyword && !page) {
        res = await axios.get(`${API_HOST}/api/products/category/${category}/${subCategory}?keyword=${keyword}`);

    }
    else {
        keyword = null
        res = await axios.get(`${API_HOST}/api/products/category/${category}/${subCategory}${page}`);}
    const topData = await axios.get(`${API_HOST}/api/products/top`);
    if (!res.data) {
        return {
            notFound: true,
        }
    }
    return {props: {data: res.data, topData: topData.data, category, subCategory, keyword}}
}

export default SubCategory