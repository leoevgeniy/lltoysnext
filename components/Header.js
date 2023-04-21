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
import phone from '@/public/telephone-fill.svg'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBarsStaggered, faCartShopping, faListUl} from "@fortawesome/free-solid-svg-icons";

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
        router.isReady && setIsLoading(false)
    }, [show])
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
        <Container className='header' style={{'width': '100%'}}>
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
                                        <p className='firstTitle'>{item[0]}</p>
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
                <Container className='justify-content-start'>
                    <Navbar.Text className style={{'color': 'white', 'fontSize': '15px', 'display': 'flex'}}>
                        <Image src={phone} alt='телефон' style={{'width': 'auto', 'height':'auto'}}/>
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
                style={expanded ? {'height': 'auto'} : {'height': '80px'}}

            >
                <Container className={expanded ? "d-flex justify-content-end" : "d-flex"}>
                    {/*{!expanded &&*/}
                    {/*    <Navbar.Brand className='d-block d-sm-block d-md-none d-lg-none d-xl-none d-xxl-none' style={{'height': '50px', 'width': '80px'}} >*/}
                    {/*        <Link href="/" onClick={() => setExpanded(false)} className='ms-auto' >*/}
                    {/*            /!*    /!*<Navbar.Brand>МАГАЗИН РАДОСТИ</Navbar.Brand>*!/*!/*/}
                    {/*            <Image className='logo' src={kuragi} alt='Магазин Куражи' />*/}
                    {/*        </Link>*/}
                    {/*    </Navbar.Brand>*/}
                    {/*}*/}
                    <Navbar.Toggle
                        style={expanded ? {'boxShadow': '0 0 0 var(--bs-navbar-toggler-focus-width)'} : {"boxShadow": "none"}}
                        aria-controls="navbarScroll" onClick={() => setExpanded(expanded ? false : "expanded")}/>

                    <Navbar.Collapse id="navbarScroll" className='d-flex'>

                        <Nav className='d-flex s'>
                            <Navbar.Brand className='align-self-center' style={{'height': '70px', 'width': '100px'}} onClick={() => {
                                setExpanded(false)
                                history.push("/")
                            }}>


                                {/*    /!*<Navbar.Brand>МАГАЗИН РАДОСТИ</Navbar.Brand>*!/*/}
                                <Image priority className='logo' src={kuragi} alt='Магазин Куражи'/>
                            </Navbar.Brand>

                            <Link href='#' onClick={handleShow} className='align-self-center align-items-center text-white pl-3'>
                                <FontAwesomeIcon icon={faBarsStaggered} />
                                <span className='pl-3'>Каталог</span>
                            </Link>

                        </Nav>

                        <SearchBox/>
                        <Nav className='pr-5'>

                            <Nav.Item>
                                <Container className='justify-content-end text-white fs-6'>

                                </Container >
                                <Container
                                    className='d-flex position-relative '>
                                    <Link href='/cart' className='text-decoration-none fs-5 text-white'>{(cart && cart.cartItems) ? cart.cartItems.length : 0} товаров | {(cart && cart.cartItems) ? cart.cartItems
                                        .reduce((acc, item) => acc + item.price * item.qty, 0)
                                        .toFixed(0) : 0} руб.</Link>



                                </Container>
                            </Nav.Item>
                        </Nav>


                    </Navbar.Collapse>
                    {!expanded &&
                        <Navbar.Brand className='d-block d-sm-block d-md-none d-lg-none d-xl-none d-xxl-none' style={{'height': '70px', 'width': '100px'}} >
                            <Link href="/" onClick={() => setExpanded(false)} className='ms-auto' >
                                <Image className='logo' src={kuragi} alt='Магазин Куражи' />
                            </Link>
                        </Navbar.Brand>
                    }
                        <Link href={'/cart'} className='position-relative float-end'>
                            <FontAwesomeIcon icon={faCartShopping} className='text-white'/>


                            <Badge pill bg='success' className='position-absolute'
                                   style={{'top': '-5px', 'right': '-12px', 'fontSize': '13px'}}>
                                {cart && cart.cartItems ? cart.cartItems.length : '0'}
                            </Badge>
                        </Link>

                </Container>
            </Navbar>

        </Container>
    );
}

// export default Header;
