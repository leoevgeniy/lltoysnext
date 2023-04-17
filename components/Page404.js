import React, {useEffect} from "react";
// import './css/page404.css'
import {Link} from "react-router-dom";

function Page404() {
    const Application = ( function () {
        let canvas;
        let ctx;
        let imgData;
        let pix;
        let WIDTH;
        let HEIGHT;
        let flickerInterval;

        let init = function () {
            canvas = document.getElementById('canvas');
            ctx = canvas.getContext('2d');
            canvas.width = WIDTH = 700;
            canvas.height = HEIGHT = 500;
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, WIDTH, HEIGHT);
            ctx.fill();
            imgData = ctx.getImageData(0, 0, WIDTH, HEIGHT);
            pix = imgData.data;
            flickerInterval = setInterval(flickering, 30);
        };

        let flickering = function () {
            for (let i = 0; i < pix.length; i += 4) {
                let color = (Math.random() * 255) + 50;
                pix[i] = color;
                pix[i + 1] = color;
                pix[i + 2] = color;
            }
            ctx.putImageData(imgData, 0, 0);
        };

        return {
            init: init
        };
    }());
    useEffect(() => {
        Application.init();
    })

    return (
        <div className='page404'>
            <h1>404</h1>

            <div className="frame">
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div className="caps"><img src="http://ademilter.com/caps.png" alt=""/></div>
            <canvas id="canvas"></canvas>
        </div>
    )
}

export default Page404

