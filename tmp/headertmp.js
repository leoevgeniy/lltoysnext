import {Badge, Container, Nav, Navbar} from "react-bootstrap";
import Image from "next/image";
import kuragi from "@/public/Kuragi.png";
import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBarsStaggered, faCartShopping} from "@fortawesome/free-solid-svg-icons";
import SearchBox from "@/components/SearchBox";
import React from "react";
{/*<Navbar*/}
{/*    bg="dark"*/}
{/*    style={{'height': '30px'}}*/}
{/*    className=''*/}
{/*>*/}
{/*    <Container className='justify-content-start'>*/}
{/*        <Navbar.Text className style={{'color': 'white', 'fontSize': '15px', 'display': 'flex'}}>*/}
{/*            <Image src={phone} alt='телефон' style={{'width': 'auto', 'height': 'auto'}}/>*/}
{/*            <i className='pl-1'> | +7 (995) 131-08-12</i>*/}
{/*        </Navbar.Text>*/}
{/*    </Container>*/}
{/*    <Container className='justify-content-end text-white fs-6'>*/}
{/*        {!isLoading && userInfo ? (*/}
{/*            <NavDropdown*/}
{/*                title={userInfo.name.split(' ')[0]}*/}
{/*                id="username"*/}
{/*                className='text-center px-3 ms-auto'*/}
{/*            >*/}

{/*                <NavDropdown.Item onClick={() => {*/}
{/*                    setExpanded(false)*/}
{/*                    history.push('/profile')*/}
{/*                }}*/}
{/*                                  className='text-center'>*/}
{/*                    Профиль*/}
{/*                </NavDropdown.Item>*/}

{/*                <NavDropdown.Item onClick={logoutHendler} className='text-center'>*/}
{/*                    Выйти*/}
{/*                </NavDropdown.Item>*/}
{/*            </NavDropdown>*/}
{/*        ) : (*/}
{/*            <Link*/}
{/*                href={'/login'}*/}
{/*                className='text-decoration-none text-white fs-6'*/}
{/*            >Войти</Link>*/}
{/*        )}*/}

{/*        {!isLoading && userInfo && userInfo.isAdmin && (*/}
{/*            <NavDropdown title="Админ" id="adminmenu" className='text-center d-block'>*/}

{/*                <NavDropdown.Item onClick={() => history.push("/admin/userlist")}>*/}
{/*                    Пользователи*/}
{/*                </NavDropdown.Item>*/}


{/*                <NavDropdown.Item onClick={() => history.push("/admin/productlist")}>*/}
{/*                    Товары*/}
{/*                </NavDropdown.Item>*/}


{/*                <NavDropdown.Item onClick={() => {*/}
{/*                    history.push("/admin/orderlist")*/}
{/*                }}>*/}
{/*                    Заказы*/}
{/*                </NavDropdown.Item>*/}

{/*            </NavDropdown>*/}
{/*        )}*/}


{/*    </Container>*/}
{/*</Navbar>*/}
<Navbar
    bg='#e5097f'
    expand="md"
    collapseOnSelect
    expanded={expanded}
    className='navbar-custom'
    style={expanded ? {'height': 'auto'} : {'height': '100px'}}

>
    <Container className={expanded ? "d-flex justify-content-end" : "d-flex "}>
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
        <Nav className='d-flex s'>


        </Nav>
        <Navbar.Collapse id="navbarScroll"
            // className='d-flex justify-content-around'
        >
            <Navbar.Brand className='align-self-center' style={{'height': '70px', 'width': '100px'}}
                          onClick={() => {
                              setExpanded(false)
                              history.push("/")
                          }}>


                {/*    /!*<Navbar.Brand>МАГАЗИН РАДОСТИ</Navbar.Brand>*!/*/}
                <Image priority className='logo' src={kuragi} alt='Магазин Куражи'/>
            </Navbar.Brand>
            <Link
                href='#'
                onClick={handleShow}
                className='align-self-center align-items-center text-white'
                style={!expanded ? {'fontSize': '15px', 'padding-left': '3px'} : ''}
            >
                <FontAwesomeIcon icon={faBarsStaggered}/>
                <span className='pl-3'
                      style={!expanded ? {'fontSize': '15px', 'padding-left': '3px'} : ''}>Каталог</span>
            </Link>


            <SearchBox/>
            {expanded && <Nav className={expanded ? 'justify-content-end' : ''}>

                <Nav.Item>
                    <Container
                        className='d-flex position-relative '>
                        <Link
                            href='/cart'
                            className='text-decoration-none text-white'
                            style={!expanded ? {'fontSize': '15px'} : ''}
                        >{(cart && cart.cartItems) ? cart.cartItems.length : 0} товаров
                            | {(cart && cart.cartItems) ? cart.cartItems
                                .reduce((acc, item) => acc + item.price * item.qty, 0)
                                .toFixed(0) : 0} руб.</Link>


                    </Container>
                </Nav.Item>
            </Nav>}


        </Navbar.Collapse>

        {!expanded &&
            <Navbar.Brand className='d-block d-sm-block d-md-none d-lg-none d-xl-none d-xxl-none'
                          style={{'height': '70px', 'width': '100px'}}>
                <Link href="/" onClick={() => setExpanded(false)} className='ms-auto'>
                    <Image className='logo' src={kuragi} alt='Магазин Куражи'/>
                </Link>
            </Navbar.Brand>
        }
        <div className='d-inline-block'>
            <Container
                className='d-flex'>
                <Link
                    href='/cart'
                    className='text-decoration-none text-white'
                    style={!expanded ? {'fontSize': '15px'} : ''}
                >{(cart && cart.cartItems) ? cart.cartItems.length : 0} товаров
                    | {(cart && cart.cartItems) ? cart.cartItems
                        .reduce((acc, item) => acc + item.price * item.qty, 0)
                        .toFixed(0) : 0} руб.</Link>


            </Container>
            <Link href={'/cart'} className='position-relative float-end'>

                <FontAwesomeIcon icon={faCartShopping} className='text-white'/>


                <Badge pill bg='success' className='position-absolute'
                       style={{'top': '-5px', 'right': '-12px', 'fontSize': '13px'}}>
                    {cart && cart.cartItems ? cart.cartItems.length : '0'}
                </Badge>
            </Link>
        </div>
    </Container>
</Navbar>
