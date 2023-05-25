import React, { useState, useEffect } from "react";


import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "@/components/Loader";
import Message from "@/components/Message";
import FormContainer from "@/components/FormContainer";
import { getUserDetails, updateUser } from "@/redux/actions/userActions";
import { USER_UPDATE_RESET } from "@/redux/typesUsers";
import {useRouter} from "next/router";
import {useSearchParams} from "next/navigation";
import Link from "next/link";

function UserEditScreen() {
    const searchParams = useSearchParams()
    const history = useRouter()
    const [userId, setUserId] = useState(searchParams.get('userid'))
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone_number, setPhone_number] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);

    const dispatch = useDispatch();

    const userDetails = useSelector((state) => state.userDetails);
    const { loading, user, error } = userDetails;
    const userUpdate = useSelector((state) => state.userUpdate);
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = userUpdate;

    useEffect(() => {
        if (successUpdate) {
            dispatch({type: USER_UPDATE_RESET});
            history.push("/admin/userlist");
        } else {
            if (!user.name || user._id !== Number(userId)) {
                dispatch(getUserDetails(userId));
            } else {
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
                setPhone_number(user.phone_number)
            }
        }
        // eslint-disable-next-line
    }, [userId, user, successUpdate, history]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateUser({ _id: user._id, name, email, isAdmin, phone_number }))
    };

    return (
        <div>
            <Link href="/admin/userlist">Назад</Link>
            <FormContainer>
                <h1>Изменить пользователя</h1>
                {/* {loadingUpdate && <Loader />} */}
                {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
                {loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant="danger">{error}</Message>
                ) : (
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId="name">
                            <Form.Label>Имя</Form.Label>
                            <Form.Control
                                type="name"
                                placeholder="Имя"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="email">
                            <Form.Label>Email адрес</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Введите email адрес"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="phone_number">
                            <Form.Label>Номер телефона</Form.Label>
                            <Form.Control
                                type="phone_number"
                                placeholder="Введите номер телефона"
                                value={phone_number}
                                onChange={(e) => setPhone_number(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="isAdmin">
                            <Form.Check
                                type="checkbox"
                                label="Сотрудник?"
                                checked={isAdmin}
                                onChange={(e) => setIsAdmin(e.target.checked)}
                            ></Form.Check>
                        </Form.Group>

                        <Button type="submit" variant="primary">
                            Изменить
                        </Button>
                    </Form>
                )}
            </FormContainer>
        </div>
    );
}

export default UserEditScreen;
