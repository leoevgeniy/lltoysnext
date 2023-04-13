import React, { useEffect, useState } from "react";
import {
    Container,
    Row,
    Col,
    Navbar,
    Nav,
    ListGroup,
    ListGroupItem,
    ButtonGroup,
    Button, Offcanvas, OffcanvasBody, FormGroup, FormLabel, FormCheck, NavLink
} from "react-bootstrap";
import Image from "next/image";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Badge from 'react-bootstrap/Badge';
import Product from "@/components/Product";
import Loader from "@/components/Loader";
import Message from "@/components/Message";
import Paginate from "@/components/Paginate";
import { useDispatch, useSelector } from "react-redux";
import {listCatalog, listProducts, listSeenProducts, listTopProducts} from "@/redux/actions/productAction";
import ProductCarousel from "@/components/ProductCarousel";
import Accordion from "react-bootstrap/Accordion";
import { LinkContainer } from "react-router-bootstrap";
import {PRODUCT_DETAILS_RESET, PRODUCT_TOP_RESET} from "@/redux/types";
import logo from '@/public/logo.png'
import home from '@/public/home.png'
import user from '@/public/user.png'
import cartImg from '@/public/cart.png'
import deliveryFree from '@/public/freeship.jpg'
import cardDiscount from '@/public/discount10.jpg'
import Link from 'next/link'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import ProductsFilter from "@/components/ProductsFilter";
import PriceSlider from "@/components/PriceSlider";
import BannersCarousel from "@/components/BannersCarousel";
import SeenProductCarousel from "@/components/SeenProductCarousel";
import {useRouter} from "next/router";
import {useSearchParams} from "next/navigation";


function HomeScreen(props) {
    // const [qty, setQty] = useState(1);
    // const [sz, setSz] = useState("");
    const userLogin = useSelector((state) => state.userLogin);
    const {userInfo} = userLogin;
    const cart = useSelector((state) => state.cart)
    const [sort, setSort] = useState('')
    const [priceSortUp, setPriceSortUp] = useState(false);
    const [priceSortDown, setPriceSortDown] = useState(false);
    const [nameSortDown, setNameSortDown] = useState(false);
    const [nameSortUp, setNameSortUp] = useState(false);
    const {
        catalog,
        error: catalogError,
        loading: catalogLocading,
    } = useSelector((state) => state.catalogList);
    const [vendorSelected, setVendorSelected] = useState([])
    const [collectionSelected, setCollectionSelected] = useState([])
    const [materialSelected, setMaterialSelected] = useState([])
    const [colorSelected, setColorSelected] = useState([])
    const [sizeSelected, setSizeSelected] = useState([])
    const [categorySelected, setCategorySelected] = useState([])
    const [vendorCanvasShow, setVendorCanvasShow] = useState(false)
    const [collectionCanvasShow, setCollectionCanvasShow] = useState(false)
    const [materialCanvasShow, setMaterialCanvasShow] = useState(false)
    const [sizeCanvasShow, setSizeCanvasShow] = useState(false)
    const [colorCanvasShow, setColorCanvasShow] = useState(false)
    const [priceRangeCanvasShow, setPriceRangeCanvasShow] = useState(false)
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productList);
    const { error, loading, products, page, pages, filter } = productList;
    const {loading:topLoading, error:topError, products: topProducts} = useSelector((state) => state.productsTopRated);
    let sortedProducts = products;
    const history = useRouter()
    const searchParams = useSearchParams();
    let keyword = decodeURIComponent(searchParams);

    // let keyword = f"/{decodeURIComponent(props.location.search)}";
    if (catalog) {
    const catalogItems = Object.entries(catalog);}
    // let keys = props.history.location.search;
    let filteredItem = "";
    const [def, setDefault] = useState(0);
    const [filterComponent, setfilterComponent] = useState("");
    const catalogFiltered = (n) => {
        setDefault(n);
    };
    const [categoryInProduct, setCategoryInProduct] = useState("")
    let category = ''
    let filterQuery = ''
    let keywordQuery = ''
    let isFilteredCatalog = false
    const [catalogView, setCatalogView] = useState('')
    const [moreVendors, setMoreVendors] = useState(false)
    const [moreCollection, setMoreCollection] = useState(false)
    const [moreColor, setMoreColor] = useState(false)
    const [moreMaterial, setMoreMaterial] = useState(false)
    const [moreSize, setMoreSize] = useState(false)
    const [priceLow, setPriceLow] = useState(productList.priceLowApi)
    const [priceUp, setPriceUp] = useState(productList.priceUpApi)
    const [priceRange, setPriceRange] = useState([])
    const { loading: seenLoading, error: seenError, products: seenProducts} = useSelector(
        (state) => state.productsSeen
    );
    const [oppenedItems, setOppenedItems] = useState([])


    const query = searchParams
    category = searchParams.get('category')
    filterQuery = searchParams.get('filter')
    keywordQuery = searchParams.get('keyword')
    const HandleFiltersErase = () => {
        setPriceSortUp(false);
        setPriceSortDown(false);
        setNameSortUp(false);
        setNameSortDown(false);
        setSort('')
        setCatalogView('')
        setVendorSelected('')
        setCategorySelected('')
        setCollectionSelected('')
        setMaterialSelected('')
        setColorSelected('')
        setSizeSelected('')
        setPriceRange([0, Number(productList.maxPrice)])
        setVendorCanvasShow(false)
        setMoreVendors(false)
        setMoreCollection(false)
        setMoreColor(false)
        setPriceRangeCanvasShow(false)
        setColorCanvasShow(false)
        setMaterialCanvasShow(false)
        setMoreMaterial(false)
        setSizeCanvasShow(false)
        setMoreSize(false)

        keywordQuery = ''
    }
    useEffect(() => {
        HandleFiltersErase()
        dispatch(listCatalog());
        dispatch(listTopProducts())

        dispatch({type: PRODUCT_DETAILS_RESET})
        setPriceUp(productList.priceUpApi)
        setPriceLow(productList.priceLowApi)
        if (localStorage.getItem('oppenedItems')) {
            setOppenedItems(JSON.parse(localStorage.getItem("oppenedItems")))}

    },[])

    useEffect(() => {
        if (oppenedItems) {dispatch(listSeenProducts(oppenedItems))}

    },[dispatch, oppenedItems])
    useEffect(() => {

        dispatch(listProducts(`/${keyword}`, sort, vendorSelected, collectionSelected, materialSelected, colorSelected, sizeSelected, Number(priceRange[0]), Number(priceRange[1])));
        let index = 0;
        if (category) {
            setfilterComponent('')
            for (let key in catalog) {
                if (key === category) {
                    setDefault(index);
                }
                index +=1;
            }
        }
        if (filterQuery) {

                filteredItem = filterQuery
            }
            index = 0;
            for (let key in catalog) {
                catalog[key].forEach((elem) => {
                    if (elem === filteredItem) {
                        setCategoryInProduct(key)
                        setDefault(index);
                        setfilterComponent(elem);
                        isFilteredCatalog = true;
                    }
                });
                index += 1;
            }



        if (category) {
            filteredItem = category

            let index = 0;
            for (let key in catalog) {
                catalog[key].forEach((elem) => {
                    if (elem === filteredItem) {
                        setCategoryInProduct(key)
                        setDefault(index);
                        setfilterComponent(elem);
                        isFilteredCatalog = true;
                    }
                });
                index += 1;
            }}
        if (categorySelected.length>0) {
            setCategorySelected('')
            history.push(`/?filter=${categorySelected}`)

        }

    }, [dispatch, keyword, sort, priceRange, vendorSelected, categorySelected, category, collectionSelected, materialSelected, sizeSelected, colorSelected]);
    const priceDefault = () => {
        setPriceSortUp(false);
        setPriceSortDown(false);
        if (nameSortUp) {
            if (keyword) {
                setSort('&sort=NameSortUp')
            }
            else {
                setSort('?sort=NameSortUp')
            }

        } else if (nameSortDown) {
            if (keyword) {
                setSort('&sort=NameSortDown')
            }
            else {
                setSort('?sort=NameSortDown')
            }
        }

        // setSort('')
        // sortedProducts = products;
    };
    const OnPriceSortUp = () => {
        setPriceSortUp(true);
        setPriceSortDown(false);
        if (keyword) {
            if (nameSortUp) {
                setSort('&sort=PriceSortUp+NameSortUp')
            } else if (nameSortDown) {
                setSort('&sort=PriceSortUp+NameSortDown')
            } else {
                setSort('&sort=PriceSortUp')
            }
        }
        else {
            if (nameSortUp) {
                setSort('?sort=PriceSortUp+NameSortUp')
            } else if (nameSortDown) {
                setSort('?sort=PriceSortUp+NameSortDown')
            } else {
                setSort('?sort=PriceSortUp')
            }
        }
    };
    const OnPriceSortDown = () => {
        setPriceSortDown(true);
        setPriceSortUp(false);
        if (keyword) {
            if (nameSortUp) {
                setSort('&sort=PriceSortDown+NameSortUp')
            } else if (nameSortDown) {
                setSort('&sort=PriceSortDown+NameSortDown')
            } else {
                setSort('&sort=PriceSortDown')
            }
        }
        else {
            if (nameSortUp) {
                setSort('?sort=PriceSortDown+NameSortUp')
            } else if (nameSortDown) {
                setSort('?sort=PriceSortDown+NameSortDown')
            } else {
                setSort('?sort=PriceSortDown')
            }
        }
        // sortedProducts = products.sort((a, b) =>
        //     Number(a.retailPrice) < Number(b.retailPrice) ? 1 : -1
        // );
    };
    const nameDefault = () => {
        // sortedProducts = products;
        setNameSortUp(false);
        setNameSortDown(false);
        if (priceSortUp) {
            if (keyword) {
                setSort('&sort=PriceSortUp')
            }
            else {
                setSort('?sort=PriceSortUp')
            }

        } else if (priceSortDown) {
            if (keyword) {
                setSort('&sort=PriceSortDown')
            }
            else {
                setSort('?sort=PriceSortDown')
            }
        }

    };
    const OnNameSortUp = () => {
        setNameSortUp(true);
        setNameSortDown(false);
        if (keyword) {
            if (priceSortDown) {
                setSort('&sort=PriceSortDown+NameSortUp')
            } else if (priceSortUp) {
                setSort('&sort=PriceSortUp+NameSortUp')
            } else {
                setSort('&sort=NameSortUp')
            }
        }
        else {
            if (priceSortDown) {
                setSort('?sort=PriceSortDown+NameSortUp')
            } else if (priceSortUp) {
                setSort('?sort=PriceSortUp+NameSortUp')
            } else {
                setSort('?sort=NameSortUp')
            }
        }
        // sortedProducts = products.sort((a, b) => (a.name > b.name ? 1 : -1));
    };
    const OnNameSortDown = () => {
        setNameSortDown(true);
        setNameSortUp(false);
        if (keyword) {
            if (priceSortDown) {
                setSort('&sort=PriceSortDown+NameSortDown')
            } else if (priceSortUp) {
                setSort('&sort=PriceSortUp+NameSortDown')
            } else {
                setSort('&sort=NameSortDown')
            }
        }
        else {
            if (priceSortDown) {
                setSort('?sort=PriceSortDown+NameSortDown')
            } else if (priceSortUp) {
                setSort('?sort=PriceSortUp+NameSortDown')
            } else {
                setSort('?sort=NameSortDown')
            }
        }
        // sortedProducts = products.sort((a, b) => (a.name < b.name ? 1 : -1));
    };
    const handleClose = () => {
        setVendorCanvasShow(false)
        setCollectionCanvasShow(false)
        setPriceRangeCanvasShow(false)
        setColorCanvasShow(false)
        setMaterialCanvasShow(false)
        setSizeCanvasShow(false)
    }
    const showAllFilters = () => {
        if (catalogView === 'filter1') {
            setCatalogView('')
        } else {
            setCatalogView('filter1')
        }
    }
    return (
        <div className='homescreen w-100'>
             <Offcanvas show={vendorCanvasShow} onHide={handleClose} placement='bottom' className=''>
                 <Offcanvas.Header closeButton >
                     <Offcanvas.Title>Производитель</Offcanvas.Title>
                 </Offcanvas.Header>
                 <OffcanvasBody>
                     {productList.vendorList && productList.vendorList.length > 0 &&
                         <div
                             className="border-dark border-1 justify-content-center w-100 ">
                             <FormGroup className='border-1'>
                                 <div style={{'overflow': 'scroll', 'maxHeight': '20em'}}>
                                     {moreVendors ? productList.vendorList.map((Val, id) => {
                                         return (
                                             <Button variant='secondary' className='mx-1' onClick={() => {
                                                 setVendorCanvasShow(false)
                                                 setVendorSelected(Val)
                                             }} key={id}>
                                                 {Val}
                                             </Button>
                                         );

                                     }) : (
                                         <div className=''>
                                             {productList.vendorList.slice(productList.vendorList, 10).map((Val, id) =>
                                                 <Button variant='secondary' className='mx-1' onClick={() => {
                                                     setVendorCanvasShow(false)
                                                     setVendorSelected(Val)
                                                 }} key={id}>
                                                     {Val}
                                                 </Button>
                                             )}
                                             {productList.vendorList.length > 10 &&
                                                 <span
                                                     className="p-1 px-2 mx-5 btn link-dark text-right text-decoration-underline"
                                                     onClick={() => setMoreVendors(true)}
                                                 >
                                     еще
                                 </span>
                                             }
                                         </div>
                                     )}
                                 </div>
                             </FormGroup>
                         </div>
                     }

                 </OffcanvasBody>

             </Offcanvas>
        {/*//     <Offcanvas show={collectionCanvasShow} onHide={handleClose} placement='bottom' className=''>*/}
        {/*//         <Offcanvas.Header closeButton >*/}
        {/*//             <Offcanvas.Title>Коллекции</Offcanvas.Title>*/}
        {/*//         </Offcanvas.Header>*/}
        {/*//         <OffcanvasBody>*/}
        {/*//             {productList.collectionList && productList.collectionList.length > 0 &&*/}
        {/*//                 <div*/}
        {/*//                     className="border-dark border-1 justify-content-center w-100 ">*/}
        {/*//                     <FormGroup className='border-1'>*/}
        {/*//                         <div style={{'overflow': 'scroll', 'maxHeight': '20em'}}>*/}
        {/*//                             {moreCollection ? productList.collectionList.map((Val, id) => {*/}
        {/*//                                 return (*/}
        {/*//                                     <Button variant='secondary' className='mx-1' onClick={() => {*/}
        {/*//                                         setCollectionCanvasShow(false)*/}
        {/*//                                         setCollectionSelected(Val)*/}
        {/*//                                     }}*/}
        {/*//                                         key={id}*/}
        {/*//                                     >*/}
        {/*//                                         {Val}*/}
        {/*//                                     </Button>*/}
        {/*//                                 );*/}
        {/*//*/}
        {/*//                             }) : (*/}
        {/*//                                 <div className=''>*/}
        {/*//                                     {productList.collectionList.slice(productList.collectionList, 10).map((Val, id) =>*/}
        {/*//                                         <Button variant='secondary' className='mx-1' onClick={() => {*/}
        {/*//                                             setCollectionCanvasShow(false)*/}
        {/*//                                             setCollectionSelected(Val)*/}
        {/*//                                         }} key={id}>*/}
        {/*//                                             {Val}*/}
        {/*//                                         </Button>*/}
        {/*//                                     )}*/}
        {/*//                                     {productList.collectionList.length > 10 &&*/}
        {/*//                                         <span*/}
        {/*//                                             className="p-1 px-2 mx-5 btn link-dark text-right text-decoration-underline"*/}
        {/*//                                             onClick={() => setMoreCollection(true)}*/}
        {/*//                                         >*/}
        {/*//                             еще*/}
        {/*//                         </span>*/}
        {/*//                                     }*/}
        {/*//                                 </div>*/}
        {/*//                             )}*/}
        {/*//                         </div>*/}
        {/*//                     </FormGroup>*/}
        {/*//                 </div>*/}
        {/*//             }*/}
        {/*//*/}
        {/*//         </OffcanvasBody>*/}
        {/*//*/}
        {/*//     </Offcanvas>*/}
        {/*//     <Offcanvas show={colorCanvasShow} onHide={handleClose} placement='bottom' className=''>*/}
        {/*//         <Offcanvas.Header closeButton >*/}
        {/*//             <Offcanvas.Title>Цвет</Offcanvas.Title>*/}
        {/*//         </Offcanvas.Header>*/}
        {/*//         <OffcanvasBody>*/}
        {/*//             {productList.colorList && productList.colorList.length > 0 &&*/}
        {/*//                 <div*/}
        {/*//                     className="border-dark border-1 justify-content-center w-100 ">*/}
        {/*//                     <FormGroup className='border-1'>*/}
        {/*//                         <div style={{'overflow': 'scroll', 'maxHeight': '20em'}}>*/}
        {/*//                             {moreColor ? productList.colorList.map((Val, id) => {*/}
        {/*//                                 return (*/}
        {/*//                                     <Button variant='secondary' className='mx-1' onClick={() => {*/}
        {/*//                                         setColorCanvasShow(false)*/}
        {/*//                                         setColorSelected(Val)*/}
        {/*//                                     }}*/}
        {/*//                                         key={id}*/}
        {/*//                                     >*/}
        {/*//                                         {Val}*/}
        {/*//                                     </Button>*/}
        {/*//                                 );*/}
        {/*//*/}
        {/*//                             }) : (*/}
        {/*//                                 <div className=''>*/}
        {/*//                                     {productList.colorList.slice(productList.colorList, 10).map((Val, id) =>*/}
        {/*//                                         <Button variant='secondary' className='mx-1' onClick={() => {*/}
        {/*//                                             setColorCanvasShow(false)*/}
        {/*//                                             setColorSelected(Val)*/}
        {/*//                                         }} key={id}>*/}
        {/*//                                             {Val}*/}
        {/*//                                         </Button>*/}
        {/*//                                     )}*/}
        {/*//                                     {productList.colorList.length > 10 &&*/}
        {/*//                                         <span*/}
        {/*//                                             className="p-1 px-2 mx-5 btn link-dark text-right text-decoration-underline"*/}
        {/*//                                             onClick={() => setMoreColor(true)}*/}
        {/*//                                         >*/}
        {/*//                             еще*/}
        {/*//                         </span>*/}
        {/*//                                     }*/}
        {/*//                                 </div>*/}
        {/*//                             )}*/}
        {/*//                         </div>*/}
        {/*//                     </FormGroup>*/}
        {/*//                 </div>*/}
        {/*//             }*/}
        {/*//*/}
        {/*//         </OffcanvasBody>*/}
        {/*//*/}
        {/*//     </Offcanvas>*/}
        {/*//     <Offcanvas show={materialCanvasShow} onHide={handleClose} placement='bottom' className=''>*/}
        {/*//         <Offcanvas.Header closeButton >*/}
        {/*//             <Offcanvas.Title>Материал</Offcanvas.Title>*/}
        {/*//         </Offcanvas.Header>*/}
        {/*//         <OffcanvasBody>*/}
        {/*//             {productList.materialList && productList.materialList.length > 0 &&*/}
        {/*//                 <div*/}
        {/*//                     className="border-dark border-1 justify-content-center w-100 ">*/}
        {/*//                     <FormGroup className='border-1'>*/}
        {/*//                         <div style={{'overflow': 'scroll', 'maxHeight': '20em'}}>*/}
        {/*//                             {moreMaterial ? productList.materialList.map((Val, id) => {*/}
        {/*//                                 return (*/}
        {/*//                                     <Button variant='secondary' className='mx-1' onClick={() => {*/}
        {/*//                                         setMaterialCanvasShow(false)*/}
        {/*//                                         setMaterialSelected(Val)*/}
        {/*//                                     }}*/}
        {/*//                                         key={id}*/}
        {/*//                                     >*/}
        {/*//                                         {Val}*/}
        {/*//                                     </Button>*/}
        {/*//                                 );*/}
        {/*//*/}
        {/*//                             }) : (*/}
        {/*//                                 <div className=''>*/}
        {/*//                                     {productList.materialList.slice(productList.materialList, 10).map((Val, id) =>*/}
        {/*//                                         <Button variant='secondary' className='mx-1' onClick={() => {*/}
        {/*//                                             setMaterialCanvasShow(false)*/}
        {/*//                                             setMaterialSelected(Val)*/}
        {/*//                                         }} key={id}>*/}
        {/*//                                             {Val}*/}
        {/*//                                         </Button>*/}
        {/*//                                     )}*/}
        {/*//                                     {productList.colorList.length > 10 &&*/}
        {/*//                                         <span*/}
        {/*//                                             className="p-1 px-2 mx-5 btn link-dark text-right text-decoration-underline"*/}
        {/*//                                             onClick={() => setMoreMaterial(true)}*/}
        {/*//                                         >*/}
        {/*//                             еще*/}
        {/*//                         </span>*/}
        {/*//                                     }*/}
        {/*//                                 </div>*/}
        {/*//                             )}*/}
        {/*//                         </div>*/}
        {/*//                     </FormGroup>*/}
        {/*//                 </div>*/}
        {/*//             }*/}
        {/*//*/}
        {/*//         </OffcanvasBody>*/}
        {/*//*/}
        {/*//     </Offcanvas>*/}
        {/*//     <Offcanvas show={sizeCanvasShow} onHide={handleClose} placement='bottom' className=''>*/}
        {/*//         <Offcanvas.Header closeButton >*/}
        {/*//             <Offcanvas.Title>Размер</Offcanvas.Title>*/}
        {/*//         </Offcanvas.Header>*/}
        {/*//         <OffcanvasBody>*/}
        {/*//             {productList.sizeList && productList.sizeList.length > 0 &&*/}
        {/*//                 <div*/}
        {/*//                     className="border-dark border-1 justify-content-center w-100 ">*/}
        {/*//                     <FormGroup className='border-1'>*/}
        {/*//                         <div style={{'overflow': 'scroll', 'maxHeight': '20em'}}>*/}
        {/*//                             {moreSize ? productList.sizeList.map((Val, id) => {*/}
        {/*//                                 return (*/}
        {/*//                                     <Button variant='secondary' className='mx-1' onClick={() => {*/}
        {/*//                                         setSizeCanvasShow(false)*/}
        {/*//                                         setSizeSelected(Val)*/}
        {/*//                                     }}*/}
        {/*//                                         key={id}*/}
        {/*//                                     >*/}
        {/*//                                         {Val}*/}
        {/*//                                     </Button>*/}
        {/*//                                 );*/}
        {/*//*/}
        {/*//                             }) : (*/}
        {/*//                                 <div className=''>*/}
        {/*//                                     {productList.sizeList.slice(productList.sizeList, 10).map((Val, id) =>*/}
        {/*//                                         <Button variant='secondary' className='mx-1' onClick={() => {*/}
        {/*//                                             setSizeCanvasShow(false)*/}
        {/*//                                             setSizeSelected(Val)*/}
        {/*//                                         }} key={id}>*/}
        {/*//                                             {Val}*/}
        {/*//                                         </Button>*/}
        {/*//                                     )}*/}
        {/*//                                     {productList.sizeList.length > 10 &&*/}
        {/*//                                         <span*/}
        {/*//                                             className="p-1 px-2 mx-5 btn link-dark text-right text-decoration-underline"*/}
        {/*//                                             onClick={() => setMoreSize(true)}*/}
        {/*//                                         >*/}
        {/*//                             еще*/}
        {/*//                         </span>*/}
        {/*//                                     }*/}
        {/*//                                 </div>*/}
        {/*//                             )}*/}
        {/*//                         </div>*/}
        {/*//                     </FormGroup>*/}
        {/*//                 </div>*/}
        {/*//             }*/}
        {/*//*/}
        {/*//         </OffcanvasBody>*/}
        {/*//*/}
        {/*//     </Offcanvas>*/}
        {/*//     <Offcanvas show={priceRangeCanvasShow} onHide={handleClose} placement='bottom' className='mh-25'>*/}
        {/*//         <Offcanvas.Header closeButton className='w-100'>*/}
        {/*//             <Offcanvas.Title>Цена</Offcanvas.Title>*/}
        {/*//         </Offcanvas.Header>*/}
        {/*//         <OffcanvasBody style={{'width': '100%', 'overflow': 'hidden'}} className='mh-100'>*/}
        {/*//             <PriceSlider*/}
        {/*//                 priceLow={priceLow}*/}
        {/*//                 setPriceLow={setPriceLow}*/}
        {/*//                 priceUp={priceUp}*/}
        {/*//                 setPriceUp={setPriceUp}*/}
        {/*//                 setPriceRange={setPriceRange}*/}
        {/*//                 setPriceRangeCanvasShow={setPriceRangeCanvasShow}*/}
        {/*//             />*/}
        {/*//*/}
        {/*//         </OffcanvasBody>*/}
        {/*//*/}
        {/*//     </Offcanvas>*/}
             <div className='mainlady'>
                 <Link href='/'>
                     <Image className='home' src={home} alt='home' />
                 </Link>
                 <Link href='/cart'>
                     <div>
                         <Image className='cart' src={cartImg} alt='cart'/>

                         {cart.cartItems && cart.cartItems.length>0 && <Badge className='cartBadge text-center' style={{}} bg='primary'>{cart.cartItems.length}</Badge>}

                     </div>
                 </Link>
                 {!userInfo &&
                     <Link href='/login'>
                         <Image className='user' src={user} alt='user' />
                     </Link>
                 }

                 <Link href='/'>
                     <Image className='logo' src={logo} alt='logo' />
                 </Link>
             </div>
        {/*//     <div className="d-flex justify-content-md-center" >*/}
        {/*//         {catalogView === 'catalog' ? (*/}
        {/*//             <Navbar*/}
        {/*//                 className="bar d-none d-sm-none d-md-none d-lg-block d-xl-block d-xxl-block justify-content-center mx-3 w-25"*/}
        {/*//                 bg="light"*/}
        {/*//                 variant="light"*/}
        {/*//             >*/}
        {/*//                 <Navbar.Toggle aria-controls="navbarScrollMenu" />*/}
        {/*//                 <Navbar.Brand*/}
        {/*//                     className="d-block text-center mb-2"*/}
        {/*//                 >*/}
        {/*//                     Каталог*/}
        {/*//                 </Navbar.Brand>*/}
        {/*//                 <Navbar.Collapse id="navbarScrollMenu">*/}
        {/*//                     {catalogLocading ? (*/}
        {/*//                         <Loader />*/}
        {/*//                     ) : catalogError ? (*/}
        {/*//                         <Message />*/}
        {/*//                     ) : (*/}
        {/*//                         <Accordion defaultActiveKey={def} key={1} style={{width: "100%"}}>*/}
        {/*//                             {catalogItems.map((item, n) => (*/}
        {/*//                                 <Accordion.Item eventKey={n} key={n}>*/}
        {/*//                                     <Accordion.Header key={n}>*/}
        {/*//                                         <h5*/}
        {/*//                                             style={{*/}
        {/*//                                                 fontSize: "15px",*/}
        {/*//                                                 fontWeight: "bold",*/}
        {/*//                                             }}*/}
        {/*//                                         >*/}
        {/*//                                             {item[0]}*/}
        {/*//                                         </h5>*/}
        {/*//                                     </Accordion.Header>*/}
        {/*//                                     {item[1].map((subItem, i) => (*/}
        {/*//                                         <Accordion.Body*/}
        {/*//                                             style={{ fonSize: "15px" }}*/}
        {/*//                                             className="fst-italic text-capitalize"*/}
        {/*//                                             key={i}*/}
        {/*//                                         >*/}
        {/*//                                             <LinkContainer*/}
        {/*//                                                 key={i}*/}
        {/*//                                                 onClick={*/}
        {/*//                                                     catalogFiltered*/}
        {/*//                                                 }*/}
        {/*//                                                 to={`/?filter=${subItem}`}*/}
        {/*//                                             >*/}
        {/*//                                                 /!*  *!/*/}
        {/*//                                                 <Nav.Link*/}
        {/*//                                                     className={*/}
        {/*//                                                         filterComponent ===*/}
        {/*//                                                         subItem*/}
        {/*//                                                             ? "text-success fst-normal"*/}
        {/*//                                                             : ""*/}
        {/*//                                                     }*/}
        {/*//                                                 >*/}
        {/*//                                                     {subItem}*/}
        {/*//                                                 </Nav.Link>*/}
        {/*//                                                 /!*  *!/*/}
        {/*//                                             </LinkContainer>*/}
        {/*//                                         </Accordion.Body>*/}
        {/*//                                     ))}*/}
        {/*//                                 </Accordion.Item>*/}
        {/*//                             ))}*/}
        {/*//                         </Accordion>*/}
        {/*//                     )}*/}
        {/*//                 </Navbar.Collapse>*/}
        {/*//             </Navbar>*/}
        {/*//         ) : catalogView === 'filter1' ?*/}
        {/*//                 <ProductsFilter*/}
        {/*//                     categorySelected={categorySelected}*/}
        {/*//                     setCategorySelected={setCategorySelected}*/}
        {/*//                     setVendorSelected={setVendorSelected}*/}
        {/*//                     vendorSelected={vendorSelected}*/}
        {/*//                     collectionSelected={collectionSelected}*/}
        {/*//                     setCollectionSelected={setCollectionSelected}*/}
        {/*//                     materialSelected={materialSelected}*/}
        {/*//                     setMaterialSelected={setMaterialSelected}*/}
        {/*//                     colorSelected={colorSelected}*/}
        {/*//                     setColorSelected={setColorSelected}*/}
        {/*//                     sizeSelected={sizeSelected}*/}
        {/*//                     setSizeSelected={setSizeSelected}*/}
        {/*//*/}
        {/*//                 />*/}
        {/*//             :''*/}
        {/*//*/}
        {/*//         }*/}
        {/*//*/}
        {/*//         <div className="w-100">*/}
        {/*//             {(!keyword) &&*/}
        {/*//                 <div className='categories'>*/}
        {/*//                     <NavLink className='category category1' to='/?category=Эротическая одежда'/>*/}
        {/*//                     <NavLink className='category category2' to='/?category=BDSM, садо-мазо товары'/>*/}
        {/*//                     <NavLink className='category category3' to='/?category=Смазки, лубриканты'/>*/}
        {/*//                     <NavLink className='category category4' to='/?category=Анальные игрушки'/>*/}
        {/*//                     <NavLink className='category category5' to='/?category=Приятные мелочи'/>*/}
        {/*//                 </div>*/}
        {/*//             }*/}
        {/*//             {keyword ?*/}
        {/*//*/}
        {/*//                 (products &&products.length > 0) ? (*/}
        {/*//*/}
        {/*//                 <div className="ml-5 w-100">*/}
        {/*//*/}
        {/*//                     <div className="d-block d-sm-block d-md-block d-lg-block d-xl-block d-xxl-block fs-5">*/}
        {/*//                         {(keywordQuery && filterQuery) &&*/}
        {/*//                             <Breadcrumb>*/}
        {/*//                                 <Breadcrumb.Item linkAs={Link} linkProps={{to:'/'}}>Главная</Breadcrumb.Item>*/}
        {/*//                                 <Breadcrumb.Item linkAs={Link} linkProps={{to:`/?category=${categoryInProduct}`}}>*/}
        {/*//                                     {categoryInProduct}*/}
        {/*//                                 </Breadcrumb.Item>*/}
        {/*//                                 <Breadcrumb.Item linkAs={Link} linkProps={{to:`/?filter=${filterComponent}`}}>*/}
        {/*//                                     {filterComponent}*/}
        {/*//                                 </Breadcrumb.Item>*/}
        {/*//                                 <Breadcrumb.Item active>{keywordQuery}</Breadcrumb.Item>*/}
        {/*//                             </Breadcrumb>}*/}
        {/*//                         {(filterQuery && !keywordQuery) &&*/}
        {/*//                         <Breadcrumb>*/}
        {/*//                             <Breadcrumb.Item linkAs={Link} linkProps={{to:'/'}}>Главная</Breadcrumb.Item>*/}
        {/*//                             <Breadcrumb.Item linkAs={Link} linkProps={{to:`/?category=${categoryInProduct}`}}>*/}
        {/*//                                 {categoryInProduct}*/}
        {/*//                             </Breadcrumb.Item>*/}
        {/*//                             <Breadcrumb.Item active>{filterComponent}</Breadcrumb.Item>*/}
        {/*//                         </Breadcrumb>}*/}
        {/*//                         {(category && !keywordQuery) &&*/}
        {/*//                             <Breadcrumb>*/}
        {/*//                                 <Breadcrumb.Item linkAs={Link} linkProps={{to:'/'}}>Главная</Breadcrumb.Item>*/}
        {/*//                                 /!*<Breadcrumb.Item href="/?category={def}">*!/*/}
        {/*//                                 /!*    {categoryInProduct}*!/*/}
        {/*//                                 /!*</Breadcrumb.Item>*!/*/}
        {/*//                                 <Breadcrumb.Item active>{category}</Breadcrumb.Item>*/}
        {/*//                             </Breadcrumb>}*/}
        {/*//                         {(category && keywordQuery) &&*/}
        {/*//                             <Breadcrumb>*/}
        {/*//                                 <Breadcrumb.Item linkAs={Link} linkProps={{to:'/'}}>Главная</Breadcrumb.Item>*/}
        {/*//                                 <Breadcrumb.Item linkAs={Link} linkProps={{to:`/?category=${category}`}}>*/}
        {/*//                                     {category}*/}
        {/*//                                 </Breadcrumb.Item>*/}
        {/*//                                 <Breadcrumb.Item active>{keywordQuery}</Breadcrumb.Item>*/}
        {/*//                             </Breadcrumb>}*/}
        {/*//                         <ListGroup*/}
        {/*//                             horizontal="md"*/}
        {/*//                             className='d-flex me-0 pe-0'>*/}
        {/*//                             <ListGroupItem className='me-0 pe-0 d-flex'>*/}
        {/*//                                 <Button onClick={() => props.setNavShow(true)}>Каталог</Button>*/}
        {/*//                                 <Button className='d-none d-lg-block'*/}
        {/*//                                         variant={catalogView==='filter1' ? 'primary' : 'secondary'}*/}
        {/*//                                         onClick={showAllFilters}>*/}
        {/*//                                     Фильтры*/}
        {/*//*/}
        {/*//                                 </Button>*/}
        {/*//*/}
        {/*//                             </ListGroupItem>*/}
        {/*//                         </ListGroup>*/}
        {/*//                         { catalog[category] && catalogView !== 'filter1' &&*/}
        {/*//                         <ListGroup>*/}
        {/*//                             <div*/}
        {/*//                                 className="border-dark border-1 justify-content-center w-100 d-block d-lg-block d-xl-block d-xxl-block">*/}
        {/*//                                 <FormGroup className='border-1'>*/}
        {/*//                                     <FormLabel className='fs-3 fw-bold mb-2 text-right'>Категория</FormLabel>*/}
        {/*//                                     <div style={{'overflow': 'scroll', 'maxHeight': `10em`}}>*/}
        {/*//                                         {catalog[category].map((Val, id) => {*/}
        {/*//                                             return (*/}
        {/*//*/}
        {/*//                                                 <FormCheck*/}
        {/*//                                                     className="p-1 px-2 mx-5 btn fw-bold"*/}
        {/*//                                                     defaultChecked={Val === categorySelected}*/}
        {/*//                                                     type="switch"*/}
        {/*//                                                     label={Val}*/}
        {/*//                                                     name='Category'*/}
        {/*//                                                     key={id}*/}
        {/*//                                                     onChange={(e) => setCategorySelected(e.target.value)}*/}
        {/*//                                                     value={Val}*/}
        {/*//                                                 />*/}
        {/*//*/}
        {/*//*/}
        {/*//                                             );*/}
        {/*//*/}
        {/*//                                         })}*/}
        {/*//                                     </div>*/}
        {/*//                                 </FormGroup>*/}
        {/*//                             </div>*/}
        {/*//                         </ListGroup>*/}
        {/*//                         }*/}
        {/*//                         <ListGroup>*/}
        {/*//                             <ListGroupItem>*/}
        {/*//                             {(productList.vendorList && productList.vendorList.length > 0) &&*/}
        {/*//                                 <ButtonGroup>*/}
        {/*//                                     <Badge*/}
        {/*//                                         pill*/}
        {/*//                                         bg={vendorSelected ? 'primary' : 'secondary'}*/}
        {/*//                                         style={{'cursor': 'default'}}*/}
        {/*//*/}
        {/*//                                     ><span*/}
        {/*//                                         onClick={() => setVendorCanvasShow(true)}> {vendorSelected ? vendorSelected : 'Производитель'} </span>*/}
        {/*//                                         <Badge pill bg={vendorSelected ? 'primary' : 'secondary'}*/}
        {/*//                                                onClick={() => setVendorSelected('')}> &times;</Badge>*/}
        {/*//                                     </Badge>*/}
        {/*//                                 </ButtonGroup>*/}
        {/*//                             }*/}
        {/*//                             {(productList.collectionList && productList.collectionList.length > 0)  &&*/}
        {/*//                                     <Badge*/}
        {/*//                                         pill*/}
        {/*//                                         bg={collectionSelected ? 'primary' : 'secondary'}*/}
        {/*//                                         style={{'cursor': 'default'}}*/}
        {/*//*/}
        {/*//                                     ><span*/}
        {/*//                                         onClick={() => setCollectionCanvasShow(true)}> {collectionSelected ? collectionSelected : 'Коллекции'} </span>*/}
        {/*//                                         <Badge pill bg={collectionSelected ? 'primary' : 'secondary'}*/}
        {/*//                                                onClick={() => setCollectionSelected('')}> &times;</Badge>*/}
        {/*//                                     </Badge>*/}
        {/*//                             }*/}
        {/*//                             {(productList.materialList && productList.materialList.length > 0)  &&*/}
        {/*//                                     <Badge*/}
        {/*//                                         pill*/}
        {/*//                                         bg={materialSelected ? 'primary' : 'secondary'}*/}
        {/*//                                         style={{'cursor': 'default'}}*/}
        {/*//*/}
        {/*//                                     ><span*/}
        {/*//                                         onClick={() => setMaterialCanvasShow(true)}> {materialSelected ? materialSelected : 'Материал'} </span>*/}
        {/*//                                         <Badge pill bg={materialSelected ? 'primary' : 'secondary'}*/}
        {/*//                                                onClick={() => setMaterialSelected('')}> &times;</Badge>*/}
        {/*//                                     </Badge>*/}
        {/*//                             }*/}
        {/*//                             {(productList.colorList && productList.colorList.length > 0)  &&*/}
        {/*//                                     <Badge*/}
        {/*//                                         pill*/}
        {/*//                                         bg={colorSelected ? 'primary' : 'secondary'}*/}
        {/*//                                         style={{'cursor': 'default'}}*/}
        {/*//*/}
        {/*//                                     ><span*/}
        {/*//                                         onClick={() => setColorCanvasShow(true)}> {colorSelected ? colorSelected : 'Цвет'} </span>*/}
        {/*//                                         <Badge pill bg={colorSelected ? 'primary' : 'secondary'}*/}
        {/*//                                                onClick={() => setColorSelected('')}> &times;</Badge>*/}
        {/*//                                     </Badge>*/}
        {/*//                             }*/}
        {/*//                             {(productList.sizeList && productList.sizeList.length > 0)  &&*/}
        {/*//                                     <Badge*/}
        {/*//                                         pill*/}
        {/*//                                         bg={sizeSelected ? 'primary' : 'secondary'}*/}
        {/*//                                         style={{'cursor': 'default'}}*/}
        {/*//*/}
        {/*//                                     ><span*/}
        {/*//                                         onClick={() => setSizeCanvasShow(true)}> {sizeSelected ? sizeSelected : 'Размер'} </span>*/}
        {/*//                                         <Badge pill bg={sizeSelected ? 'primary' : 'secondary'}*/}
        {/*//                                                onClick={() => setSizeSelected('')}> &times;</Badge>*/}
        {/*//                                     </Badge>*/}
        {/*//                             }*/}
        {/*//                             {(productList.products.length > 0)  &&*/}
        {/*//                                 <Badge*/}
        {/*//                                     pill*/}
        {/*//                                     bg='primary'*/}
        {/*//                                     style={{'cursor': 'default'}}*/}
        {/*//*/}
        {/*//                                 ><span*/}
        {/*//                                     onClick={() => setPriceRangeCanvasShow(true)}>*/}
        {/*//                                     Цена </span>*/}
        {/*//                                     <Badge pill bg='primary'*/}
        {/*//                                            onClick={() => setPriceRange([0, productList.maxPrice])}> &times;</Badge>*/}
        {/*//                                 </Badge>*/}
        {/*//                             }*/}
        {/*//                             </ListGroupItem>*/}
        {/*//                         </ListGroup>*/}
        {/*//                         <ListGroup*/}
        {/*//*/}
        {/*//                             horizontal*/}
        {/*//                             className="justify-content-center d-block d-sm-block d-md-flex d-lg-flex d-xl-flex d-xxl-flex*/}
        {/*//                                         sorting text-center"*/}
        {/*//                         >*/}
        {/*//                             <ListGroup className='' horizontal>*/}
        {/*//                                 <ListGroupItem className="border-0 d-md-flex col-6" >*/}
        {/*//                                     <ButtonGroup className="btn-group mr-2 fs-5 border-0" >*/}
        {/*//                                         <Button variant="secondary" onClick={priceDefault}*/}
        {/*//                                                 className='px-1'>*/}
        {/*//                                             Цена*/}
        {/*//                                         </Button>*/}
        {/*//                                         <Button variant={priceSortUp ? "primary" : "secondary"}*/}
        {/*//                                             className=''>*/}
        {/*//                                             <FontAwesomeIcon icon={solid('arrow-up')}*/}
        {/*//                                                 onClick={OnPriceSortUp}*/}
        {/*//                                             />*/}
        {/*//                                         </Button>*/}
        {/*//                                         <Button variant={priceSortDown ? "primary" : "secondary"}*/}
        {/*//                                                 className=''>*/}
        {/*//                                             <FontAwesomeIcon icon={solid('arrow-down')}*/}
        {/*//                                                 onClick={OnPriceSortDown}*/}
        {/*//                                             />*/}
        {/*//                                         </Button>*/}
        {/*//                                     </ButtonGroup>*/}
        {/*//                                 </ListGroupItem>*/}
        {/*//                                 <ListGroupItem className="border-0 col-6">*/}
        {/*//                                     <ButtonGroup>*/}
        {/*//                                         <Button variant="secondary" onClick={nameDefault}*/}
        {/*//                                                 className='px-1'>*/}
        {/*//                                             Имя*/}
        {/*//                                         </Button>*/}
        {/*//                                         <Button variant={nameSortUp ? "primary" : "secondary"}*/}
        {/*//                                                 className=''>*/}
        {/*//                                             <FontAwesomeIcon icon={solid('arrow-up')}*/}
        {/*//                                                 onClick={OnNameSortUp}*/}
        {/*//                                             />*/}
        {/*//                                         </Button>*/}
        {/*//                                         <Button variant={nameSortDown ? "primary" : "secondary"}*/}
        {/*//                                                 className=''>*/}
        {/*//                                             <FontAwesomeIcon icon={solid('arrow-down')}*/}
        {/*//                                                 onClick={OnNameSortDown}*/}
        {/*//                                             />*/}
        {/*//                                         </Button>*/}
        {/*//                                     </ButtonGroup>*/}
        {/*//                                 </ListGroupItem>*/}
        {/*//                             </ListGroup>*/}
        {/*//                         </ListGroup>*/}
        {/*//                     </div>*/}
        {/*//                     {loading ? (*/}
        {/*//                         <Loader/>*/}
        {/*//                     ) : error ? (*/}
        {/*//                             <Message variant="danger">{error}</Message>*/}
        {/*//                         ) :*/}
        {/*//                         <div className="content justify-content-center">*/}
        {/*//                             /!*{(filter || category) ? (*!/*/}
        {/*//                             <div>*/}
        {/*//                                 <Row className='mb-4 mx-0 w-100 justify-content-center text-center'>*/}
        {/*//                                     {Array.from(products).map(*/}
        {/*//                                         (product) => (*/}
        {/*//                                             <Col*/}
        {/*//                                                 className='px-0'*/}
        {/*//                                                 key={product._id}*/}
        {/*//                                                 xs={12}*/}
        {/*//                                                 sm={6}*/}
        {/*//                                                 md={4}*/}
        {/*//                                                 lg={3}*/}
        {/*//                                                 xl={3}*/}
        {/*//                                             >*/}
        {/*//                                                 <Product*/}
        {/*//                                                     product={product}*/}
        {/*//                                                 />*/}
        {/*//                                             </Col>*/}
        {/*//                                         )*/}
        {/*//                                     )}*/}
        {/*//                                 </Row>*/}
        {/*//                                 <Paginate*/}
        {/*//                                     className='mt-2'*/}
        {/*//                                     page={page}*/}
        {/*//                                     pages={pages}*/}
        {/*//                                     keyword={keyword}*/}
        {/*//                                 />*/}
        {/*//                             </div>*/}
        {/*//                         </div>*/}
        {/*//                     }*/}
        {/*//                 </div>*/}
        {/*//                 ): (vendorSelected || collectionSelected || materialSelected || colorSelected || sizeSelected || products) &&*/}
        {/*//                  loading ? (*/}
        {/*//                      <Loader />*/}
        {/*//                  ) : error ? (*/}
        {/*//                          <Message variant="danger">{error}</Message>*/}
        {/*//                      ) :*/}
        {/*//                     <div className='justify-content-center'>*/}
        {/*//                         <p className='mt-5 text-center fs-2'>Товаров не найдено  </p>*/}
        {/*//                         <Button*/}
        {/*//                         onClick={HandleFiltersErase}*/}
        {/*//                         className='mt-5 text-center fs-2'*/}
        {/*//                         >*/}
        {/*//                             Сбросить фильтры*/}
        {/*//                         </Button>*/}
        {/*//                     </div> :''*/}
        {/*//                         }*/}
        {/*//             <BannersCarousel/>*/}
        {/*//             {(!keyword) &&*/}
        {/*//                 <div className='categories2'>*/}
        {/*//                     <NavLink className='categorySecond category6' to='/?category=Секс-мебель и качели'/>*/}
        {/*//                     <NavLink className='categorySecond category7' to='/?category=Секс-товары для женщин'/>*/}
        {/*//                     <NavLink className='categorySecond category11' to='/?category=Секс-товары для женщин'/>*/}
        {/*//                     <NavLink className='categorySecond category8' to='/?category=Секс-товары для мужчин'/>*/}
        {/*//                     <NavLink className='categorySecond category9' to='/?category=Нижнее белье'/>*/}
        {/*//                     <NavLink className='categorySecond category10' to='/?category=Купальники'/>*/}
        {/*//                 </div>*/}
        {/*//             }*/}
        {/*//*/}
        {/*//         </div>*/}
        {/*//*/}
        {/*//     </div>*/}
        {/*//     {(oppenedItems && oppenedItems.length > 0 && seenProducts) &&*/}
        {/*//         <>*/}
        {/*//         <div className='popular my-3'>*/}
        {/*//         <span className='mx-3 fs-4'>Вы смотрели</span>*/}
        {/*//         <div className='line'></div>*/}
        {/*//     </div>*/}
        {/*//         <SeenProductCarousel/>*/}
        {/*//         </>*/}
        {/*//     }*/}
        {/*//*/}
        {/*//     <div className='popular my-3'>*/}
        {/*//         <span className='mx-3 fs-4'>Популярное</span>*/}
        {/*//         <div className='line'></div>*/}
        {/*//     </div>*/}
        {/*//     <ProductCarousel/>*/}
        </div>
    );
}

export default HomeScreen