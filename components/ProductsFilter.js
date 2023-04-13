import React, {useEffect, useState} from 'react'
import {useSelector} from "react-redux";
import {Checkbox} from "@mui/material";
import {ButtonToolbar, Form, FormCheck, FormControl, FormGroup, FormLabel, Navbar} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import Button from "react-bootstrap/Button";
import {listCatalog} from "../actions/productActions";
import {logout} from "../actions/userActions";

function ProductsFilter(props) {
    const [expanded, setExpanded] = useState(false);
    const [show, setShow] = useState(false);
    const [navShow, setNavShow] = React.useState(false);

    const handleClose = () => {
        setShow(false)
        setExpanded(false)
    };
    const handleNavClose = () => setNavShow(false);
    const handleNavShow = () => {
        props.setNavShow(true);
    };

    let category = ''

    const history = useHistory()
    const query = new URLSearchParams(history.location.search)
    if (query.get('category')) {
        category = query.get('category')
    }
    // if (query.get('filter')) {filterQuery = query.get('filter')}
    // if (query.get('keyword')) {keywordQuery = query.get('keyword')}

    const {vendorList, collectionList, materialList, colorList, sizeList} = useSelector((state) => state.productList)
    const {catalog} = useSelector((state) => state.catalogList)
    const [moreVendors, setMoreVendors] = useState(false)
    const [moreCollection, setMoreCollection] = useState(false)
    const [moreMaterial, setMoreMaterial] = useState(false)
    const [moreColor, setMoreColor] = useState(false)
    const [moreSize, setMoreSize] = useState(false)
    let catList = []
    // useEffect(() => {
    //
    //     if (catalog && category) {
    //         catList.push(catalog[category])
    //     }
    //     console.log(catalog[category], category)
    // },[catalog])
    const HandleFiltersErase = () => {
        setMoreVendors(false)
        props.setVendorSelected('')
        props.setCollectionSelected('')
        props.setMaterialSelected('')
        props.setColorSelected('')
        props.setSizeSelected('')
        props.setCategorySelected('')
        setMoreCollection(false)
        setMoreMaterial(false)
        setMoreColor(false)
        setMoreSize(false)
    }
    return (
        <>
            {(catalog[category] || (vendorList && vendorList.length > 0) || (collectionList) || materialList || colorList || sizeList) &&
                <div className='d-none d-sm-none d-lg-block' style={{'width': '30%'}}>
                    {(catalog[category] && !(props.vendorSelected || props.collectionSelected || props.materialSelected
                        || props.colorSelected || props.sizeSelected)) ?
                        <div
                            className="border-dark border-1 justify-content-center w-100 d-none d-sm-none d-md-none d-lg-block d-xl-block d-xxl-block">
                            <FormGroup className='border-1'>
                                <FormLabel className='fs-3 fw-bold mb-2 text-right'>Категория</FormLabel>
                                <div style={{'overflow': 'scroll', 'maxHeight': `10em`}}>
                                    {catalog[category].map((Val, id) => {
                                        return (

                                            <FormCheck
                                                className="p-1 px-2 mx-5 btn fw-bold"
                                                defaultChecked={Val === props.categorySelected}
                                                type="switch"
                                                label={Val}
                                                name='Category'
                                                key={id}
                                                onChange={(e) => props.setCategorySelected(e.target.value)}
                                                value={Val}
                                            />


                                        );

                                    })}
                                </div>
                            </FormGroup>
                        </div> : ''
                    }
                    {vendorList && vendorList.length > 0 &&
                        <div
                            className="border-dark border-1 justify-content-center w-100 d-none d-sm-none d-md-none d-lg-block d-xl-block d-xxl-block">
                            <FormGroup className='border-1'>
                                <FormLabel className='fs-3 fw-bold mb-2 text-right'>Производитель</FormLabel>
                                <div style={{'overflow': 'scroll', 'maxHeight': '10em'}}>
                                    {moreVendors ? vendorList.map((Val, id) => {
                                        return (

                                            <Form.Check
                                                className="p-1 px-2 mx-5 btn fw-bold"
                                                defaultChecked={Val === props.vendorSelected}
                                                type="checkbox"
                                                label={Val}
                                                name='vendorSelected'
                                                key={id}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        props.setVendorSelected(e.target.value)
                                                    } else if (!e.target.checked) {
                                                        props.setVendorSelected('')
                                                    }
                                                }}
                                                value={Val}
                                            />


                                        );

                                    }) : (
                                        <div className=''>
                                            {vendorList.slice(vendorList, 10).map((Val, id) =>


                                                <FormCheck
                                                    className="p-1 px-2 mx-5 btn fw-bold text-left"
                                                    defaultChecked={Val === props.vendorSelected}

                                                    type="checkbox"
                                                    label={Val}
                                                    name='vendorSelected'
                                                    key={id}
                                                    onChange={(e) => {
                                                        if (e.target.checked) {
                                                            props.setVendorSelected(e.target.value)
                                                        } else if (!e.target.checked) {
                                                            props.setVendorSelected('')
                                                        }
                                                    }}
                                                    value={Val}
                                                >
                                                </FormCheck>
                                            )}
                                            {vendorList.length > 10 &&
                                                <span
                                                    className="p-1 px-2 mx-5 btn link-dark text-right text-decoration-underline"
                                                    onClick={() => setMoreVendors(true)}
                                                >
                                    еще
                                </span>
                                            }
                                        </div>
                                    )}
                                </div>
                            </FormGroup>
                        </div>
                    }
                    {(collectionList && collectionList.length > 0) &&
                        <div
                            className="border-dark border-1 justify-content-center w-100 d-none d-sm-none d-md-none d-lg-block d-xl-block d-xxl-block">
                            <FormGroup className='border-1'>
                                <FormLabel className='fs-3 fw-bold mb-2 text-right'>Коллекция</FormLabel>
                                <div style={{'overflow': 'scroll', 'maxHeight': '10em'}}>
                                    {moreCollection ? collectionList.map((Val, id) => {
                                        return (

                                            <Form.Check
                                                className="p-1 px-2 mx-5 btn fw-bold"
                                                defaultChecked={Val === props.collectionSelected}
                                                type="checkbox"
                                                label={Val}
                                                name='collectionsSelected'
                                                key={id}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        props.setCollectionSelected(e.target.value)
                                                    } else if (!e.target.checked) {
                                                        props.setCollectionSelected('')
                                                    }
                                                }}
                                                value={Val}
                                            />


                                        );

                                    }) : (
                                        <div className=''>
                                            {collectionList.slice(collectionList, 10).map((Val, id) =>


                                                <FormCheck
                                                    className="p-1 px-2 mx-5 btn fw-bold text-left"
                                                    defaultChecked={Val === props.collectionSelected}

                                                    type="checkbox"
                                                    label={Val}
                                                    name='collectionSelected'
                                                    key={id}
                                                    onChange={(e) => {
                                                        if (e.target.checked) {
                                                            props.setCollectionSelected(e.target.value)
                                                        } else if (!e.target.checked) {
                                                            props.setCollectionSelected('')
                                                        }
                                                    }}
                                                    value={Val}
                                                >
                                                </FormCheck>
                                            )}
                                            {collectionList.length > 10 &&
                                                <span
                                                    className="p-1 px-2 mx-5 btn link-dark text-right text-decoration-underline"
                                                    onClick={() => setMoreCollection(true)}
                                                >
                                                    еще
                                                </span>
                                            }
                                        </div>
                                    )}
                                </div>
                            </FormGroup>
                        </div>
                    }
                    {(materialList && materialList.length > 0) &&
                        <div
                            className="border-dark border-1 justify-content-center w-100 d-none d-sm-none d-md-none d-lg-block d-xl-block d-xxl-block">
                            <FormGroup className='border-1'>
                                <FormLabel className='fs-3 fw-bold mb-2 text-right'>Материал</FormLabel>
                                <div style={{'overflow': 'scroll', 'maxHeight': '10em'}}>
                                    {moreMaterial ? materialList.map((Val, id) => {
                                        return (

                                            <Form.Check
                                                className="p-1 px-2 mx-5 btn fw-bold"
                                                defaultChecked={Val === props.materialSelected}
                                                type="checkbox"
                                                label={Val}
                                                name='materialSelected'
                                                key={id}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        props.setMaterialSelected(e.target.value)
                                                    } else if (!e.target.checked) {
                                                        props.setMaterialSelected('')
                                                    }
                                                }}
                                                value={Val}
                                            />


                                        );

                                    }) : (
                                        <div className=''>
                                            {materialList.slice(materialList, 10).map((Val, id) =>


                                                <FormCheck
                                                    className="p-1 px-2 mx-5 btn fw-bold text-left"
                                                    defaultChecked={Val === props.materialSelected}

                                                    type="checkbox"
                                                    label={Val}
                                                    name='materialSelected'
                                                    key={id}
                                                    onChange={(e) => {
                                                        if (e.target.checked) {
                                                            props.setMaterialSelected(e.target.value)
                                                        } else if (!e.target.checked) {
                                                            props.setMaterialSelected('')
                                                        }
                                                    }}
                                                    value={Val}
                                                >
                                                </FormCheck>
                                            )}
                                            {materialList.length > 10 &&
                                                <span
                                                    className="p-1 px-2 mx-5 btn link-dark text-right text-decoration-underline"
                                                    onClick={() => setMoreMaterial(true)}
                                                >
                                                    еще
                                                </span>
                                            }
                                        </div>
                                    )}
                                </div>
                            </FormGroup>
                        </div>
                    }
                    {(colorList && colorList.length > 0) &&
                        <div
                            className="border-dark border-1 justify-content-center w-100 d-none d-sm-none d-md-none d-lg-block d-xl-block d-xxl-block">
                            <FormGroup className='border-1'>
                                <FormLabel className='fs-3 fw-bold mb-2 text-right'>Цвет</FormLabel>
                                <div style={{'overflow': 'scroll', 'maxHeight': '10em'}}>
                                    {moreColor ? colorList.map((Val, id) => {
                                        return (

                                            <Form.Check
                                                className="p-1 px-2 mx-5 btn fw-bold"
                                                defaultChecked={Val === props.colorSelected}
                                                type="checkbox"
                                                label={Val}
                                                name='colorSelected'
                                                key={id}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        props.setColorSelected(e.target.value)
                                                    } else if (!e.target.checked) {
                                                        props.setColorSelected('')
                                                    }
                                                }}
                                                value={Val}
                                            />


                                        );

                                    }) : (
                                        <div className=''>
                                            {colorList.slice(colorList, 10).map((Val, id) =>


                                                <FormCheck
                                                    className="p-1 px-2 mx-5 btn fw-bold text-left"
                                                    defaultChecked={Val === props.colorSelected}

                                                    type="checkbox"
                                                    label={Val}
                                                    name='colorSelected'
                                                    key={id}
                                                    onChange={(e) => {
                                                        if (e.target.checked) {
                                                            props.setColorSelected(e.target.value)
                                                        } else if (!e.target.checked) {
                                                            props.setColorSelected('')
                                                        }
                                                    }}
                                                    value={Val}
                                                >
                                                </FormCheck>
                                            )}
                                            {colorList.length > 10 &&
                                                <span
                                                    className="p-1 px-2 mx-5 btn link-dark text-right text-decoration-underline"
                                                    onClick={() => setMoreColor(true)}
                                                >
                                                    еще
                                                </span>
                                            }
                                        </div>
                                    )}
                                </div>
                            </FormGroup>
                        </div>
                    }
                    {(sizeList && sizeList.length > 0) &&
                        <div
                            className="border-dark border-1 justify-content-center w-100 d-none d-sm-none d-md-none d-lg-block d-xl-block d-xxl-block">
                            <FormGroup className='border-1'>
                                <FormLabel className='fs-3 fw-bold mb-2 text-right'>Размер</FormLabel>
                                <div style={{'overflow': 'scroll', 'maxHeight': '10em'}}>
                                    {moreSize ? sizeList.map((Val, id) => {
                                        return (

                                            <Form.Check
                                                className="p-1 px-2 mx-5 btn fw-bold"
                                                defaultChecked={Val === props.sozeSelected}
                                                type="checkbox"
                                                label={Val}
                                                name='sizeSelected'
                                                key={id}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        props.setSizeSelected(e.target.value)
                                                    } else if (!e.target.checked) {
                                                        props.setSizeSelected('')
                                                    }
                                                }}
                                                value={Val}
                                            />


                                        );

                                    }) : (
                                        <div className=''>
                                            {sizeList.slice(sizeList, 10).map((Val, id) =>


                                                <FormCheck
                                                    className="p-1 px-2 mx-5 btn fw-bold text-left"
                                                    defaultChecked={Val === props.sizeSelected}

                                                    type="checkbox"
                                                    label={Val}
                                                    name='sizeSelected'
                                                    key={id}
                                                    onChange={(e) => {
                                                        if (e.target.checked) {
                                                            props.setSizeSelected(e.target.value)
                                                        } else if (!e.target.checked) {
                                                            props.setSizeSelected('')
                                                        }
                                                    }}
                                                    value={Val}
                                                >
                                                </FormCheck>
                                            )}
                                            {sizeList.length > 10 &&
                                                <span
                                                    className="p-1 px-2 mx-5 btn link-dark text-right text-decoration-underline"
                                                    onClick={() => setMoreSize(true)}
                                                >
                                                    еще
                                                </span>
                                            }
                                        </div>
                                    )}
                                </div>
                            </FormGroup>
                        </div>
                    }

                    <Button
                        onClick={HandleFiltersErase}
                    >
                        Сбросить фильтры
                    </Button>

                </div>
            }

        </>
    )
}

export default ProductsFilter