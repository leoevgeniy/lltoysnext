import {Html, Head, Main, NextScript} from 'next/document'
import React from "react";
import Script from "next/script";

export default function Document() {
    return (
        <Html lang="en">
            <Head>
            </Head>
            <body id='root'>
            <Main/>
            <NextScript/>

            {/* eslint-disable-next-line @next/next/inline-script-id */}
            <Script strategy="afterInteractive" dangerouslySetInnerHTML={{
                __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','G-R2GKBR716D');`
            }}></Script>

            </body>
        </Html>
    )
}
