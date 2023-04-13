import React, {useState} from "react";
import {
    Form,
    Button,
    Row,
    FormGroup,
    FormLabel,
    FormCheck,
} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import {savePaymentMethod} from "../actions/cartActions";

function PaymentScreen({history}) {
    const cart = useSelector((state) => state.cart);
    const {shippingAddress} = cart;

    const dispatch = useDispatch();

    const [paymentMethod, setPaymentMethod] = useState();

    if (!shippingAddress.address) {
        history.push("/shipping");
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        history.push("/placeorder");
    };

    return (
        <FormContainer  className='w-100'>
            <CheckoutSteps step1 step2 step3/>
            <Form onSubmit={submitHandler}  className='w-100'>
                <FormGroup className='px-3'>
                    <FormLabel className="my-3">Выберите способ оплаты</FormLabel>
                    {/*<Row>*/}
                        <FormCheck
                            className="my-3 mb-3"
                            type="radio"
                            label="Банковской картой онлайн"
                            id="bankCard"
                            name="paymentMethod"
                            onChange={(e) => setPaymentMethod(e.target.id)}
                        ></FormCheck>
                    {/*</Row>*/}
                    {/*<Row>*/}
                        <FormCheck
                            className="my-3 mb-3"
                            type="radio"
                            label="Наличными при получении"
                            id="cash"
                            name="paymentMethod"
                            onChange={(e) => setPaymentMethod(e.target.id)}
                        ></FormCheck>
                    {/*</Row>*/}
                    {shippingAddress.shippmentMethod !== 'mskCur' &&
                        // <Row>
                            <FormCheck
                                className="my-3 mb-3"
                                type="radio"
                                label="Банковской картой при получении"
                                id="deliveryCard"
                                name="paymentMethod"
                                onChange={(e) => setPaymentMethod(e.target.id)}
                            ></FormCheck>
                        // </Row>
                    }

                </FormGroup>
                <Button className="my-3" type="submit" variant="primary">
                    Продолжить
                </Button>
            </Form>
        </FormContainer>
    );
}

export default PaymentScreen;
