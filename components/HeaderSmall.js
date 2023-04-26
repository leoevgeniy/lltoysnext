import {Navbar, Container, Nav, Badge, Form, FormControl} from "react-bootstrap";
import Image from "next/image";
import kuragi from "@/public/Kuragi.png";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faBarsStaggered,
    faBriefcase,
    faCartShopping,
    faFaceSmile,
    faMagnifyingGlass
} from "@fortawesome/free-solid-svg-icons";
import SearchBox from "@/components/SearchBox";
import {useSelector} from "react-redux";

const HeaderSmall = () => {
    const history = useRouter()
    const [isLoading, setIsLoading] = useState(true)
    const cart = useSelector(state => state.cart)
    const {cartItems} = cart
    const userLogin = useSelector((state) => state.userLogin);
    const {catalog, error, loading} = useSelector(
        (state) => state.catalogList
    );
    let {userInfo} = userLogin;
    const [keyword, setKeyword] = useState("");


    useEffect(() => {
        history.isReady ? setIsLoading(false) : ''
    }, [])


    const submitHandler = () => {

    }
    return (
        <header-small >
            <Container className="d-flex d-md-none justify-content-between bg-primary align-items-center fixed-top">
                <Link href="/" style={{'height': '70px', 'width': '120px'}}>
                    <Image priority className='logo' src={kuragi} alt='Магазин Куражи'/>
                </Link>
                <Form onSubmit={() => history.push(`/search?keyword=${keyword}`)} className="d-flex">
                    <FormControl
                        type="text"
                        name="keyword"
                        placeholder='Найти свой Кураж'
                        value={keyword}
                        onChange={(e) => {
                            setKeyword(e.target.value)
                        }}
                    ></FormControl>

                    <span onClick={() => history.push(`/search?keyword=${keyword}`)} className='position-relative'
                          style={{'top': '8px', 'right': '30px', 'fontSize': '13px'}}><FontAwesomeIcon
                        icon={faMagnifyingGlass}/></span>
                </Form>

                {!isLoading &&
                    <Link href={'/cart'} className='position-relative float-end cart text-white'>
                        <FontAwesomeIcon id='cart' icon={faCartShopping} className='text-white'/>
                        <span className='fs-6'>Корзина</span>
                        {!isLoading && <Badge pill bg='danger' className='position-absolute'
                                              style={{'top': '-5px', 'right': '0px', 'fontSize': '13px'}}>
                            {cart && cart.cartItems ? cartItems.reduce((acc, item) => acc + Number(item.qty), 0) : '0'}
                        </Badge>}
                    </Link>
                }
            </Container>
        </header-small>
    )
}

export default HeaderSmall