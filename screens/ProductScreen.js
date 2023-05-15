import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../components/Loader";
import PageNotFound from "../components/PageNotFound";
import {Helmet} from "react-helmet";
import {Link} from "react-router-dom";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import {listProductDetails, listSeenProducts} from "../actions/productActions";
import {Button, Col, Form, FormControl, FormGroup, FormLabel, ListGroup, ListGroupItem, Row} from "react-bootstrap";
import ProductImageCarousel from "../components/ProductImageCarousel";
import Rating from "../components/Rating";
import {PRODUCT_DETAILS_RESET} from "../constants/productConstants";
import '../css/ProductScreen.css'
import Modal from "react-bootstrap/Modal";
import SeenProductCarousel from "../components/SeenProductCarousel";


function ProductScreen({match, history}) {
    const [qty, setQty] = useState(1);
    const dispatch = useDispatch();
    const {loading, error, product} = useSelector((state) => state.productDetails);
    const {products} = useSelector((state) => state.productsSeen)
    const [brCategory, setBrCategory] = useState('')
    const [brSubCategory, setBrSubCategory] = useState('')
    const id = match.params.id;
    const [color, setColor] = useState('')
    const [size, setSize] = useState('')
    const [colorsArray, setColorsArray] = useState([])
    const [sizesArray, setSizesArray] = useState([])
    const [modalShow, setModalShow] = React.useState(false);
    const [oppenedItems, setOppenedItems] = useState([])

    useEffect(() => {
        if (localStorage.getItem('oppenedItems')) {
            setOppenedItems(JSON.parse(localStorage.getItem("oppenedItems")))}

    },[])
    useEffect(() => {
        if (oppenedItems) {dispatch(listSeenProducts(oppenedItems))}

    },[dispatch, oppenedItems])
    useEffect(() => {
        dispatch(listProductDetails(id))
        try {
            setBrCategory(product.categories[0].category)
            setBrSubCategory(product.categories[0].subCategory)
        } catch {

        }
        try {
            setColorsArray(product.colors)
            if (!color && product.colors.length > 0) {
                if (Object.keys(product.colors[0])[0]) {
                    setColor(Object.keys(product.colors[0])[0])
                }
            }
        } catch {

        }

        if (color && colorsArray) {
            colorsArray.forEach(item => {
                if (Object.keys(item)[0] === color) {
                    setSizesArray(item[color])

                }
            })

        }

        if (!size && sizesArray.length > 0) {
            setSize(sizesArray[0])
        }
    }, [dispatch, id, loading, color, size, colorsArray, sizesArray])

    const addToCardHandler = async () => {
        let colorStr = ''
        let sizeStr = ''
        dispatch({type: PRODUCT_DETAILS_RESET})
        if (color) {
            colorStr = '&color=' + color
        }
        if (size) {
            sizeStr = '&size=' + size
        }
        history.push(`/cart/${id}?qty=${qty}${colorStr}${sizeStr}`);
    };
    const onHide=() => setModalShow(false)
    const showDesc = () => setModalShow(true)
    return (
        <>

            {
                loading ? (
                    <Loader/>
                ) : error ? (
                    <PageNotFound/>
                ) : (
                    product &&
                    <>
                        <Modal
                            // backdrop
                            // keyboard={false}
                            show={modalShow}
                            onHide={onHide}
                            // backdropClassName=''
                            size="lg"
                            aria-labelledby="contained-modal-title-vcenter"
                            // centered
                            // fullscreen
                        >
                            <Modal.Header closeButton>
                                <Modal.Title id="contained-modal-title-vcenter">
                                    {product.name}
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {product.description}
                            </Modal.Body>
                            <Modal.Footer>
                                <Button onClick={onHide}>Закрыть</Button>
                            </Modal.Footer>
                        </Modal>
                        <Helmet>
                            <title>{product.name}</title>
                            <meta name='description' content={product.description}/>
                            <meta name='keywords' content={product.name}/>
                            <meta name='keywords'
                                  content='sexshop, сексшоп, магазин интимных товаров для взрослых, секс игрушки, sex toys, интимшоп, интим шоп, intimshop, секс, вибратор, фаллоимитатор, вагина, фаллос, клитор, стимулятор, мастурбатор, куклы, эротическое белье'/>

                        </Helmet>
                        <Link to="/" className="btn btn-light my-3">
                            Назад
                        </Link>
                        <Breadcrumb>
                            <Breadcrumb.Item linkAs={Link} linkProps={{to: '/'}}>Главная</Breadcrumb.Item>
                            <Breadcrumb.Item linkAs={Link} linkProps={{to: `/?category=${brCategory}`}}>
                                {brCategory}
                            </Breadcrumb.Item>
                            <Breadcrumb.Item linkAs={Link}
                                             linkProps={{to: `/?filter=${brSubCategory}`}}>
                                {brSubCategory}
                            </Breadcrumb.Item>
                        </Breadcrumb>
                        <div>
                            <Row itemScope itemType="http://schema.org/Product" className='w-100'>
                                <Col xs={12} md={6}>
                                    <ProductImageCarousel product={product}/>
                                </Col>
                                <Col xs={12} md={6}>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item className="small">
                                            <h1 itemProp="name">{product.name}</h1>
                                        </ListGroup.Item>

                                        {product.reviews > 5 &&
                                            <ListGroup.Item>
                                                <Rating
                                                    value={product.rating}
                                                    text={`${product.numReviews} reviews`}
                                                    color={"#f8e825"}
                                                />
                                            </ListGroup.Item>
                                        }


                                        <ListGroup.Item itemProp="offers" itemScope itemType="http://schema.org/Offer">
                                            <meta itemProp="price" content={product.retailPrice}/>
                                            <meta itemProp="priceCurrency" content="RUB"/>
                                            Цена: ₽ {product.retailPrice}
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            {/*{product.assortiment[0].color ? `Цвет: ${String(colString)}` : ''}*/}
                                            {product.brand ? `Производитель: ${product.brand} ` : ''}
                                            {product.CollectionName ?
                                                product.brand ?
                                                    `| Коллекция: ${product.CollectionName}`
                                                    : `Коллекция: ${product.CollectionName}`
                                                : ''}
                                            {product.diameter ?
                                                product.brand || product.CollectionName ?
                                                    `| Диаметр: ${product.diameter}`
                                                    : `Диаметр: ${product.diameter}`
                                                :''}
                                            {product.batteries ?
                                                product.brand || product.CollectionName || product.diameter ?
                                                    `| Батарейки: ${product.batteries}. `
                                                    :`Батарейки: ${product.batteries}. `
                                                : ''}
                                        </ListGroup.Item>

                                        <ListGroup.Item className="small">
                                            <p onClick={showDesc} className='descriptionArea'>{product.description} </p>
                                        </ListGroup.Item>
                                    </ListGroup>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Цена:</Col>
                                                <Col className='text-end'>
                                                    <strong>
                                                        ₽ {product.retailPrice}
                                                    </strong>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                        {(color && color !== 'цвет не указан') &&
                                            <ListGroup.Item>

                                                <Row>
                                                    <Col>
                                                        Цвет
                                                    </Col>
                                                    <Col xs="auto" className="my-1">
                                                        <Form.Control
                                                            as="select"
                                                            id='color'
                                                            value={color}
                                                            disabled={colorsArray.length === 1}
                                                            // defaultValue={defColor}
                                                            onChange={(e) => {
                                                                setColor(e.target.value)
                                                            }}
                                                        >
                                                            {
                                                                colorsArray.map(color =>
                                                                    !color ? setColor(Object.keys(color)[0]) :
                                                                        <option
                                                                            key={Object.keys(color)[0]}
                                                                            value={Object.keys(color)[0]}
                                                                        >
                                                                            {Object.keys(color)[0]}
                                                                        </option>
                                                                )
                                                            }
                                                        </Form.Control>
                                                    </Col>
                                                </Row>

                                                {(sizesArray && sizesArray[0] !== '') &&
                                                    <Row>
                                                        <Col>
                                                            Размер
                                                        </Col>
                                                        <Col xs="auto" className="my-1">
                                                            <Form.Control
                                                                as="select"
                                                                id='size'
                                                                value={size}
                                                                disabled={sizesArray.length === 1}
                                                                onChange={(e) => {
                                                                    setSize(e.target.value)
                                                                }}
                                                            >
                                                                {sizesArray.map(item => (

                                                                    // Object.keys(item)[0] === color ?
                                                                    <option
                                                                        className='text-center'
                                                                        key={item}
                                                                        value={item}
                                                                    >
                                                                        {item}
                                                                    </option>

                                                                ))
                                                                }


                                                            </Form.Control>
                                                        </Col>
                                                    </Row>
                                                }
                                            </ListGroup.Item>
                                        }
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Статус</Col>
                                                <Col xs="auto" className="my-1">
                                                    {(product.countInStock > 0)
                                                        ? "Есть на складе"
                                                        : "Нет на складе"}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                        {
                                            product.countInStock > 0 &&
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Кол-во</Col>
                                                    <Col xs="auto" className="my-1">
                                                        <Form.Control
                                                            as="select"
                                                            value={qty}
                                                            onChange={(e) => {
                                                                setQty(
                                                                    e.target.value
                                                                );

                                                            }}
                                                        >
                                                            {[...Array(product.countInStock).keys()].map((x) => (
                                                                <option
                                                                    key={x + 1}
                                                                    value={x + 1}
                                                                >
                                                                    {x + 1}
                                                                </option>
                                                            ))}
                                                        </Form.Control>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        }

                                        <ListGroup.Item className="text-center">
                                            <Button
                                                onClick={addToCardHandler}
                                                className="btn btn-block"
                                                disabled={product.colors && product.colors.length === 0}
                                                type="button"
                                            >
                                                Добавить в корзину
                                            </Button>
                                        </ListGroup.Item>
                                    </ListGroup>

                                </Col>

                            </Row>
                            {/*<Row className='justify-content-md-center w-100'>*/}

                            {/*    <Col>*/}
                            {/*        <h4 className="my-3">Отзывы</h4>*/}
                            {/*        {product.reviews.length === 0 && (*/}
                            {/*            <Message variant="info">*/}
                            {/*                Пока нет отзывов*/}
                            {/*            </Message>*/}
                            {/*        )}*/}
                            {/*        <ListGroup variant="flush">*/}
                            {/*            {cuttedReview && cuttedReview.map((review) => (*/}
                            {/*                <ListGroupItem key={review._id}>*/}
                            {/*                    <Rating*/}
                            {/*                        value={review.rating}*/}
                            {/*                        color="#f8e825"*/}
                            {/*                    ></Rating>*/}
                            {/*                    <p>*/}
                            {/*                        {review.createdAt.substring(0, 10)}*/}
                            {/*                    </p>*/}
                            {/*                    <p>{review.comment.slice(0, 100)}</p>*/}
                            {/*                </ListGroupItem>*/}
                            {/*            ))}*/}
                            {/*            <ListGroupItem>*/}
                            {/*                <h4>Оставьте отзыв:</h4>*/}
                            {/*                {loadingProductReview && <Loader/>}*/}
                            {/*                {successProductReview && (*/}
                            {/*                    <Message variant="success">*/}
                            {/*                        Отзыв сохранен*/}
                            {/*                    </Message>*/}
                            {/*                )}*/}
                            {/*                {errorProductReview && (*/}
                            {/*                    <Message variant="danger">*/}
                            {/*                        {errorProductReview}*/}
                            {/*                    </Message>*/}
                            {/*                )}*/}
                            {/*                {userInfo ? (*/}
                            {/*                    <Form onSubmit={submitHandler}>*/}
                            {/*                        <FormGroup controlId="rating">*/}
                            {/*                            <FormLabel>Рейтинг</FormLabel>*/}
                            {/*                            <FormControl*/}
                            {/*                                as="select"*/}
                            {/*                                value={rating}*/}
                            {/*                                onChange={(e) =>*/}
                            {/*                                    setRating(*/}
                            {/*                                        Number(*/}
                            {/*                                            e.target.value*/}
                            {/*                                        )*/}
                            {/*                                    )*/}
                            {/*                                }*/}
                            {/*                            >*/}
                            {/*                                <option value="">*/}
                            {/*                                    {" "}*/}
                            {/*                                    Выберите ...*/}
                            {/*                                </option>*/}
                            {/*                                <option value="1">*/}
                            {/*                                    {" "}*/}
                            {/*                                    Провал*/}
                            {/*                                </option>*/}
                            {/*                                <option value="2">*/}
                            {/*                                    {" "}*/}
                            {/*                                    Плохо*/}
                            {/*                                </option>*/}
                            {/*                                <option value="3">*/}
                            {/*                                    {" "}*/}
                            {/*                                    Удовлетворитьльно*/}
                            {/*                                </option>*/}
                            {/*                                <option value="4">*/}
                            {/*                                    {" "}*/}
                            {/*                                    Хорошо*/}
                            {/*                                </option>*/}
                            {/*                                <option value="5">*/}
                            {/*                                    {" "}*/}
                            {/*                                    Отлично*/}
                            {/*                                </option>*/}
                            {/*                            </FormControl>*/}
                            {/*                        </FormGroup>*/}

                            {/*                        <FormGroup controlId="comment">*/}
                            {/*                            <FormLabel>Рейтинг</FormLabel>*/}
                            {/*                            <FormControl*/}
                            {/*                                as="textarea"*/}
                            {/*                                rows="5"*/}
                            {/*                                value={comment}*/}
                            {/*                                onChange={(e) =>*/}
                            {/*                                    setComment(*/}
                            {/*                                        e.target.value*/}
                            {/*                                    )*/}
                            {/*                                }*/}
                            {/*                            ></FormControl>*/}
                            {/*                        </FormGroup>*/}

                            {/*                        <Button*/}
                            {/*                            disabled={loadingProductReview}*/}
                            {/*                            type="submit"*/}
                            {/*                            variant="primary"*/}
                            {/*                        >*/}
                            {/*                            Подтвердить*/}
                            {/*                        </Button>*/}
                            {/*                    </Form>*/}
                            {/*                ) : (*/}
                            {/*                    <Message variant="info">*/}
                            {/*                        Пожалуйста{" "}*/}
                            {/*                        <Link to="/login">*/}
                            {/*                            войдите в систему*/}
                            {/*                        </Link>{" "}*/}
                            {/*                        чтобы оставить отзыв!*/}
                            {/*                    </Message>*/}
                            {/*                )}*/}
                            {/*            </ListGroupItem>*/}
                            {/*        </ListGroup>*/}
                            {/*    </Col>*/}

                            {/*</Row>*/}
                        </div>
                        {(oppenedItems && oppenedItems.length > 0 && products) &&
                            <>
                                <div className='popular my-3'>
                                    <span className='mx-3 fs-4'>Вы смотрели</span>
                                    <div className='line'></div>
                                </div>
                                <SeenProductCarousel/>
                            </>
                        }


                    </>


                )
            }
        </>
    )
}

export default ProductScreen