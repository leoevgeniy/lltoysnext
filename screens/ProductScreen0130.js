import React, {useCallback, useEffect, useState} from "react";
import ScrollToTop from "react-scroll-to-top";
import {Link} from "react-router-dom";
import {
    Row,
    Col,
    ListGroup,
    Form,
    Button,
    ListGroupItem,
    FormGroup,
    FormLabel,
    FormControl,
} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {
    listProductDetails,
    createProductReview,
} from "../actions/productActions";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import ProductImageCarousel from "../components/ProductImageCarousel";
import {PRODUCT_CREATE_REVIEW_RESET, PRODUCT_DETAILS_RESET} from "../constants/productConstants";
import {Helmet} from "react-helmet";
import PageNotFound from "../components/PageNotFound";
import Breadcrumb from "react-bootstrap/Breadcrumb";

function ProductScreen({match, history}) {

    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const id = match.params.id;

    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const {userInfo} = userLogin;

    const {loading, error, product} = useSelector((state) => state.productDetails);
    const [color, setColor] = useState('')
    const [size, setSize] = useState('')
    const productReviewCreate = useSelector(
        (state) => state.productReviewCreate
    );
    let cuttedReview = ''
    const {
        loading: loadingProductReview,
        error: errorProductReview,
        success: successProductReview,
    } = productReviewCreate;
    let brCategory = '', brSubCategory = ''
    let colors = [], sizes = []
    try {
        cuttedReview = product.reviews.slice(0, 3)
        brCategory = product.categories[0].category
        brSubCategory = product.categories[0].subCategory

        colors = product.colors
        if (color) {
            colors.forEach(item => {
                if (Object.keys(item)[0] === color) {
                    if (item[color] !== '') {
                        sizes = item[color]
                    }
                }
            })
        }
        // if (colors[0]) {
        //     product.colors.map((item, index) => {
        //         console.log(color)
        //         if (color && Object.keys(item)[0]===color) {
        //             console.log(Object.keys(item)[0])
        //             console.log(item[Object.keys(item)[0]])
        //         }
        //
        // })}
    } catch {
    }
    // if ((color && colors[0]) && !size) {
    //     colors.map(item => {
    //         if (color === item.Object.keys(item)[0]) {
    //             sizes.push(item.Object.keys(item)[0])
    //             console.log(sizes)
    //         }
    //     })
    // }
    useEffect(() => {
        dispatch(listProductDetails(id))
        if (!color && colors[0]) {
            if (Object.keys(colors[0])[0]) {
                setColor(Object.keys(colors[0])[0])
            }
        }


        if (successProductReview) {
            setRating(0);
            setComment("");
            dispatch({type: PRODUCT_CREATE_REVIEW_RESET});
        }


    }, [dispatch, id, successProductReview]);

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

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(
            createProductReview(match.params.id, {
                rating,
                comment,
            })
        );
    };
    //
    return (
        <>

            {loading ? (
                <Loader/>
            ) : error ? (
                <PageNotFound/>
            ) : ((product && product.reviews && product.categories) &&
                <>
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
                        {/*<Breadcrumb.Item active>{filterComponent}</Breadcrumb.Item>*/}
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
                                        {product.diameter ? `, Диаметр: ${product.diameter} ,` : ''}
                                        {product.batteries ? `Батарейки: ${product.batteries}. ` : ''}
                                    </ListGroup.Item>

                                    <ListGroup.Item className="small">
                                        {/* <Text numberOfLines={12} //указываете допустимое количество строк для текста
                                        ellipsizeMode="middle" //место, где будет разрыв текста в три точки (возможно указать 'head', 'middle', 'tail', 'clip'. 'clip' только для iOS)
                                    > */}
                                        <p>{product.description} </p>
                                        {/* </Text> */}
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

                                    {/*    /!*{product &&*!/*/}
                                    <ListGroup.Item>
                                        {colors.length > 0 &&
                                            <Row>
                                                <Col>
                                                    Цвет
                                                </Col>
                                                <Col xs="auto" className="my-1">
                                                    <Form.Control
                                                        as="select"
                                                        id='color'
                                                        value={color}
                                                        // defaultValue={defColor}
                                                        onChange={(e) => {
                                                            setColor(e.target.value)
                                                        }}
                                                    >
                                                        {
                                                            colors.map(color =>
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
                                        }
                                        {sizes && sizes.length > 0 &&
                                            <Row>
                                                <Col>
                                                    Размер
                                                </Col>
                                                <Col xs="auto" className="my-1">
                                                    <Form.Control
                                                        as="select"
                                                        id='size'
                                                        value={size}
                                                        onChange={(e) => {
                                                            setSize(e.target.value)
                                                        }}
                                                    >
                                                        {product.colors.map(item => (

                                                                Object.keys(item)[0] === color ?
                                                                    item[Object.keys(item)[0]].map(size =>
                                                                        (

                                                                            <option
                                                                                className='text-center'
                                                                                key={size}
                                                                                value={size}
                                                                            >
                                                                                {size}
                                                                            </option>
                                                                        ))
                                                                    : ""

                                                            )
                                                        )
                                                        }
                                                    </Form.Control>
                                                </Col>
                                            </Row>
                                        }
                                    </ListGroup.Item>
                                    {/*    /!*{product.colors.length > 0 && (*!/*/}
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
                        <Row className='justify-content-md-center w-100'>

                            <Col>
                                <h4 className="my-3">Отзывы</h4>
                                {product.reviews.length === 0 && (
                                    <Message variant="info">
                                        Пока нет отзывов
                                    </Message>
                                )}
                                <ListGroup variant="flush">
                                    {cuttedReview && cuttedReview.map((review) => (
                                        <ListGroupItem key={review._id}>
                                            <Rating
                                                value={review.rating}
                                                color="#f8e825"
                                            ></Rating>
                                            <p>
                                                {review.createdAt.substring(0, 10)}
                                            </p>
                                            <p>{review.comment.slice(0, 100)}</p>
                                        </ListGroupItem>
                                    ))}
                                    <ListGroupItem>
                                        <h4>Оставьте отзыв:</h4>
                                        {loadingProductReview && <Loader/>}
                                        {successProductReview && (
                                            <Message variant="success">
                                                Отзыв сохранен
                                            </Message>
                                        )}
                                        {errorProductReview && (
                                            <Message variant="danger">
                                                {errorProductReview}
                                            </Message>
                                        )}
                                        {userInfo ? (
                                            <Form onSubmit={submitHandler}>
                                                <FormGroup controlId="rating">
                                                    <FormLabel>Рейтинг</FormLabel>
                                                    <FormControl
                                                        as="select"
                                                        value={rating}
                                                        onChange={(e) =>
                                                            setRating(
                                                                Number(
                                                                    e.target.value
                                                                )
                                                            )
                                                        }
                                                    >
                                                        <option value="">
                                                            {" "}
                                                            Выберите ...
                                                        </option>
                                                        <option value="1">
                                                            {" "}
                                                            Провал
                                                        </option>
                                                        <option value="2">
                                                            {" "}
                                                            Плохо
                                                        </option>
                                                        <option value="3">
                                                            {" "}
                                                            Удовлетворитьльно
                                                        </option>
                                                        <option value="4">
                                                            {" "}
                                                            Хорошо
                                                        </option>
                                                        <option value="5">
                                                            {" "}
                                                            Отлично
                                                        </option>
                                                    </FormControl>
                                                </FormGroup>

                                                <FormGroup controlId="comment">
                                                    <FormLabel>Рейтинг</FormLabel>
                                                    <FormControl
                                                        as="textarea"
                                                        rows="5"
                                                        value={comment}
                                                        onChange={(e) =>
                                                            setComment(
                                                                e.target.value
                                                            )
                                                        }
                                                    ></FormControl>
                                                </FormGroup>

                                                <Button
                                                    disabled={loadingProductReview}
                                                    type="submit"
                                                    variant="primary"
                                                >
                                                    Подтвердить
                                                </Button>
                                            </Form>
                                        ) : (
                                            <Message variant="info">
                                                Пожалуйста{" "}
                                                <Link to="/login">
                                                    войдите в систему
                                                </Link>{" "}
                                                чтобы оставить отзыв!
                                            </Message>
                                        )}
                                    </ListGroupItem>
                                </ListGroup>
                            </Col>

                        </Row>
                    </div>
                </>
            )}
            <ScrollToTop smooth/>
        </>
    );
}

export default ProductScreen;
