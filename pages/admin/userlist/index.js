import React, {useEffect, useState} from "react";


import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "@/components/Loader";
import Message from "@/components/Message";
import { listUsers, deleteUser } from "@/redux/actions/userActions";
import {useRouter} from "next/router";
import Link from "next/link";

function UserListScreen() {
    const dispatch = useDispatch();
    const history = useRouter()
    const usersList = useSelector((state) => state.usersList);
    const { loading, error, users } = usersList;
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const userDelete = useSelector((state) => state.userDelete);
    const { success: successDelete } = userDelete;
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        history.isReady ? setIsLoading(false) : ''
    }, [])

    useEffect(() => {

        if (userInfo && userInfo.isAdmin) {
            dispatch(listUsers());
        } else {
            history.push("/login");
        }
        // eslint-disable-next-line
    }, [dispatch, history, successDelete, userInfo]);

    const deleteHandler = (id) => {
        dispatch(deleteUser(id))
    };

    return (
        <div>
            {!isLoading && userInfo && userInfo.isAdmin && (
            <div className='text-white'>
                <h1>Пользователи</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <Table striped bordered hover responsive className="table-sm text-white">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>ADMIN</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className='text-white'>
                        {users.map((user) => (
                            <tr key={user._id} className='text-white'>
                                <td className='text-white'>{user._id}</td>
                                <td className='text-white'>{user.name}</td>
                                <td className='text-white'>{user.email}</td>
                                <td className='text-white'>
                                    {user.isAdmin ? (
                                        <i
                                            className="fas fa-check"
                                            style={{ color: "green" }}
                                        ></i>
                                    ) : (
                                        <i
                                            className="fas fa-check"
                                            style={{ color: "red" }}
                                        ></i>
                                    )}
                                </td>

                                <td>
                                    <Link
                                        href={`/admin/user/${user._id}/edit`}
                                    >
                                        <Button
                                            variant="light"
                                            className="btn-sm "
                                        >
                                            <i className="fas fa-edit"></i>
                                        </Button>
                                    </Link>
                                    <Button
                                        variant="danger"
                                        className="btn-sm"
                                        onClick={() => deleteHandler(user._id)}
                                    >
                                        <i className="fas fa-trash"></i>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
            </div>)}
        </div>
    );
}

export default UserListScreen;