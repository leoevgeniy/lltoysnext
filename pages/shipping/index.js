import React, { useState, useEffect } from "react";
import { AddressSuggestions } from "react-dadata";
import "react-dadata/dist/react-dadata.css";
import {
    Form,
    Button,
    Row,
    Col,
    Container,
    FormGroup,
    FormLabel,
    FormCheck,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "@/components/CheckoutSteps";
import { saveShippingAddress, saveShippingCost} from "@/redux/actions/cartActions";
import {useRouter} from "next/router";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import {DADATA_TOKEN} from "@/consts";

function ShippingScreen() {
    const history = useRouter()
    // const TOKEN = "c626ed218daca90f04edd627891ee1c035e86387";
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    const dispatch = useDispatch();

    const [address, setAddress] = useState(shippingAddress.daAddress);
    const [postalcode, setPostalcode] = useState(shippingAddress.postalcode);
    const [country, setCountry] = useState('Россия');
    const [shippmentMethod, setShippmentMethod] = useState(
        shippingAddress.shippmentMethod
    );
    // function placeInCenter( str, substr ){
    //     let index = str.toString().length - 2;
    //     const finallStr = str.toString().substring(0 , index) + substr + str.toString().substring( index );
    //     return parseFloat(finallStr).toFixed(2)
    // }
    // const shipmentCostCalculation = async (source) => {
    //   dispatch(saveShippingCost(0))
    //   let res = {}
    //   if (source === "pochtaRf") {
    //   await fetch(`https://tariff.pochta.ru/v2/calculate/tariff?json&object=23030&from=115280&to=${postalcode}&weight=1000&group=0&closed=1`)
    //       .then ((response) => response.text())
    //       .then ((result) => {
    //         res = JSON.parse(result)
    //         for (let key in res) {
    //           if (key === 'paymoneynds') {
    //             const cost = Number(placeInCenter(res[key], '.'))
    //             dispatch(saveShippingCost(cost))
    //           }
    //         }
    //       })
    //       .catch((error) => console.log("error", error))
    // } else if (source === "sdek") {
    //       const headers = {
    //           // 'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZSI6WyJvcmRlcjphbGwiLCJwYXltZW50OmFsbCJdLCJleHAiOjE2NjIwMTE3MjQsImF1dGhvcml0aWVzIjpbInNoYXJkLWlkOnJ1LTAxIiwiY2xpZW50LWNpdHk60J3QvtCy0L7RgdC40LHQuNGA0YHQuiwg0J3QvtCy0L7RgdC40LHQuNGA0YHQutCw0Y8g0L7QsdC70LDRgdGC0YwiLCJmdWxsLW5hbWU60KLQtdGB0YLQuNGA0L7QstCw0L3QuNC1INCY0L3RgtC10LPRgNCw0YbQuNC4INCY0JwsINCe0JHQqdCV0KHQotCS0J4g0KEg0J7Qk9Cg0JDQndCY0KfQldCd0J3QntCZINCe0KLQktCV0KLQodCi0JLQldCd0J3QntCh0KLQrNCuIiwiY29udHJhY3Q60JjQnC3QoNCkLdCT0JvQky0yMiIsImFjY291bnQtbGFuZzpydXMiLCJhcGktdmVyc2lvbjoxLjEiLCJhY2NvdW50LXV1aWQ6ZTkyNWJkMGYtMDVhNi00YzU2LWI3MzctNGI5OWMxNGY2NjlhIiwiY2xpZW50LWlkLWVjNTplZDc1ZWNmNC0zMGVkLTQxNTMtYWZlOS1lYjgwYmI1MTJmMjIiLCJjbGllbnQtaWQtZWM0OjE0MzQ4MjMxIiwiY29udHJhZ2VudC11dWlkOmVkNzVlY2Y0LTMwZWQtNDE1My1hZmU5LWViODBiYjUxMmYyMiIsInNvbGlkLWFkZHJlc3M6ZmFsc2UiXSwianRpIjoiODZhYWFhNDItODE2YS00NTVlLWJlZjgtMzcwYzU2ZmUxNjk0IiwiY2xpZW50X2lkIjoiRU1zY2Q2cjlKbkZpUTNiTG95akpZNmVNNzhKckpjZUkifQ.ltgnQ20jYyb0wI7mCp3ZeW_oimlq3tKcWzuelol7HgeVUhyt5XQPj0OhzSE8lKn_xFhpr_wsHMEfci3J3K21yoCUIOn_411YMUm8jW-njekQJQULmKNIR-eEgB047bA3jAdMEVPKjStzH-JDlZ_xbnYxMK8Rv27899qkqZ6917rBqZ9eGtwm1FGAoqNBBXFQY2OuAHgc8TEPN_pnjyxAwEZ8fTrzh3PCUR-w7j86pbLllj5BeYV9akxv5ebQvf8Jy0JAJn0hQtvlhoDKpUJZwqIVHFQtE6vWjY8moRyBO9j9x1UTBkLp_bDLjHrFxyuYqgFF5rAcvjKtJ93_lEBQTQ',
    //           'Content-Type': 'application/json ',
    //           'Origin':  '*',
    //           // 'Access-Control-Allow-Credentials': 'true',
    //           // 'Access-Control-Allow-Methods': 'POST',
    //           // 'Access-Control-Allow-Headers': 'Content-Type',
    //       }
    //       const body = {
    //           "version":"1.0",
    //           "senderCityPostCode" : '115280',
    //           "receiverCityPostCode" :  Number(postalcode),
    //           "tariffId":"137",
    //           "goods":
    //               {
    //                   "height": 30,
    //                   "length": 30,
    //                   "weight": 1000,
    //                   "width": 30
    //               },
    //           "services": [
    //               {
    //                   "id": 2,
    //                   "param": 2000
    //               },
    //               {
    //                   "id": 30
    //               }
    //           ]



    //       }
    //       const myInit = {
    //           method: 'POST',
    //           // 'Access-Control-Allow-Origin':  'http://127.0.0.1:3000',
    //           // 'Access-Control-Allow-Credentials': 'true',
    //           // 'Access-Control-Allow-Methods': 'POST',
    //           // 'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    //           // client_id : 'EMscd6r9JnFiQ3bLoyjJY6eM78JrJceI',
    //           // client_secret: 'PjLZkKBHEiLK3YsjtNrt3TGNG0ahs3kG',
    //           headers: headers,
    //           body,
    //           // mode: 'cors',
    //           // cache: 'default'
    //       };
    //       await fetch(`http://api.cdek.ru/calculator/calculate_price_by_json.php `, myInit)
    //           .then ((response) => {
    //               response.text()
    //           })
    //           .then ((result) => {
    //               // res = JSON.parse(result)
    //               // for (let key in res) {
    //               //     if (key === 'paymoneynds') {
    //               //         const cost = Number(placeInCenter(res[key], '.'))
    //               //         console.log((cost))
    //               //         dispatch(saveShippingCost(cost))
    //               //     }
    //               // }
    //           })
    //           .catch((error) => console.log("error", error))
    //   }
    // }
    const submitHandler = (e) => {
        e.preventDefault();
        if (shippmentMethod === 'pochtaRf') {
            // shipmentCostCalculation(shippmentMethod)
            dispatch(
                saveShippingAddress({
                    city: address.value.split(',')[0],
                    address: address.value,
                    daAddress: address,
                    postalcode,
                    country,
                    shippmentMethod,
                })
            );
        } else if (shippmentMethod === 'mskCur') {
        dispatch(saveShippingCost(300))
        dispatch(
            saveShippingAddress({
                city: address.value.split(',')[0],
                address: address.value,
                daAddress: address,
                postalcode,
                country,
                shippmentMethod,
            })
        )} else if (shippmentMethod === 'mskSelf') {
            dispatch(saveShippingCost(0))
            dispatch(
                saveShippingAddress({
                    city: address.value.split(',')[0],
                    address: address.value,
                    daAddress: address,
                    postalcode,
                    country,
                    shippmentMethod,
                })
            )
        } else if (shippmentMethod === 'sdek') {
            // shipmentCostCalculation(shippmentMethod)
            dispatch(
                saveShippingAddress({
                    city: address.value.split(',')[0],
                    address: address.value,
                    daAddress: address,
                    postalcode,
                    country,
                    shippmentMethod,
                })
            )
        }
        history.push("/payment").then(r => {});
    };
    useEffect(() => {
        if (typeof address === "object") {setPostalcode(address.data.postal_code)}
    },[address])
    return (
        <Container md="auto" className='w-100'>
            <CheckoutSteps step1 step2 />
            <h1 md="auto" className="text-center">
                Доставка
            </h1>
            <Form onSubmit={submitHandler} className="text-center">
                <Row className='w-100'>
                    <Col className='col-12 col-sm-6 pe-0'>
                        <FormLabel className="my-3 mb-3 d-flex justify-content-center">
                            <h4>Адрес доставки</h4>
                        </FormLabel>
                        <Form.Group>
                            <Form.Label>Страна</Form.Label>
                            <Form.Control
                                disabled
                                readOnly
                                type="text"
                                placeholder="Введите страну"
                                value={country ? country : ""}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>Город, улица ....</Form.Label>
                            <AddressSuggestions

                                token={DADATA_TOKEN}
                                count={4}
                                autoload={true}
                                value={shippingAddress.daAddress}
                                onChange={setAddress}
                                filterFromBound="city"
                                filterToBound="flat"
                                filterLocations={[{country}]}
                            />

                        </Form.Group>

                        <Form.Group controlId="postalcode">
                            <Form.Label>Индекс<span style={{'fontSize': '10px'}}> Заполняется автоматически</span></Form.Label>
                            <Form.Control
                                onChange={setPostalcode}
                                type="text"
                                disabled
                                value={postalcode ? postalcode : ""}
                            ></Form.Control>
                        </Form.Group>
                    </Col>
                    <Col className="text-end ">
                        <FormGroup>
                            <FormLabel className="my-3 mb-5 d-flex justify-content-center">
                                <h4>Способ доставки</h4>
                            </FormLabel>
                            {/*<Row>*/}
                                <FormCheck
                                    className="mb-1 mx-3 d-flex float-start"
                                    defaultChecked={shippingAddress.shippmentMethod==='mskCur'}
                                    // as='button'
                                    type="radio"
                                    label="По Москве - курьером"
                                    id="mskCur"
                                    name="shipmentMethod"
                                    onChange={(e) =>
                                        setShippmentMethod(e.target.id)
                                    }
                                ></FormCheck>
                            {/*</Row>*/}
                            {/*<Row className="justify-content-right">*/}
                                <FormCheck
                                    className="my-3 mb-1 mx-3 d-flex justify-content-center"
                                    defaultChecked={shippingAddress.shippmentMethod==='mskSelf'}
                                    type="radio"
                                    label="По Москве - самовывоз"
                                    id="mskSelf"
                                    name="shipmentMethod"
                                    onChange={(e) =>
                                        setShippmentMethod(e.target.id)
                                    }
                                ></FormCheck>
                            {/*</Row>*/}
                            {/*<Row className="justify-content-right">*/}
                                <FormCheck
                                    className="my-3 mb-1 mx-3 d-flex float-start"
                                    type="radio"
                                    defaultChecked={shippingAddress.shippmentMethod==='pochtaRf'}
                                    label="Почта России"
                                    id="pochtaRf"
                                    name="shipmentMethod"
                                    onChange={(e) =>
                                        setShippmentMethod(e.target.id)
                                    }
                                ></FormCheck>
                            {/*</Row>*/}
                            {/*<Row className="justify-content-right">*/}
                                <FormCheck
                                    className="my-3 mb-1 mx-3 d-flex justify-content-center"
                                    defaultChecked={shippingAddress.shippmentMethod==='sdek'}
                                    type="radio"
                                    label="СДЭК - по России"
                                    id="sdek"
                                    name="shipmentMethod"
                                    onChange={(e) =>
                                        setShippmentMethod(e.target.id)
                                    }
                                ></FormCheck>
                            {/*</Row>*/}
                        </FormGroup>
                    </Col>
                </Row>
                <Button type="submit" variant="primary" className="text-center">
                    Продолжить
                </Button>
            </Form>
        </Container>
    );
}

export default ShippingScreen;
