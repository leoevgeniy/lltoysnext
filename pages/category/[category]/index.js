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


const Category = ({pageProps}) => {
    const history = useRouter()
    // const id = history.query.id
    // const productList = useSelector((state) => state.categoryproduct);
    const [loading, setLoading] = useState(false)

    const category = pageProps.category
    let {
        error,
        products,
        productsLength,
        subCategoriesList,
        page,
        pages,
        isSuperSale,
        vendorList,
        materialList,
        colorList,
        collectionList,
        sizeList,
        maxPrice
    } = pageProps.data;
    const dispatch = useDispatch()
    const [vendor, setVendor] = useState([])
    const [collection, setCollection] = useState([])
    const [material, setMaterial] = useState([])
    const [color, setColor] = useState([])
    const [size, setSize] = useState([])
    const {products: seenProducts} = useSelector((state) => state.productsSeen)
    const [oppenedItems, setOppenedItems] = useState([])
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
    useEffect(() => {
        if (!loading) {
            setCurrentRange([0, maxPrice.toFixed(0)])
        }
    },[loading])
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
        setShow(false)
        setLoading(true)
        history.replace(newUrl.href, undefined, {scroll: false}).then()
    }
    const materialRemove = () => {
        setMaterial('')
        newUrl.searchParams.delete('material')
        setShow(false)
        setLoading(true)
        history.replace(newUrl.href, undefined, {scroll: false})
    }
    const collectionRemove = () => {
        setCollection('')
        newUrl.searchParams.delete('collection')
        setShow(false)
        setLoading(true)
        history.replace(newUrl.href, undefined, {scroll: false})
    }
    const colorRemove = () => {
        setColor('')
        newUrl.searchParams.delete('color')
        setShow(false)
        setLoading(true)
        history.replace(newUrl.href, undefined, {scroll: false})
    }
    const sizeRemove = () => {
        setSize('')
        newUrl.searchParams.delete('size')
        setShow(false)
        setLoading(true)
        history.replace(newUrl.href, undefined, {scroll: false})
    }
    const [localMaxPrice, setLocalMaxPrice] = useState(maxPrice.toFixed(0))
    useEffect(() => {
        setLoading(pageProps.isLoading)
    }, [pageProps])
    const [currentRange, setCurrentRange] = useState([0, maxPrice.toFixed(0)])
    const clearFilters = () => {
        setLoading(true)
        setShow(false)
        setVendor('')
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
                                    setShow(false)
                                    history.replace(newUrl.href, undefined, {scroll: false})
                                }}
                            >
                                X
                            </Badge>}
                    </div>

                    <RangePriceSlider
                        min={currentRange[0]}
                        max={currentRange[1]}
                        maxPrice={localMaxPrice}
                        onChange={({min, max}) => {
                            setLoading(true)
                            newUrl.searchParams.delete('lowprice')
                            newUrl.searchParams.delete('highprice')
                            setCurrentRange([min, max])
                            if (newUrl.href.includes('?')) {
                                history.replace(newUrl.href + '&lowprice=' + min + '&highprice=' + max, undefined, {scroll: false}).then()
                            } else {
                                history.replace(newUrl.href + '?lowprice=' + min + '&highprice=' + max, undefined, {scroll: false}).then()
                            }
                            setShow(false)
                        }}/>
                </div>


            </>
        )
    }

    return (
        <Container className='categ'>

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
                    style={{height: '90%'}}
                >
                    <Offcanvas.Header style={{backgroundColor: '#e5097f', color: 'white'}}>
                        <Offcanvas.Title className='mb-0 pb-0'>Фильтры</Offcanvas.Title>
                        {(searchParams.get('material') || searchParams.get('vendor') || searchParams.get('collection')
                            || searchParams.get('color') || searchParams.get('size') || searchParams.get('lowprice') ||
                            searchParams.get('highprice')) ?
                            <Badge as='button' bg='secondary' onClick={() => {
                                clearFilters()
                            }} className='float-end'>Отмена</Badge> : ''}

                    </Offcanvas.Header>
                    <OffcanvasBody
                        style={{background: '#e5097f linear-gradient(#e5097f, rgb(0 0 0))', lineHeight: '15px'}}>
                        <ListGroup className='text-white mh-25' style={{lineHeight: '18px'}}>
                            <span className='fw-bolder fs-5'>Категория</span>
                            <span className='ml-5'>  {category}</span>
                            <div style={{'maxHeight': '100px', 'overflowY': 'scroll'}}>
                                {Object.keys(subCategoriesList).map((item) =>
                                    <ul key={item} style={{lineHeight: '10px', marginBottom: '0.5rem'}}>
                                        <li>
                                            <Link href={'/category/' + category + '/' + item}
                                                  className={'subCategory text-white lh-1'}>{item}</Link>
                                            <span
                                                className='prod-length pl-2'>{subCategoriesList[item]}</span>
                                        </li>
                                    </ul>
                                )}
                            </div>
                            <Filters/>
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
                        <Filters/>
                    </Col>
                    {loading ? (
                        <Loader/>
                    ) : error ? (
                            <Message variant="danger">{error}</Message>
                        ) :
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
                        </Col>}
                </Row>
            </>


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
    let {
        category, page, keyword, isSuperSale, vendor, material, collection, color, size, lowprice, highprice
    } = context.query
    if (page) {
        page = '?page=' + page
    } else {
        page = ''
    }
    let res = {}
    let data = {
        'superSale': false, 'vendor': '', 'material': '', 'collection': '', 'color': '', 'size': '',
        'lowprice': 0,
        'highprice': 0
    }
    if (lowprice) {
        data['lowprice'] = Number(lowprice)
    } else {
        data['lowprice'] = 0

    }
    if (highprice) {
        data['highprice'] = Number(highprice)
    } else {
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

    let isLoading = true

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
    } else {
        isLoading = false
    }
    console.log(res, res.data)
    return {props: {data: res.data, topData: topData.data, category, keyword, isSuperSale, isLoading}}
}

export default Category