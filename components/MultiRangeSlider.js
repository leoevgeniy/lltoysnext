import React, { useCallback, useEffect, useState, useRef } from "react";
import {LOCATION} from "@/consts";
import {useRouter} from "next/router";
// import PropTypes from "prop-types";
// import "./multiRangeSlider.css";

const MultiRangeSlider = ({ min, max, minInput, maxInput, onChange, setMouseUp, setMaxRangeValue, setMinRangeValue }) => {
    const [minVal, setMinVal] = useState(minInput);
    const [maxVal, setMaxVal] = useState(maxInput);
    const minValRef = useRef(min);
    const maxValRef = useRef(max);
    const range = useRef(null);

    // Convert to percentage
    const getPercent = useCallback(
        (value) => Math.round(((value - min) / (max - min)) * 100),
        [min, max]
    );

    // Set width of the range to decrease from the left side
    useEffect(() => {
        const minPercent = getPercent(minVal);
        const maxPercent = getPercent(maxValRef.current);

        if (range.current) {
            range.current.style.left = `${minPercent}%`;
            range.current.style.width = `${maxPercent - minPercent}%`;
        }
    }, [minVal, getPercent]);

    // Set width of the range to decrease from the right side
    useEffect(() => {
        const minPercent = getPercent(minValRef.current);
        const maxPercent = getPercent(maxVal);

        if (range.current) {
            range.current.style.width = `${maxPercent - minPercent}%`;
        }
    }, [maxVal, getPercent]);

    // Get min and max values when their state changes
    useEffect(() => {
        onChange({ min: minVal, max: maxVal });


    }, [minVal, maxVal, onChange]);

    return (
        <div className="MRslider">
            <input
                type="range"
                min={min}
                max={max}
                value={minVal}
                onChange={(event) => {
                    const value = Math.min(Number(event.target.value), maxVal - 1);
                    // setMinVal(event.target.value);
                    setMinRangeValue(value)
                    setMinVal(value);
                    minValRef.current = value;
                }}
                onMouseUp={()=> setMouseUp(true)}
                onTouchEnd={()=> setMouseUp(true)}


                className="thumb thumb--left"
                style={{ zIndex: minVal > max - 100 && "5" }}
            />
            <input
                type="range"
                min={min}
                max={max}
                value={maxVal}
                onChange={(event) => {
                    const value = Math.max(Number(event.target.value), minVal + 1);
                    setMaxVal(value);
                    // setMaxRangeValue(value)
                    maxValRef.current = value;
                }}
                onMouseUp={()=> setMouseUp(true)}
                onTouchEnd={()=> setMouseUp(true)}

                className="thumb thumb--right"
            />

            <div className="slider">
                <div className="slider__track" />
                <div ref={range} className="slider__range" />
                <div className="slider__left-value">
                    <input
                        className='text-black'
                        value={minVal}
                        min={min}
                        max={max}
                        style={{ width: "40px", height: "25px", marginLeft: "-10px" }}
                        onChange={(e) => {
                            setMinVal(e.target.value);
                        }}
                    />
                </div>
                <div className="slider__right-value">
                    <input
                        className='text-black'

                        value={maxVal}
                        min={min - 1}
                        max={max}
                        style={{ width: "40px", height: "25px", marginLeft: "-10px" }}
                        onChange={(e) => {
                            setMaxVal(e.target.value);
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

// MultiRangeSlider.propTypes = {
//     min: PropTypes.number.isRequired,
//     max: PropTypes.number.isRequired,
//     onChange: PropTypes.func.isRequired
// };

export default MultiRangeSlider;
