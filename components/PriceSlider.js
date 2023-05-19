import React, {useEffect, useState} from 'react'
import InputRange from 'react-input-range'
import 'react-input-range/lib/css/index.css'
import Button from "react-bootstrap/Button"
import {Col, Row} from "react-bootstrap";
import {LOCATION} from "@/consts";
import {useRouter} from "next/router";

function PriceSlider({maxPrice, priceRange, setPriceRange, setLoading, setShow}) {
    const [range, setRange] = useState({'min': Number(priceRange[0]), 'max': Number(priceRange[1])})
    const history = useRouter()
    const newUrl = new URL(history.asPath, LOCATION)
    return (
        <div className='mw-100 mh-25 mt-3'>
                <div  className='w-100'>
                    {/*<p className='mb-4'> Диапазон: {Number(range.min).toFixed(0)} - {Number(range.max).toFixed(0)} </p>*/}

                    <InputRange
                        // classNames='text-white'
                        draggableTrack
                        maxValue={Number(Number(maxPrice).toFixed(0))}
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
                            setShow(false)
                            setLoading(true)
                            setPriceRange([range.min, range.max])
                                    newUrl.searchParams.delete('lowprice')
                                    newUrl.searchParams.delete('highprice')
                                    if (newUrl.href.includes('?')) {
                                        history.replace(newUrl.href + '&lowprice=' + range.min + '&highprice=' + range.max, undefined, {scroll: false}).then()
                                    } else {
                                        history.replace(newUrl.href + '?lowprice=' + range.min + '&highprice=' + range.max, undefined, {scroll: false}).then()
                                    }
                        }}
                        className='mt-4 w-100'
                    >
                        Применить
                    </Button>
                </div>
        </div>

    )
}

export default PriceSlider