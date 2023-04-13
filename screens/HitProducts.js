import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Paginate from "../components/Paginate";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listTopProducts } from "../actions/productActions";
import Product from '../components/Product'
import {Helmet} from "react-helmet";

function HitProducts(history) {
    const dispatch = useDispatch();

    const productsTopRated = useSelector(state => state.productsTopRated);
    const { error, loading, products, page, pages } = productsTopRated;

    // const productList = useSelector((state) => state.productList);
    // const { error, loading, products, page, pages } = productList;

    let keyword = history.location.search;

    useEffect(() => {
        dispatch(listTopProducts());
        window.scrollTo(0, 0)
    }, [dispatch]);

    return (
        <div>
       
        <h1>Хиты продаж</h1>
        <Helmet>
            <title>Super Sale. Скидкa 50% на товары из секс-шопа!!! | Интернет-магазин lltoys.ru</title>
            <meta name='description' content='Сексшоп: магазин интимных товаров с бесплатной доставкой. Товары для взрослых, интим-знакомства и общение, эротические статьи и секс-пособия'/>
            <meta name='keywords' content='sexshop, сексшоп, магазин интимных товаров для взрослых, секс игрушки, sex toys, интимшоп, интим шоп, intimshop, секс, вибратор, фаллоимитатор, вагина, фаллос, клитор, стимулятор, мастурбатор, куклы, эротическое белье'/>

        </Helmet>


        {loading ? (
            <Loader />
        ) : error ? (
            <Message variant="danger">{error}</Message>
        ) : (
            <div>
                <Row>
                    {Array.from(products).map((product) => (
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                            <Product product={product} />
                        </Col>
                    ))}
                </Row>
                <Paginate page={page} pages={pages} keyword={keyword} />
            </div>
        )}
    </div>
    )
}

export default HitProducts