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
import {useSearchParams} from "next/navigation";

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
    const searchParams = useSearchParams();
    const [keyword, setKeyword] = useState('');


    useEffect(() => {
        history.isReady ? setIsLoading(false) : ''
    }, [])


    const submitHandler = () => {

    }
    return (
        <header-small classname='bg-dark'>
            <Container className="d-flex d-md-none justify-content-between align-items-center fixed-top header-small">
                <Link href="/" style={{'height': '70px', 'width': '160px'}}>
                    <Image priority className='logo' src={kuragi} alt='Магазин Куражи'/>
                </Link>
                <Form onSubmit={() => history.push(`/search?keyword=${keyword}`)} className="d-flex w-100 mx-3">
                    <FormControl
                    type="text"
                    name='keyword'
                    placeholder='Найти свой Кураж'
                    // value=''
                    onChange={(e) => {
                        setKeyword(e.target.value)
                    }}
                    />

                    <span onClick={() => {
                        if (keyword){
                        history.push(`/search?keyword=${keyword}`)}
                        else {}

                    }} className='position-relative'
                          style={{'top': '8px', 'right': '30px', 'fontSize': '13px'}}><FontAwesomeIcon
                        icon={faMagnifyingGlass}/></span>
                </Form>

            </Container>
        </header-small>
    )
}

export default HeaderSmall