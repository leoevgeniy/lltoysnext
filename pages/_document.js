import {Html, Head, Main, NextScript} from 'next/document'
import React from "react";
import Script from "next/script";
export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                />
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
                />
                <script src="https://yookassa.ru/checkout-widget/v1/checkout-widget.js"></script>
            </Head>
            <body id='root'>
            <Main/>
            <NextScript/>
            </body>
        </Html>
    )
}
