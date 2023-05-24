import {Navbar, Container, Nav, Badge, Form, FormControl, Modal, Offcanvas} from "react-bootstrap";
import Image from "next/image";
import kuragi from "@/public/Kuragi.png";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faFilter,
    faMagnifyingGlass
} from "@fortawesome/free-solid-svg-icons";
import {useSelector} from "react-redux";
import {useSearchParams} from "next/navigation";

const HeaderSmall = (setShow) => {
    const history = useRouter()
    const params = useSearchParams()
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
            <Container className="d-flex d-md-none justify-content-start align-items-center fixed-top header-small" style={{height: '70px'}}>
                <Link href="/" style={{'height': '50px', 'width': '100px'}}>
                    <Image priority className='logo' src={kuragi} alt='Магазин Куражи'/>
                </Link>
                <Form onSubmit={() => history.push(`/search?keyword=${keyword}`)} className="d-flex w-75 ml-1">
                    <FormControl
                        type="text"
                        name={`keyword`}
                        placeholder='Найти свой Кураж'
                        // value=''
                        onChange={(e) => {
                            setKeyword(e.target.value)
                        }}
                    />

                    <span onClick={() => {
                        if (keyword) {
                            history.push(`/search?keyword=${keyword}`)
                        } else {
                        }

                    }} className='position-relative'
                          style={{'top': '8px', 'right': '30px', 'fontSize': '13px'}}><FontAwesomeIcon
                        icon={faMagnifyingGlass}/></span>
                </Form>
                <div
                    style={{width: '50px'}}
                ></div>
            </Container>
        </header-small>
    )
}

export default HeaderSmall