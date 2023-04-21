import Offcanvas from "react-bootstrap/Offcanvas";
import Loader from "@/components/Loader";
import Message from "@/components/Message";
import Accordion from "react-bootstrap/Accordion";
import Link from "next/link";
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {router} from "next/client";


const CatalogCanvas = () => {
    const {expandedFilter, setExpandedFilter} = useState(false);
    const [expanded, setExpanded] = useState(false);


    const {catalog, error, loading} = useSelector(
        (state) => state.catalogList
    );
    const [show, setShow] = useState(false);


    let catalogItems = {}
    if (catalog) {
        catalogItems = Object.entries(catalog)
    }
    const handleClose = () => {
        setShow(false)
        // props.setNavShow(false)
        // props.setExpanded(false)
    };
    const catalogFiltered = () => {
        setExpanded(false)
        setShow(false);
        // props.setNavShow(true)
    };

    return (
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
                <Accordion defaultActiveKey='0' key={1}>
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
    )
}

export default CatalogCanvas;