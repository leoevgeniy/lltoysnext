import React, {useEffect, useState} from "react";
import {useRouter} from 'next/router'
import {useDispatch, useSelector} from "react-redux";
import Offcanvas from "react-bootstrap/Offcanvas";
import {Navbar, Nav, Container, NavDropdown, NavLink, Badge} from "react-bootstrap";
import Image from 'next/image'
import Accordion from "react-bootstrap/Accordion";
import Link from "next/link";
import {logout} from "@/redux/actions/userActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {listCatalog} from "@/redux/actions/productAction";
import SearchBox from "./SearchBox";
import kuragi from '../public/Kuragi.png'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {icon, solid} from '@fortawesome/fontawesome-svg-core/import.macro'


export default function Header(props) {
    const cart = useSelector(state => state.cart)
    const {cartItems} = cart
    const history = useRouter()
    const [expanded, setExpanded] = useState(false);
    const {expandedFilter, setExpandedFilter} = props;
    const userLogin = useSelector((state) => state.userLogin);
    const {catalog, error, loading} = useSelector(
        (state) => state.catalogList
    );
    const {userInfo} = userLogin;
    const dispatch = useDispatch();
    const [show, setShow] = useState(props.navShow);
    // const [navShow, setNavShow] = useState(false);
    useEffect(() => {
        setShow(props.navShow)
    }, [props.navShow])
    const handleClose = () => {
        setShow(false)
        props.setNavShow(false)
        setExpanded(false)
    };
    const handleNavClose = () => props.setNavShow(false);
    const handleShow = () => {
        setShow(true);
        dispatch(listCatalog());
    };
    const handleNavShow = () => {
        props.setNavShow(true);
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
        // props.setNavShow(true)
    };

    return (
        <header className='header' style={{'width': '100%'}}>
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
                                                href={`/?filter=${subItem}`}
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
                // bg="dark"
                // variant="dark"
                bg='#e5097f'
                expand="md"
                collapseOnSelect
                expanded={expanded}
                className='navbar-custom w-100'
                // bsPrefix='main_bar'
                // fixed='top'
            >
                <Container className={expanded ? "d-flex justify-content-end" : "d-flex"}>
                    {!expanded &&
                        <Navbar.Brand className='d-block d-sm-block d-md-none d-lg-none d-xl-none d-xxl-none logo w-50'>
                            <Link href="/" onClick={() => setExpanded(false)} className='ms-auto'>
                                {/*    /!*<Navbar.Brand>МАГАЗИН РАДОСТИ</Navbar.Brand>*!/*/}
                                <Image priority className='logo' src={kuragi} alt='Магазин Куражи'/>
                            </Link>
                        </Navbar.Brand>
                    }
                    <Navbar.Toggle
                        style={expanded ? {'boxShadow': '0 0 0 var(--bs-navbar-toggler-focus-width)'} : {"boxShadow": "none"}}
                        aria-controls="navbarScroll" onClick={() => setExpanded(expanded ? false : "expanded")}/>

                    <Navbar.Collapse id="navbarScroll" className='text-center'>

                        <Nav className='d-flex'>
                            <Navbar.Brand className='align-self-center' onClick={() => {
                                setExpanded(false)
                                history.push("/")
                            }}>
                                    {/*    /!*<Navbar.Brand>МАГАЗИН РАДОСТИ</Navbar.Brand>*!/*/}
                                    <Image priority className='img-fluid logo' src={kuragi} alt='Магазин Куражи'/>
                            </Navbar.Brand>
                            <Nav.Link onClick={handleShow} className='align-self-center fs-2 catalog'>
                                {/*<i className=" links fa-solid fa-list"></i> */}

                                КАТАЛОГ
                            </Nav.Link>

                        </Nav>

                        <SearchBox/>

                        <div
                            className="mr-0 my-2 my-lg-0 links d-flex align-content-center"
                            style={{maxHeight: "100px", 'color': 'white'}}
                            // navbarScroll
                        >
                            <Nav className='d-flex mr-4 my-auto'>
                                <Link href='cart/' className='ms-auto' style={{'color': 'white', 'width': '30px'}}>
                                    <FontAwesomeIcon icon={solid("cart-shopping")} />
                                    {cart && cartItems && cartItems.length>0 && <Badge className='cartBadge text-center' style={{}} bg='primary'>{cart.cartItems.length}</Badge>}
                                </Link>

                            </Nav>
                            {userInfo ? (
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
                                        {/*<Link href="" >*/}
                                            Профиль
                                        {/*</Link>*/}
                                    </NavDropdown.Item>

                                    <NavDropdown.Item onClick={logoutHendler} className='text-center'>
                                        Выйти
                                    </NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <Link href="/login" className='mx-auto' style={{'color': 'white', 'width': '30px'}}>
                                    <FontAwesomeIcon icon={icon({name: 'user'})} />

                                </Link>
                            )}

                            {userInfo && userInfo.isAdmin && (
                                <NavDropdown title="Админ" id="adminmenu" className='text-center d-block'>

                                    <NavDropdown.Item onClick={() => history.push("/admin/userlist")}>
                                    {/*    <Link href="/admin/userlist">*/}
                                            Пользователи
                                        {/*</Link>*/}
                                    </NavDropdown.Item>


                                    <NavDropdown.Item onClick={() => history.push("/admin/productlist")}>
                                        {/*<Link href="/admin/productlist">*/}
                                            Товары
                                        {/*</Link>*/}
                                    </NavDropdown.Item>


                                    <NavDropdown.Item onClick={() => {
                                        history.push("/admin/orderlist")
                                    }}>
                                    {/*    <Link href="/admin/orderlist">*/}
                                            Заказы
                                        {/*</Link>*/}
                                    </NavDropdown.Item>

                                </NavDropdown>
                            )}
                        </div>


                    </Navbar.Collapse>

                </Container>
                {/*</Navbar>*/}
                {/*<Navbar*/}
                {/*    bg='#e5097f'*/}
                {/*    expand="md"*/}
                {/*    datatype='filter'*/}
                {/*    collapseOnSelect*/}
                {/*    expanded={expanded}*/}
                {/*    className='navbar-custom w-100 d-block'>*/}
                {/*    <Navbar.Toggle style={expanded ? {'boxShadow': '0 0 0 var(--bs-navbar-toggler-focus-width)'}: {"boxShadow": "none"}} aria-controls="filterNav" onClick={() => setExpandedFilter(expandedFilter ? false : "expandedFilter")}/>*/}
            </Navbar>

        </header>
    );
}

// export default Header;
