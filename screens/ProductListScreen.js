import React, {useEffect} from "react";
import {LinkContainer} from "react-router-bootstrap";
import {Table, Button, Row, Col} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import {
    listProducts,
    deleteProduct,
    createProduct,
    migrateProduct,
    migrateUpdateProduct,
    superSaleProduct,
} from "../actions/productActions";
import {PRODUCT_CREATE_RESET} from "../constants/productConstants";

function ProductListScreen({history, match}) {
    const dispatch = useDispatch();

    const productList = useSelector((state) => state.productList);
    const {loading, error, products, page, pages} = productList;

    const productDelete = useSelector((state) => state.productDelete);
    const {
        loading: loadingDelete,
        error: errorDelete,
        success: successDelete,
    } = productDelete;

    const productCreate = useSelector((state) => state.productCreate);
    const {
        loading: loadingCreate,
        error: errorCreate,
        success: successCreate,
        product: createdProduct,
    } = productCreate;
    const productMigrate = useSelector((state) => state.productMigrate);
    const {
        loading: loadingMigrate,
        error: errorMigrate,
        success: successMigrate
    } = productMigrate;
    const productMigrateUpdate = useSelector((state) => state.productMigrateUpdate);
    const {
        loading: loadingMigrateUpdate,
        error: errorMigrateUpdate,
        success: successMigrateUpdate
    } = productMigrateUpdate;


    const userLogin = useSelector((state) => state.userLogin);
    const {userInfo} = userLogin;

    let keyword = history.location.search
    useEffect(() => {
        dispatch({type: PRODUCT_CREATE_RESET})

        if (!userInfo.isAdmin) {
            history.push('/login');
        }

        if (successCreate) {
            history.push(`/admin/product/${createdProduct._id}/edit`)
        } else {
            dispatch(listProducts(''))
        }
        // eslint-disable-next-line
    }, [dispatch, history, userInfo, successDelete, successCreate, successMigrate, successMigrateUpdate, createdProduct, keyword]);

    const deleteHandler = (id) => {
        if (window.confirm("Вы действительно хотите удалить этот товар?")) {
            dispatch(deleteProduct(id));
        }
    };

    const createProductHandler = () => {
        dispatch(createProduct())
    };
    const migrateProductHandler = () => {
        dispatch(migrateProduct())
    };
    const migrateUpdateProductHandler = () => {
        dispatch(migrateUpdateProduct())
    };
    const superSaleProductHandler = () => {
        dispatch(superSaleProduct())
    };

    return (
        <div>

            <Row className="align-items-center">
                <Col>
                    <h1>Товары</h1>
                </Col>

                <Col className="ms-auto text-end">
                    <Button className="my-3" onClick={migrateProductHandler}>
                        <i className="fas"></i> Импортировать от производителя
                    </Button>
                </Col>
                <Col className="ms-auto text-end">
                    <Button className="my-3" onClick={migrateUpdateProductHandler}>
                        <i className="fas"></i> Остатки от производителя
                    </Button>
                </Col>
                <Col className="ms-auto text-end">
                    <Button className="my-3" onClick={superSaleProductHandler}>
                        <i className="fas"></i> Скидочный ассортимент
                    </Button>
                </Col>
                <Col className="ms-auto text-end">
                    <Button className="my-3" onClick={createProductHandler}>
                        <i className="fas fa-plus"></i> Создать новый продукт
                    </Button>
                </Col>
            </Row>
            {loadingDelete && <Loader/>}
            {errorDelete && <Message variant="danger">{errorDelete}</Message>}
            {loadingCreate && <Loader/>}
            {errorCreate && <Message variant="danger">{errorCreate}</Message>}
            {loadingMigrate && <Loader/>}
            {errorMigrate && <Message variant="danger">{errorMigrate}</Message>}
            {loadingMigrateUpdate && <Loader/>}
            {errorMigrateUpdate && <Message variant="danger">{errorMigrateUpdate}</Message>}
            {loading ? (
                <Loader/>
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <div>
                    <Table striped bordered hover responsive className="table-sm">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>PRICE</th>
                            <th>CATEGOTY</th>
                            <th>BRAND</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {products.map((product) => (
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>₽{product.retailPrice}</td>
                                <td>{product.category}</td>
                                <td>{product.brand}</td>

                                <td>
                                    <LinkContainer
                                        to={`/admin/product/${product._id}/edit`}
                                    >
                                        <Button
                                            variant="light"
                                            className="btn-sm "
                                        >
                                            <i className="fas fa-edit"></i>
                                        </Button>
                                    </LinkContainer>
                                    <Button
                                        variant="danger"
                                        className="btn-sm"
                                        onClick={() =>
                                            deleteHandler(product._id)
                                        }
                                    >
                                        <i className="fas fa-trash"></i>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>

                    <Paginate page={page} pages={pages} isAdmin={true}/>
                </div>
            )}
        </div>
    );
}

export default ProductListScreen;
