import {Html, Head, Main, NextScript} from 'next/document'
import React, {useEffect} from "react";
export default function Document() {
    const height = 0

    return (
        <Html lang="en">
            <Head>
            </Head>
            <body id='root' style={{'minHeight': height}}>
            <Main/>
            <NextScript/>
            </body>
        </Html>
    )
}
