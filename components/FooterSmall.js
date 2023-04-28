import React from 'react'
import Link from 'next/link'
import {Container, Row, Col} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBriefcase, faHouse} from "@fortawesome/free-solid-svg-icons";
import {useRouter} from "next/router";

function FooterSmall() {
    const history = useRouter()
    return (
            <Container className='d-flex d-md-none justify-content-between footer-small'>
                <div
                    onClick={() => history.push('/')}
                    className='text-white position-relative d-flex footer-small-icons '

                >
                    <FontAwesomeIcon icon={faHouse} style={{color: "#e5097f",}}/>
                    <span className='fs-6'>Главная </span>
                </div>

            </Container>
    )
}

export default FooterSmall