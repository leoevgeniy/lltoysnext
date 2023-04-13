import React, {useEffect, useState} from 'react'
import {useSelector} from "react-redux"
import InputRange from 'react-input-range'
import 'react-input-range/lib/css/index.css'
import Button from "react-bootstrap/Button"
import {Col, Row} from "react-bootstrap";

function PriceSlider(props) {
    const {priceUpApi, priceLowApi, maxPrice} = useSelector((state) => state.productList)
    const [range, setRange] = useState({})
    const maxValue = 0
    useEffect(() => {

    }, [])
    useEffect(() => {
        if (!props.priceUp || props.priceUp === 'NaN') {
            props.setPriceUp(priceUpApi)
        }
        if (!props.priceLow || props.priceLow === 'NaN' || props.priceLow === '10000000') {
            props.setPriceLow(priceLowApi)
        }
        if (props.priceLow && props.priceLow !== 10000000 && props.priceUp) {setRange({
            min: Number(props.priceLow.toFixed(0)),
            max: Number(props.priceUp.toFixed(0))

        })}

    }, [props.priceUp])
    return (
        <div className='mw-100 mh-25'>
            {

                ((range.min || range.min === 0) && range.max && priceUpApi && maxPrice) &&
                <div  className='w-100'>
                    <p className='mb-4'> Диапазон: {Number(range.min).toFixed(0)} - {Number(range.max).toFixed(0)} </p>

                    <InputRange
                        maxValue={Number(Number(maxPrice).toFixed(0))+100}
                        minValue={Number('0')}
                        step={100}
                        value={range}
                        onChange={value => {
                            setRange(value)
                        }}

                    />

                    <Button
                        as={Col}
                        variant='primary'
                        onClick={() => {
                            props.setPriceRangeCanvasShow(false)
                            props.setPriceUp(range.max)
                            props.setPriceLow(range.min)
                            props.setPriceRange([range.min, range.max])
                        }}
                        className='mt-4 w-100'
                    >
                        Применить
                    </Button>
                </div>
            }
        </div>

    )
}

export default PriceSlider