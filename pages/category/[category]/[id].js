import Head from 'next/head'
import React from "react";
import {
    Row,
    Col,
    Container,
    Badge,
    Offcanvas,
    OffcanvasBody,
    ListGroup,
} from 'react-bootstrap'
import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import Product from '@/components/Product'
import Paginate from '@/components/Paginate'
import Message from '@/components/Message'
import Loader from '@/components/Loader'
import {
    listTopProducts,
    listSeenProducts
} from '@/redux/actions/productAction'
import ProductCarousel from '@/components/ProductCarousel'
import SeenProductCarousel from '@/components/SeenProductCarousel'
import {useSearchParams} from "next/navigation";
import {useRouter} from "next/router";
import axios from "axios";
import {API_HOST, LOCATION} from "@/consts";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFilter} from "@fortawesome/free-solid-svg-icons";
import RangePriceSlider from "@/components/RangePriceSlider";
import PriceSlider from "@/components/PriceSlider";

const SubCategory = ({pageProps}) => {
    const subCategory = pageProps.subCategory
    const category = pageProps.category
    const [loading, setLoading] = useState(false)
    const {
        error,
        products,
        productsLength,
        subCategoriesList,
        vendorList,
        materialList,
        colorList,
        collectionList,
        sizeList,
        maxPrice,
        page,
        pages
    } = pageProps.data;
    const {lowprice, highprice} = pageProps
    const dispatch = useDispatch()
    const [vendor, setVendor] = useState('')
    const [collection, setCollection] = useState([])
    const [material, setMaterial] = useState([])
    const [color, setColor] = useState([])
    const [size, setSize] = useState([])
    const {products: seenProducts} = useSelector((state) => state.productsSeen)
    const [oppenedItems, setOppenedItems] = useState([])
    const history = useRouter()
    let keyword = pageProps.keyword
    const newUrl = new URL(history.asPath, LOCATION)
    useEffect(() => {
        if (localStorage.getItem('oppenedItems')) {
            setOppenedItems(JSON.parse(localStorage.getItem("oppenedItems")))
        }
        dispatch(listTopProducts())
        setVendor(searchParams.get('vendor'))


    }, [])
    // useEffect(() => {
    //     if (!loading) {
    //         setCurrentRange([0, maxPrice.toFixed(0)])
    //     }
    // }, [loading])

    useEffect(() => {
        if (oppenedItems) {
            dispatch(listSeenProducts(oppenedItems))
        }

    }, [])
    const brCategory = `/category/${category}`
    const brSubCategory = `/category/${category}/${subCategory}`
    const [show, setShow] = useState(false)
    const searchParams = useSearchParams()
    const vendorRemove = () => {
        setCurrentRange([0, maxPrice.toFixed(0)])
        setLoading(true)
        setVendor('')
        newUrl.searchParams.delete('vendor')
        setShow(false)

        history.replace(newUrl.href, undefined, {scroll: false}).then()
    }
    const materialRemove = () => {
        setCurrentRange([0, maxPrice.toFixed(0)])
        setMaterial('')
        newUrl.searchParams.delete('material')
        setShow(false)
        setLoading(true)
        history.replace(newUrl.href, undefined, {scroll: false})
    }
    const collectionRemove = () => {
        setCurrentRange([0, maxPrice.toFixed(0)])
        setCollection('')
        newUrl.searchParams.delete('collection')
        setShow(false)
        setLoading(true)
        history.replace(newUrl.href, undefined, {scroll: false})
    }
    const colorRemove = () => {
        setCurrentRange([0, maxPrice.toFixed(0)])
        setColor('')
        newUrl.searchParams.delete('color')
        setShow(false)
        setLoading(true)
        history.replace(newUrl.href, undefined, {scroll: false})
    }
    const sizeRemove = () => {
        setCurrentRange([0, maxPrice.toFixed(0)])
        setSize('')
        newUrl.searchParams.delete('size')
        setShow(false)
        setLoading(true)
        history.replace(newUrl.href, undefined, {scroll: false})
    }
    const [currentRange, setCurrentRange] = useState([lowprice, highprice])

    useEffect(() => {
        setLoading(pageProps.isLoading)
        if (highprice === 1000000) {
            setCurrentRange([lowprice, maxPrice.toFixed(0)])
        } else {
            setCurrentRange([lowprice, highprice])
        }
    }, [pageProps])
    useEffect(() => {
        if (highprice === 1000000) {
            setCurrentRange([lowprice, maxPrice.toFixed(0)])
        } else {
            setCurrentRange([lowprice, highprice])
        }
    }, [lowprice, highprice])

    const Filters = () => {

        return (
            <>
                {vendorList[0] &&
                    <div className='d-flex justify-content-between'>
                        <span>Бренд</span>
                        {searchParams.get('vendor') &&
                            <Badge
                                className=''
                                bg='secondary'
                                as='button'
                                onClick={() => {
                                    setLoading(true)
                                    vendorRemove()
                                }}
                            >
                                X
                            </Badge>}
                    </div>
                }
                <div className='d-inline-block' style={{'maxHeight': '100px', 'overflowY': 'scroll'}}>

                    {vendorList[0] &&
                        vendorList.map((ven) =>
                            // eslint-disable-next-line react/jsx-key
                            <Badge
                                key={ven}
                                as='button'
                                bg={searchParams.get('vendor') === ven ? 'primary' : 'secondary'}
                                className='mx-1'
                                onClick={() => {
                                    setCurrentRange([0, maxPrice.toFixed(0)])
                                    setLoading(true)
                                    if (history.asPath.includes('?')) {

                                        history.replace(history.asPath + '&vendor=' + ven, undefined, {scroll: false})
                                    } else {
                                        history.replace(history.asPath + '?vendor=' + ven, undefined, {scroll: false})
                                    }
                                    setShow(false)
                                }}
                            >
                                {ven}
                            </Badge>
                        )
                    }
                </div>
                {materialList[0] &&
                    <div className='d-flex justify-content-between'>
                        <span>Материал</span>
                        {searchParams.get('material') &&
                            <Badge
                                className=''
                                bg='secondary'
                                as='button'
                                onClick={materialRemove}
                            >
                                X
                            </Badge>}
                    </div>
                }
                <div className='d-inline-block' style={{'maxHeight': '100px', 'overflowY': 'scroll'}}>

                    {materialList[0] &&
                        materialList.map((ven) =>
                            // eslint-disable-next-line react/jsx-key
                            <Badge
                                key={ven}
                                as='button'
                                bg={searchParams.get('material') === ven ? 'primary' : 'secondary'}
                                className='mx-1'
                                onClick={() => {
                                    setCurrentRange([0, maxPrice.toFixed(0)])
                                    setLoading(true)
                                    if (history.asPath.includes('?')) {
                                        history.replace(history.asPath + '&material=' + ven, undefined, {scroll: false})
                                    } else {
                                        history.replace(history.asPath + '?material=' + ven, undefined, {scroll: false})
                                    }
                                    setShow(false)

                                }}
                            >
                                {ven}
                            </Badge>
                        )
                    }
                </div>
                {colorList[0] &&
                    <div className='d-flex justify-content-between'>
                        <span>Цвета</span>
                        {searchParams.get('color') &&
                            <Badge
                                className=''
                                bg='secondary'
                                as='button'
                                onClick={colorRemove}
                            >
                                X
                            </Badge>}
                    </div>
                }
                <div className='d-inline-block' style={{'maxHeight': '100px', 'overflowY': 'scroll'}}>

                    {colorList[0] &&
                        colorList.map((ven) =>
                            // eslint-disable-next-line react/jsx-key
                            <Badge
                                key={ven}
                                as='button'
                                bg={searchParams.get('color') === ven ? 'primary' : 'secondary'}
                                className='mx-1'
                                onClick={() => {
                                    setCurrentRange([0, maxPrice.toFixed(0)])
                                    setLoading(true)
                                    if (history.asPath.includes('?')) {
                                        history.replace(history.asPath + '&color=' + ven, undefined, {scroll: false})
                                    } else {
                                        history.replace(history.asPath + '?color=' + ven, undefined, {scroll: false})
                                    }
                                    setShow(false)

                                }}
                            >
                                {ven}
                            </Badge>
                        )
                    }
                </div>
                {sizeList[0] &&
                    <div className='d-flex justify-content-between'>
                        <span>Размеры</span>
                        {searchParams.get('size') &&
                            <Badge
                                className=''
                                bg='secondary'
                                as='button'
                                onClick={sizeRemove}
                            >
                                X
                            </Badge>}
                    </div>
                }
                <div className='d-inline-block' style={{'maxHeight': '100px', 'overflowY': 'scroll'}}>

                    {sizeList[0] &&
                        sizeList.map((ven) =>
                            // eslint-disable-next-line react/jsx-key
                            <Badge
                                key={ven}
                                as='button'
                                bg={searchParams.get('size') === ven ? 'primary' : 'secondary'}
                                className='mx-1'
                                onClick={() => {
                                    setCurrentRange([0, maxPrice.toFixed(0)])
                                    setLoading(true)
                                    if (history.asPath.includes('?')) {
                                        history.replace(history.asPath + '&size=' + ven, undefined, {scroll: false})
                                    } else {
                                        history.replace(history.asPath + '?size=' + ven, undefined, {scroll: false})
                                    }
                                    setShow(false)

                                }}
                            >
                                {ven}
                            </Badge>
                        )
                    }
                </div>
                {collectionList[0] &&
                    <div className='d-flex justify-content-between'>
                        <span>Коллекции</span>
                        {searchParams.get('collection') &&
                            <Badge
                                className=''
                                bg='secondary'
                                as='button'
                                onClick={collectionRemove}
                            >
                                X
                            </Badge>}
                    </div>
                }
                <div className='d-inline-block' style={{'maxHeight': '100px', 'overflowY': 'scroll'}}>

                    {collectionList[0] &&
                        collectionList.map((ven) =>
                            // eslint-disable-next-line react/jsx-key
                            <Badge
                                key={ven}
                                as='button'
                                bg={searchParams.get('collection') === ven ? 'primary' : 'secondary'}
                                className='mx-1'
                                onClick={() => {
                                    setCurrentRange([0, maxPrice.toFixed(0)])
                                    setLoading(true)
                                    if (history.asPath.includes('?')) {
                                        history.replace(history.asPath + '&collection=' + ven, undefined, {scroll: false})
                                    } else {
                                        history.replace(history.asPath + '?collection=' + ven, undefined, {scroll: false})
                                    }
                                    setShow(false)

                                }}
                            >
                                {ven}
                            </Badge>
                        )
                    }
                </div>
                {loading ? (
                    <Loader/>
                ) : error ? (
                        <Message variant="danger">{error}</Message>
                    ) : (maxPrice && maxPrice >0) &&
                    <div className='slid'>
                        <div className='d-flex justify-content-between'>
                            <span>Цена</span>
                            {(currentRange[0] !== 0 || currentRange[1] !== maxPrice.toFixed(0)) &&
                                <Badge
                                    className=''
                                    bg='secondary'
                                    as='button'
                                    onClick={() => {
                                        setLoading(true)
                                        newUrl.searchParams.delete('lowprice')
                                        newUrl.searchParams.delete('highprice')
                                        setCurrentRange([0, maxPrice.toFixed(0)])
                                        history.replace(newUrl.href, undefined, {scroll: false})
                                    }}
                                >
                                    X
                                </Badge>}
                        </div>
                        <PriceSlider
                            maxPrice={maxPrice.toFixed(0)}
                            priceRange={currentRange}
                            setPriceRange={setCurrentRange}
                            setLoading={setLoading}
                            setShow={setShow}
                            // setPriceRangeCanvasShow={setPriceRangeCanvasShow}
                        />
                        {/*<RangePriceSlider*/}
                        {/*    min={currentRange[0]}*/}
                        {/*    max={currentRange[1]}*/}
                        {/*    maxPrice={maxPrice.toFixed(0)}*/}
                        {/*    onChange={({min, max}) => {*/}
                        {/*        setLoading(true)*/}
                        {/*        newUrl.searchParams.delete('lowprice')*/}
                        {/*        newUrl.searchParams.delete('highprice')*/}
                        {/*        setCurrentRange([lowprice, highprice <= maxPrice.toFixed(0) ? highprice : maxPrice.toFixed(0)])*/}
                        {/*        if (newUrl.href.includes('?')) {*/}
                        {/*            history.replace(newUrl.href + '&lowprice=' + min + '&highprice=' + max, undefined, {scroll: false}).then()*/}
                        {/*        } else {*/}
                        {/*            history.replace(newUrl.href + '?lowprice=' + min + '&highprice=' + max, undefined, {scroll: false}).then()*/}
                        {/*        }*/}

                        {/*    }}/>*/}
                    </div>
                }


            </>
        )
    }

    // console.log(currentRange, lowprice, highprice, maxPrice)
    const clearFilters = () => {
        setLoading(true)
        setShow(false)
        setVendor('')
        setCurrentRange([0, maxPrice.toFixed(0)])
        newUrl.searchParams.delete('vendor')
        setMaterial('')
        newUrl.searchParams.delete('material')
        setCollection('')
        newUrl.searchParams.delete('collection')
        setColor('')
        newUrl.searchParams.delete('color')
        setSize('')
        newUrl.searchParams.delete('size')
        newUrl.searchParams.delete('lowprice')
        newUrl.searchParams.delete('highprice')
        history.replace(newUrl.href, undefined, {scroll: false})

    }
    return (
        <Container className='categ'>

            <div>
                <Head>
                    <title>{subCategory}</title>
                    <meta name='description' content={subCategory}/>
                    <meta name='keywords' content={subCategory}/>
                    <meta name='keywords'
                          content='sexshop, сексшоп, магазин интимных товаров для взрослых, секс игрушки, sex toys, интимшоп, интим шоп, intimshop, секс, вибратор, фаллоимитатор, вагина, фаллос, клитор, стимулятор, мастурбатор, куклы, эротическое белье'/>

                </Head>
                <div className="content justify-content-center">
                    <div className='d-flex justify-content-between'>

                        <h1 className='text-start text-white'>{subCategory}
                            {productsLength > 0 &&
                                <span className='prod-length pl-2'>{productsLength} товаров</span>}

                        </h1>
                        {(history.pathname.includes('/category') || history.pathname.includes('/search')) &&
                            <FontAwesomeIcon
                                className='d-block d-md-none category-filter-icon my-auto mr-2 text-white'
                                icon={faFilter}
                                onClick={() => setShow(true)}/>
                        }
                    </div>
                    <Offcanvas
                        show={show}
                        placement='bottom'
                        onHide={() => setShow(false)}
                        style={{height: '90%'}}

                    >
                        <Offcanvas.Header style={{backgroundColor: '#e5097f', color: 'white'}} className={'my-0 py-0'}>
                            <Offcanvas.Title className='w-100'>
                                <span>Фильтры</span>
                                {(searchParams.get('material') || searchParams.get('vendor') || searchParams.get('collection')
                                    || searchParams.get('color') || searchParams.get('size') || searchParams.get('lowprice') ||
                                    searchParams.get('highprice')) ?
                                    <Badge as='button' bg='secondary' onClick={() => {
                                        clearFilters()
                                    }} className='float-end'>Отмена</Badge> : ''}
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <OffcanvasBody className={'my-0 py-0'}
                                       style={{background: '#e5097f linear-gradient(#e5097f, rgb(0 0 0))'}}>
                            <ListGroup className='text-white mh-25'>
                                <span className='fw-bolder fs-5'>Категория</span>
                                <span><Link href={`/category/${category}`} onClick={() => setShow(false)}
                                            className='ml-5 text-white mb-0'>  {category}</Link>
                                        </span>
                                <ul className='lh-1 text-white ' style={{'maxHeight': '50px', 'overflowY': 'scroll'}}>

                                    {Object.keys(subCategoriesList).map((item, i) =>
                                        <li key={i}>
                                            <Link href={'/category/' + category + '/' + item}
                                                  onClick={() => setShow(false)}
                                                  className={item === subCategory ? 'text-decoration-none subCategory text-white' : 'subCategory text-white'}> {item}</Link>
                                            <span
                                                className='prod-length pl-2 text-light'>{subCategoriesList[item]}</span>
                                        </li>
                                    )}
                                </ul>
                                <br/>
                            </ListGroup>
                            <ListGroup>
                                <Filters/>
                            </ListGroup>
                        </OffcanvasBody>
                    </Offcanvas>

                    <Row>
                        <Col sm={0} md={3} className='d-none d-md-block text-white'>
                            <p className='fw-bolder fs-5 text-white'>Категория</p>
                            <p><Link href={`/category/${category}`} className='ml-5 text-white'>  {category}</Link>
                            </p>
                            <p className='ml-8 text-white'>{subCategory}</p>
                            <ul>

                                {subCategoriesList && Object.keys(subCategoriesList).map((item) =>
                                    <li key={item}>
                                        <Link href={'/category/' + category + '/' + item}
                                              className='subCategory'> {item}</Link>
                                        <span
                                            className='prod-length pl-2'>{subCategoriesList[item]}</span>
                                    </li>
                                )}
                            </ul>
                            <br/>
                            <Filters/>

                        </Col>
                        <Col sm={12} md={9}>
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
                                        <Badge onClick={() => history.push(brSubCategory)}>
                                            x
                                        </Badge>
                                    </Badge>
                                }
                                {loading ? (
                                    <Loader/>
                                ) : error ? (
                                        <Message variant="danger">{error}</Message>
                                    ) :
                                    <>
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
                                            keyword={keyword ? brSubCategory + '?keyword=' + keyword : brSubCategory}
                                        />
                                    </>
                                }
                            </div>
                        </Col>
                    </Row>
                </div>

            </div>


            <div className='popular my-3'>
                <span className='mx-3 fs-4 text-white'>Распродажа</span>
                <div className='line'></div>
            </div>
            <ProductCarousel data={pageProps.topData}/>
            {(oppenedItems && oppenedItems.length > 0 && seenProducts) &&
                <>
                    <div className='popular my-3'>
                        <span className='mx-3 fs-4 text-white'>Вы смотрели</span>
                        <div className='line'></div>
                    </div>
                    <SeenProductCarousel/>
                </>
            }
        </Container>

    )


}

export const getServerSideProps = async (context) => {
    let {
        category,
        page,
        keyword,
        isSuperSale,
        vendor,
        material,
        collection,
        color,
        size,
        lowprice,
        highprice
    } = context.query

    let subCategory = context.params.id
    if (page) {
        page = '?page=' + page
    } else {
        page = ''
    }
    let itemsList = []
    let res = {}
    let data = {
        'superSale': false,
        'vendor': '',
        'material': '',
        'collection': '',
        'color': '',
        'size': '',
        'lowprice': 0,
        'highprice': 0
    }
    if (lowprice) {
        data['lowprice'] = Number(lowprice)
    } else {
        lowprice = 0
        data['lowprice'] = 0

    }
    if (highprice) {
        data['highprice'] = Number(highprice)
    } else {
        highprice = 1000000
        data['highprice'] = Number(1000000)

    }
    if (collection) {
        data['collection'] = collection
    }
    if (color) {
        data['color'] = color
    }
    if (size) {
        data['size'] = size
    }
    if (isSuperSale) {
        data['superSale'] = true
    }
    if (vendor) {
        data['vendor'] = vendor
    }
    if (material) {
        data['material'] = material
    }
    let isLoading = true
    if (keyword && page) {
        res = await axios.post(`${API_HOST}/api/products/category/${category}/${subCategory}${page}&keyword=${keyword}`, data).then();
    } else if (keyword && !page) {
        res = await axios.post(`${API_HOST}/api/products/category/${category}/${subCategory}?keyword=${keyword}`, data);

    } else {
        keyword = null
        res = await axios.post(`${API_HOST}/api/products/category/${category}/${subCategory}${page}`, data);
    }
    const topData = await axios.get(`${API_HOST}/api/products/top`);
    if (!res.data) {
        return {
            notFound: true,
        }
    } else {
        isLoading = false
    }
    return {
        props: {
            data: res.data,
            topData: topData.data,
            category,
            subCategory,
            keyword,
            isLoading,
            lowprice,
            highprice
        }
    }
}

export default SubCategory