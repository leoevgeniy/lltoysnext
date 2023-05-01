import React, {useEffect, useState} from 'react'
import Link from 'next/link'
import {Container, NavDropdown} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFaceSmile, faHouse, faStream} from "@fortawesome/free-solid-svg-icons";
import {useRouter} from "next/router";
import Offcanvas from "react-bootstrap/Offcanvas";
import Loader from "@/components/Loader";
import Message from "@/components/Message";
import Accordion from "react-bootstrap/Accordion";
import {listCatalog} from "@/redux/actions/productAction";
import {useDispatch, useSelector} from "react-redux";

function FooterSmall() {
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(true)

    const userLogin = useSelector((state) => state.userLogin);
    const {catalog, error, loading} = useSelector(
        (state) => state.catalogList
    );
    let {userInfo} = userLogin;

    const [expanded, setExpanded] = useState(false);

    const [show, setShow] = useState(false);

    const history = useRouter()
    let a = 0;
    let catalogItems = {}
    useEffect(() => {
        history.isReady ? setIsLoading(false) : ''
    }, [])

    if (catalog) {
        catalogItems = Object.entries(catalog)
    }

    const handleClose = () => {
        setShow(false)
        // props.setNavShow(false)
        setExpanded(false)
    };
    const handleShow = () => {
        setShow(true);
        dispatch(listCatalog());
    };
    const catalogFiltered = () => {
        setExpanded(false)
        setShow(false);
    };


    return (
            <Container className='d-flex d-md-none justify-content-between footer-small'>
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
                                                history.push(`/category/${item[0]}`).then(r => {
                                                })
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

                <div
                    onClick={() => history.push('/')}
                    className='text-white position-relative d-flex footer-small-icons '

                >
                    <FontAwesomeIcon icon={faHouse} style={{color: "#e5097f"}}/>
                    <span className='fs-6'>Главная </span>
                </div>
                {!isLoading &&

                    <div
                    onClick={handleShow}
                    className='text-white position-relative d-flex footer-small-icons '

                >
                    <FontAwesomeIcon icon={faStream} style={{color: "#e5097f"}}/>
                    <span className='fs-6'>Каталог </span>
                </div>}
                {!isLoading && userInfo &&

                    <div
                    onClick={() => history.push('/profile')}
                    className='text-white position-relative d-flex footer-small-icons'
                >

                    <FontAwesomeIcon icon={faFaceSmile} style={{color: "#e5097f"}}/>
                    {userInfo ? <span className='fs-6'>{userInfo.name.split(' ')[0]} </span> :
                        <span className='fs-6'>Войти</span>}
                </div>}
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
    )
}

export default FooterSmall