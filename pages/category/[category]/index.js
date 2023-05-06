import Head from 'next/head'
import React from "react";
import {
    Row,
    Col,
    Container,
    Badge,
    FormCheck,
    Offcanvas,
    ListGroup,
    ListGroupItem,
    OffcanvasBody
} from 'react-bootstrap'
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
import {API_HOST, LOCATION} from "@/consts";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFilter} from "@fortawesome/free-solid-svg-icons";


const Category = ({pageProps}) => {
    const history = useRouter()
    // const id = history.query.id
    // const productList = useSelector((state) => state.categoryproduct);
    const category = pageProps.category
    let {
        error,
        loading,
        products,
        productsLength,
        subCategoriesList,
        page,
        pages,
        isSuperSale,
        vendorList,
        materialList,
    } = pageProps.data;
    const dispatch = useDispatch()
    // const [sort, setSort] = useState('')
    // const [priceSortUp, setPriceSortUp] = useState(false);
    // const [priceSortDown, setPriceSortDown] = useState(false);
    // const [nameSortDown, setNameSortDown] = useState(false);
    // const [nameSortUp, setNameSortUp] = useState(false);
    const [vendor, setVendor] = useState([])
    // const [collectionSelected, setCollectionSelected] = useState([])
    const [material, setMaterial] = useState([])
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
    const [isSuper, setIsSuper] = useState(isSuperSale)
    const newUrl = new URL(history.asPath, LOCATION)
    const searchParams = useSearchParams()
    useEffect(() => {
        if (localStorage.getItem('oppenedItems')) {
            setOppenedItems(JSON.parse(localStorage.getItem("oppenedItems")))
        }
        dispatch(listTopProducts())
        setVendor(searchParams.get('vendor'))
        setMaterial(searchParams.get('material'))


    }, [])
    // useEffect(() => {
    //     if (isSuper) {
    //         newUrl.searchParams.append('isSuperSale', '1')
    //     } else {
    //         newUrl.searchParams.delete('isSuperSale')
    //     }
    //     history.push(newUrl.href)
    // }, [isSuper])
    useEffect(() => {
        if (oppenedItems) {
            dispatch(listSeenProducts(oppenedItems))
        }


    }, [])

    const brCategory = `/category/${category}`
    const [show, setShow] = useState(false)
    const vendorRemove = () => {
        setVendor('')
        newUrl.searchParams.delete('vendor')
        history.push(newUrl.href)
    }
    const materialRemove = () => {
        setMaterial('')
        newUrl.searchParams.delete('material')
        history.push(newUrl.href)
    }

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
                    <div className='d-flex justify-content-between'>
                        <h1 className='text-start text-white'>{category}
                            {productsLength > 0 &&
                                <span className='prod-length pl-2'>{productsLength} товаров</span>}
                        </h1>
                        {(history.pathname.includes('/category') || history.pathname.includes('/search')) &&
                            <FontAwesomeIcon className='d-block d-md-none category-filter-icon my-auto mr-2 text-white'
                                             icon={faFilter}
                                             onClick={() => setShow(true)}/>
                        }
                    </div>
                    <Offcanvas
                        show={show}
                        placement='bottom'
                        onHide={() => setShow(false)}
                        className='h-75'
                    >
                        <Offcanvas.Header>
                            <Offcanvas.Title>Фильтры</Offcanvas.Title>
                        </Offcanvas.Header>
                        <OffcanvasBody>
                            <ListGroup>
                                <ListGroupItem>
                                    <span className='fw-bolder fs-5'>Категория</span> <br/>
                                    <span className='ml-5'>  {category}</span> <br/>
                                    {Object.keys(subCategoriesList).map((item) =>
                                        <ul key={item} className='lh-1'>
                                            <li>
                                                <Link href={'/category/' + category + '/' + item}
                                                      className='subCategory'>{item}</Link>
                                                <span
                                                    className='prod-length pl-2'>{subCategoriesList[item]}</span>
                                            </li>
                                        </ul>
                                    )}
                                    <br/>
                                </ListGroupItem>
                            </ListGroup>

                        </OffcanvasBody>
                    </Offcanvas>

                    <Row>
                        <Col xs={0} md={3} className='d-none d-md-block text-white'>
                            <p className='fw-bolder fs-5'>Категория</p>
                            <p className='ml-5'>  {category}</p>
                            {Object.keys(subCategoriesList).map((item) =>
                                <ul key={item}>
                                    <li>
                                        <Link href={'/category/' + category + '/' + item}
                                              className='subCategory'>{item}</Link>
                                        <span
                                            className='prod-length pl-2'>{subCategoriesList[item]}</span>
                                    </li>
                                </ul>
                            )}
                            <br/>
                            {/*<div className='d-flex justify-content-between'>*/}
                            {/*    <span>*/}
                            {/*    Распродажа</span>*/}
                            {/*    {console.log(isSuper)}*/}
                            {/*    {isSuper &&*/}
                            {/*        <FormCheck*/}
                            {/*        custom='true'*/}
                            {/*        id='isSusperSale'*/}
                            {/*        type='switch'*/}
                            {/*        сhecked={isSuper ? 'true' : ''}*/}
                            {/*        onChange={() => setIsSuper(!isSuper)}*/}
                            {/*        className=''></FormCheck>}*/}
                            {/*</div>*/}
                            <div className='d-flex justify-content-between'>
                                <span>Бренды</span>
                                {searchParams.get('vendor') &&
                                    <span
                                        onClick={vendorRemove}
                                    >
                                            X
                                        </span>}
                            </div>
                            <div className='d-inline-block' style={{'maxHeight': '150px', 'overflowY': 'scroll'}}>

                                {vendorList &&
                                    vendorList.map((ven) =>
                                        // eslint-disable-next-line react/jsx-key
                                        <Badge
                                            key={ven}
                                            bg={searchParams.get('vendor')===ven ? 'primary':'secondary'}
                                            className='mx-1'
                                            onClick={() => {
                                                if (history.asPath.includes('?')) {
                                                    history.push(history.asPath + '&vendor=' + ven)
                                                } else {
                                                    history.push(history.asPath + '?vendor=' + ven)
                                                }
                                            }}
                                        >
                                            {ven}
                                        </Badge>
                                    )
                                }
                            </div>
                            <div className='d-flex justify-content-between'>
                                <span>Материал</span>
                                {searchParams.get('material') &&
                                    <span
                                        onClick={materialRemove}
                                    >
                                            X
                                        </span>}
                            </div>

                            <div className='d-inline-block' style={{'maxHeight': '150px', 'overflowY': 'scroll'}}>

                                {materialList &&
                                    materialList.map((ven) =>
                                        // eslint-disable-next-line react/jsx-key
                                        <Badge
                                            key={ven}
                                            bg={searchParams.get('material')===ven ? 'primary':'secondary'}
                                            className='mx-1'
                                            onClick={() => {
                                                if (history.asPath.includes('?')) {
                                                    history.push(history.asPath + '&material=' + ven)
                                                } else {
                                                    history.push(history.asPath + '?material=' + ven)
                                                }
                                            }}
                                        >
                                            {ven}
                                        </Badge>
                                    )
                                }
                            </div>

                        </Col>
                        <Col xs={12} md={9}>
                            <div className="content">


                                <div>
                                    <Breadcrumb>
                                        <Breadcrumb.Item
                                            href='/'

                                        >
                                            <span className='breadcrump'>Главная</span>
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
                        <span className='mx-3 fs-4 text-white'>Вы смотрели</span>
                        <div className='line'></div>
                    </div>
                    <SeenProductCarousel/>
                </>
            }
            <div className='popular my-3'>
                <span className='mx-3 fs-4 text-white'>Популярное</span>
                <div className='line'></div>
            </div>
            <ProductCarousel data={pageProps.topData}/>
        </Container>

    )
}

export const getServerSideProps = async (context) => {
    let {category, page, keyword, isSuperSale, vendor, material} = context.query
    if (page) {
        page = '?page=' + page
    } else {
        page = ''
    }
    let res = {}
    let data = {'superSale': false, 'vendor': '', 'material': ''}
    if (isSuperSale) {
        data['superSale'] = true
        isSuperSale = true
    } else {
        isSuperSale = false
    }
    if (vendor) {
        data['vendor'] = vendor
    }
    if (material) {
        data['material'] = material
    }


    if (keyword && page) {
        res = await axios.post(`${API_HOST}/api/products/category/${category}${page}&keyword=${keyword}`, data);
    } else if (keyword && !page) {
        res = await axios.post(`${API_HOST}/api/products/category/${category}?keyword=${keyword}`, data);
    } else {
        keyword = null
        res = await axios.post(`${API_HOST}/api/products/category/${category}${page}`, data);
    }
    const topData = await axios.get(`${API_HOST}/api/products/top`);
    if (!res.data) {
        return {
            notFound: true,
        }
    }
    return {props: {data: res.data, topData: topData.data, category, keyword, isSuperSale}}
}

export default Category