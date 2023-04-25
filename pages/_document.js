import {Html, Head, Main, NextScript} from 'next/document'
import React from "react";
import Script from "next/script";
export default function Document() {
    return (
        <Html lang="en">
            <Head>
                {/*<script src="https://yookassa.ru/checkout-widget/v1/checkout-widget.js"></script>*/}
            </Head>
            <body id='root'>
            <Main/>
            <NextScript/>
            </body>
        </Html>
    )
}
