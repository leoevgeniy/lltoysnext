import Head from 'next/head'
import React from "react";
import {
    Row,
    Col,
    Container,
    Badge,
    FormCheck,
    Offcanvas,
    OffcanvasBody,
    ListGroup,
    ListGroupItem
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
import MultiRangeSlider from "@/components/MultiRangeSlider";
// import MultiRangeSliderold from "@/components/MultiRangeSliderold";


const SubCategory = ({pageProps}) => {
    const subCategory = pageProps.subCategory
    const category = pageProps.category
    const {
        error,
        loading,
        products,
        productsLength,
        categoryList,
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
    const dispatch = useDispatch()
    const [minRangeValue, setMinRangeValue] = useState(0)
    const [maxRangeValue, setMaxRangeValue] = useState(Number(maxPrice).toFixed(0))

    // const [sort, setSort] = useState('')
    // const [priceSortUp, setPriceSortUp] = useState(false);
    // const [priceSortDown, setPriceSortDown] = useState(false);
    // const [nameSortDown, setNameSortDown] = useState(false);
    // const [nameSortUp, setNameSortUp] = useState(false);
    const [vendor, setVendor] = useState('')
    const [collection, setCollection] = useState([])
    const [material, setMaterial] = useState([])
    const [color, setColor] = useState([])
    const [size, setSize] = useState([])
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
    const newUrl = new URL(history.asPath, LOCATION)
    useEffect(() => {
        if (localStorage.getItem('oppenedItems')) {
            setOppenedItems(JSON.parse(localStorage.getItem("oppenedItems")))
        }
        dispatch(listTopProducts())
        setVendor(searchParams.get('vendor'))


    }, [])

    const [isSuperSale, setIsSuperSale] = useState(false)

    // useEffect(() => {
    //     if (isSuperSale) {
    //         newUrl.searchParams.append('isSuperSale', '1')
    //
    //         // if (history.asPath.includes('?')) {
    //         //     history.push(history.asPath + '&isSuperSale=1')
    //         // } else {
    //         //     history.push(history.asPath + '?isSuperSale=1')
    //         // }
    //     } else {
    //         newUrl.searchParams.delete('isSuperSale')
    //
    //     }
    //     history.push(newUrl.href)
    // }, [isSuperSale])
    useEffect(() => {
        if (oppenedItems) {
            dispatch(listSeenProducts(oppenedItems))
        }

    }, [])
    const brCategory = `/category/${category}`
    const brSubCategory = `/category/${category}/${subCategory}`
    const [show, setShow] = useState(false)
    const searchParams = useSearchParams()
    // const superSaleToggle = () => {
    //     setIsSuperSale(!isSuperSale)
    // }
    const vendorRemove = () => {
        setVendor('')
        newUrl.searchParams.delete('vendor')
        setShow(false)

        history.push(newUrl.href)
    }
    const materialRemove = () => {
        setMaterial('')
        newUrl.searchParams.delete('material')
        setShow(false)

        history.push(newUrl.href)
    }
    const collectionRemove = () => {
        setCollection('')
        newUrl.searchParams.delete('collection')
        setShow(false)

        history.push(newUrl.href)
    }
    const colorRemove = () => {
        setColor('')
        newUrl.searchParams.delete('color')
        setShow(false)

        history.push(newUrl.href)
    }
    const sizeRemove = () => {
        setSize('')
        newUrl.searchParams.delete('size')
        setShow(false)

        history.push(newUrl.href)
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
                                onClick={vendorRemove}
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
                                    if (history.asPath.includes('?')) {
                                        history.push(history.asPath + '&vendor=' + ven)
                                    } else {
                                        history.push(history.asPath + '?vendor=' + ven)
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
                                    if (history.asPath.includes('?')) {
                                        history.push(history.asPath + '&material=' + ven)
                                    } else {
                                        history.push(history.asPath + '?material=' + ven)
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
                                    if (history.asPath.includes('?')) {
                                        history.push(history.asPath + '&color=' + ven)
                                    } else {
                                        history.push(history.asPath + '?color=' + ven)
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
                                    if (history.asPath.includes('?')) {
                                        history.push(history.asPath + '&size=' + ven)
                                    } else {
                                        history.push(history.asPath + '?size=' + ven)
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
                                    if (history.asPath.includes('?')) {
                                        history.push(history.asPath + '&collection=' + ven)
                                    } else {
                                        history.push(history.asPath + '?collection=' + ven)
                                    }
                                    setShow(false)

                                }}
                            >
                                {ven}
                            </Badge>
                        )
                    }
                </div>
                {/*<MultiRangeSliderold*/}
                {/*    // baseClassName='multi-range-slider-black'*/}
                {/*    min={0}*/}
                {/*    max={Number(maxPrice).toFixed(0)}*/}
                {/*    step={100}*/}
                {/*    ruler={false}*/}
                {/*    label={true}*/}
                {/*    preventWheel={false}*/}
                {/*    minValue={minValue}*/}
                {/*    maxValue={maxValue}*/}
                {/*    onInput={(e) => {*/}
                {/*        handleInput(e);*/}
                {/*    }}*/}
                {/*/>*/}
                <MultiRangeSlider
                    min={0}
                    max={Number(maxPrice).toFixed(0)}
                    minInput={minRangeValue}
                    maxInput={maxRangeValue}
                    onChange={({ min, max }) => {
                        console.log(`min = ${min}, max = ${max}`)
                    }}
                    setMouseUp={setMouseUp}
                    setMinRangeValue={setMinRangeValue}
                    setMaxRangeValue={setMaxRangeValue}
                    // handle={() => {
                    //     newUrl.searchParams.delete('lowprice')
                    //     newUrl.searchParams.delete('highprice')
                    // }}
                />

            </>
        )
    }
    console.log(`min = ${minRangeValue}, max = ${maxRangeValue}`)


    const [mouseUp, setMouseUp] = useState(false)
    console.log(mouseUp)
    // useEffect(() => {
    //     if (mouseUp) {
    //         setMouseUp(false)
    //
    //         newUrl.searchParams.delete('lowprice')
    //         newUrl.searchParams.delete('highprice')
    //         if (newUrl.href.includes('?')) {
    //             history.push(newUrl.href + '&lowprice=' + minRangeValue + '&highprice=' + maxRangeValue).then()
    //         } else {
    //             history.push(newUrl.href + '?lowprice=' + minRangeValue + '&highprice=' + maxRangeValue).then()
    //         }
    //     }
    // },[mouseUp]);

    const clearFilters = () => {
        materialRemove()
        vendorRemove()
        collectionRemove()
        colorRemove()
        sizeRemove()
    }
    return (
        <Container className='categ'>
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
                                    {(searchParams.get('material') || searchParams.get('vendor')) ?
                                        <span onClick={clearFilters} className='float-end'>Отмена</span> : ''}
                                </Offcanvas.Title>
                            </Offcanvas.Header>
                            <OffcanvasBody className={'my-0 py-0'} style={{background: '#e5097f linear-gradient(#e5097f, rgb(0 0 0))'}}>
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

                                    {subCategoriesList && Object.keys(subCategoriesList).map((item, i) =>
                                        <li key={item}>
                                            <Link href={'/category/' + category + '/' + item}
                                                  className='subCategory'> {item}</Link>
                                            <span
                                                className='prod-length pl-2'>{subCategoriesList[item]}</span>
                                        </li>
                                    )}
                                </ul>
                                <br/>
                                {/*<div className='d-flex justify-content-between'>*/}
                                {/*<span>*/}
                                {/*Распродажа</span>*/}
                                {/*    <FormCheck*/}
                                {/*        custom='true'*/}
                                {/*        id='isSusperSale'*/}
                                {/*        type='switch'*/}
                                {/*        сhecked={isSuperSale ? 'true' : ''}*/}
                                {/*        onChange={() => setIsSuperSale(!isSuperSale)}*/}
                                {/*        className=''></FormCheck>*/}
                                {/*</div>*/}
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
                                </div>
                            </Col>
                        </Row>
                    </div>

                </div>
            }


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
    let {category, page, keyword, isSuperSale, vendor, material, collection, color, size, lowprice, highprice} = context.query

    let subCategory = context.params.id
    if (page) {
        page = '?page=' + page
    } else {
        page = ''
    }
    let itemsList = []
    let res = {}
    let data = {'superSale': false, 'vendor': '', 'material': '', 'collection': '', 'color': '', 'size':'', 'lowprice':0, 'highprice':0}
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
    }
    if (vendor) {
        data['vendor'] = vendor
    }
    if (material) {
        data['material'] = material
    }

    if (keyword && page) {
        res = await axios.post(`${API_HOST}/api/products/category/${category}/${subCategory}${page}&keyword=${keyword}`, data);
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
    }
    return {props: {data: res.data, topData: topData.data, category, subCategory, keyword}}
}

export default SubCategory