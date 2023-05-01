import React, { useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "@/components/Loader";
import Message from "@/components/Message";
import { listOrders } from "@/redux/actions/orderActions";
import {useRouter} from "next/router";
import Link from "next/link";

function OrderListScreen() {
    const dispatch = useDispatch();
    const history = useRouter()

    const orderList = useSelector((state) => state.orderList);
    const { loading, error, orders } = orderList;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listOrders());
        } else {
            history.push("/login");
        }
        // eslint-disable-next-line
    }, [dispatch, history, userInfo]);

    return (
        <div>
            <h1>Заказы</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <Table striped bordered hover responsive className="table-sm">
                    <thead>
                        <tr>
                            <th className='text-white'>ID</th>
                            <th className='text-white'>Создатель</th>
                            <th className='text-white'>Дата</th>
                            <th className='text-white'>Стоимость</th>
                            <th className='text-white'>Оплачен</th>
                            <th className='text-white'>Доставлен</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id} className='text-white'>
                                <td className='text-white'>{order._id}</td>
                                <td className='text-white'>{order.user && order.user.name}</td>
                                <td className='text-white'>{order.createdAt.substring(0, 10)}</td>
                                <td className='text-white'>₽ {order.totalPrice}</td>
                                <td className='text-white'>
                                    {order.isPaid ? (
                                        order.paidAt.substring(0, 10)
                                    ) : (
                                        <i
                                            className="fas fa-check"
                                            style={{ color: "red" }}
                                        ></i>
                                    )}
                                </td>
                                <td>
                                    {order.isDelivered ? (
                                        order.deliveredAt.substring(0, 10)
                                    ) : (
                                        <i
                                            className="fas fa-check"
                                            style={{ color: "red" }}
                                        ></i>
                                    )}
                                </td>

                                <td>
                                    <Link
                                        href={`/order/${order._id}`}
                                    >
                                        <Button
                                            variant="light"
                                            className="btn-sm text-white"

                                        >
                                            Детали
                                        </Button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    );
}

export default OrderListScreen;
