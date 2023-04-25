import React, {useEffect, useState} from "react";
import {useRouter} from 'next/router'
import {useDispatch, useSelector} from "react-redux";
import Offcanvas from "react-bootstrap/Offcanvas";
import {Navbar, Nav, Container, NavDropdown, NavLink, Badge, Button} from "react-bootstrap";
import Image from 'next/image'
import Accordion from "react-bootstrap/Accordion";
import Link from "next/link";
import {logout} from "@/redux/actions/userActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {listCatalog} from "@/redux/actions/productAction";
import SearchBox from "./SearchBox";
import kuragi from '@/public/Kuragi.png'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBarsStaggered, faCartShopping, faListUl, faPhone} from "@fortawesome/free-solid-svg-icons";

export default function Header(props) {
    const cart = useSelector(state => state.cart)
    // const [navShow, setNavShow] = useState(false);

    const {cartItems} = cart

    const history = useRouter()
    const [expanded, setExpanded] = useState(false);
    const userLogin = useSelector((state) => state.userLogin);
    const {catalog, error, loading} = useSelector(
        (state) => state.catalogList
    );
    let {userInfo} = userLogin;
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true)
    const [expandedFilter, setExpandedFilter] = useState(false)


    useEffect(() => {
        router.isReady ? setIsLoading(false) : ''
    }, [])
    const handleClose = () => {
        setShow(false)
        // props.setNavShow(false)
        setExpanded(false)
    };
    const handleShow = (e) => {
        e.preventDefault()
        setShow(true);
        dispatch(listCatalog());
    };
    const logoutHendler = () => {
        dispatch(logout())
        setExpanded(false)
        history.push('/')

    };
    let a = 0;
    let catalogItems = {}
    if (catalog) {
        catalogItems = Object.entries(catalog)
    }
    const catalogFiltered = () => {
        setExpanded(false)
        setShow(false);
    };

    return (
        <Container className='header position-sticky' style={{'width': '100%'}}>
            <Offcanvas show={show} onHide={handleClose} className='catalog'>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Каталог</Offcanvas.Title>
                </Offcanvas.Header>
                {loading ? (
                    <Loader/>
                ) : error ? (
                    <Message/>
                ) : (
                    <Offcanvas.Body>
                        <Accordion defaultActiveKey={a} key={1}>
                            {catalogItems.map((item, n) => (
                                <Accordion.Item eventKey={n} key={n}>
                                    <Accordion.Header key={n}>
                                        <p onClick={() => {
                                            catalogFiltered()
                                            history.push(`/category/${item[0]}`).then(r => {})
                                        }} className='firstTitle'>{item[0]}</p>
                                    </Accordion.Header>
                                    {item[1].map((subItem, i) => (
                                        <Accordion.Body key={i}>
                                            <Link
                                                key={i}
                                                onClick={catalogFiltered}
                                                href={`/category/${item[0]}/${subItem}`}
                                            >
                                                {/*  */}
                                                <span style={{color: '#1f2326'}} className='subTitle'>{subItem}</span>
                                                {/*  */}
                                            </Link>
                                        </Accordion.Body>
                                    ))}
                                </Accordion.Item>
                            ))}
                        </Accordion>
                    </Offcanvas.Body>
                )}
            </Offcanvas>
            <Navbar
                bg="dark"
                style={{'height': '30px'}}
                className=''
            >
                <Container className='justify-content-start align-content-center'>
                    <Navbar.Text style={{'color': 'white', 'fontSize': '15px', 'display': 'flex'}}>
                        {/*<Image src={phone} alt='телефон' style={{'width': 'auto', 'height': 'auto'}}/>*/}
                        <FontAwesomeIcon icon={faPhone} className='text-center'/>
                        <i className='pl-1'> | +7 (995) 131-08-12</i>
                    </Navbar.Text>
                </Container>
                <Container className='justify-content-end text-white fs-6'>
                    {!isLoading && userInfo ? (
                        <NavDropdown
                            title={userInfo.name.split(' ')[0]}
                            id="username"
                            className='text-center px-3 ms-auto'
                        >

                            <NavDropdown.Item onClick={() => {
                                setExpanded(false)
                                history.push('/profile')
                            }}
                                              className='text-center'>
                                Профиль
                            </NavDropdown.Item>

                            <NavDropdown.Item onClick={logoutHendler} className='text-center'>
                                Выйти
                            </NavDropdown.Item>
                        </NavDropdown>
                    ) : (
                        <Link
                            href={'/login'}
                            className='text-decoration-none text-white fs-6'
                        >Войти</Link>
                    )}

                    {!isLoading && userInfo && userInfo.isAdmin && (
                        <NavDropdown title="Админ" id="adminmenu" className='text-center d-block'>

                            <NavDropdown.Item onClick={() => history.push("/admin/userlist")}>
                                Пользователи
                            </NavDropdown.Item>


                            <NavDropdown.Item onClick={() => history.push("/admin/productlist")}>
                                Товары
                            </NavDropdown.Item>


                            <NavDropdown.Item onClick={() => {
                                history.push("/admin/orderlist")
                            }}>
                                Заказы
                            </NavDropdown.Item>

                        </NavDropdown>
                    )}


                </Container>
            </Navbar>
            <Navbar
                bg='#e5097f'
                expand="md"
                collapseOnSelect
                expanded={expanded}
                className='navbar-custom w-100'
                style={expanded ? {'height': 'auto'} : {'height': 'auto'}}

            >
                <Container className={expanded ? "d-flex justify-content-start" : "d-flex"}>

                    <Navbar.Toggle
                        style={expanded ? {'boxShadow': '0 0 0 var(--bs-navbar-toggler-focus-width)'} : {"boxShadow": "none"}}
                        aria-controls="navbarScroll" onClick={() => setExpanded(expanded ? false : "expanded")}/>

                    <Navbar.Collapse id="navbarScroll">

                        <Nav className='d-none justify-content-around d-md-flex'>
                            <Navbar.Brand className='align-self-center' style={{'height': '70px', 'width': '100px'}}
                                          onClick={() => {
                                              setExpanded(false)
                                              history.push("/")
                                          }}>


                                {/*    /!*<Navbar.Brand>МАГАЗИН РАДОСТИ</Navbar.Brand>*!/*/}
                                <Image priority className='logo' src={kuragi} alt='Магазин Куражи'/>
                            </Navbar.Brand>

                            <Link href='#' onClick={handleShow}
                                  className='align-self-center align-items-center text-white pl-3'>
                                <FontAwesomeIcon icon={faBarsStaggered}/>
                                <span className='pl-3'>Каталог</span>
                            </Link>

                        </Nav>


                    </Navbar.Collapse>
                    <Navbar.Brand className='d-block d-sm-block d-md-none d-lg-none d-xl-none d-xxl-none'
                                  style={{'height': '70px', 'width': '100px'}}>
                        <Link href="/" onClick={() => setExpanded(false)} className='ms-auto'>
                            <Image priority className='logo' src={kuragi} alt='Магазин Куражи'/>
                        </Link>
                    </Navbar.Brand>
                    {<Link href='#' onClick={handleShow}
                           className='align-self-center align-items-center text-white pl-3 d-flex d-md-none'>
                        <FontAwesomeIcon icon={faBarsStaggered}/>
                        <span className='pl-3'>Каталог</span>
                    </Link>}
                    <SearchBox/>
                    <Nav
                        className='d-flex position-relative d-none d-lg-flex '>
                        {!isLoading && <Link href='/cart'
                                             className='text-decoration-none fs-5 text-white '>{(cart && cart.cartItems) ? cartItems.reduce((acc, item) => acc + Number(item.qty), 0) : 0} товаров
                            | {(cart && cart.cartItems) ? cart.cartItems
                                .reduce((acc, item) => acc + item.price * item.qty, 0)
                                .toFixed(0) : 0} руб.</Link>}


                    </Nav>
                    <Link href={'/cart'} className='position-relative float-end'>
                        <FontAwesomeIcon id='cart' icon={faCartShopping} className='text-white'/>


                        {!isLoading && <Badge pill bg='success' className='position-absolute'
                                              style={{'top': '-5px', 'right': '-12px', 'fontSize': '13px'}}>
                            {cart && cart.cartItems ? cartItems.reduce((acc, item) => acc + Number(item.qty), 0) : '0'}
                        </Badge>}
                    </Link>

                </Container>
            </Navbar>

        </Container>
    );
}

// export default Header;
