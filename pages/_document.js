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
            <script
                dangerouslySetInnerHTML={{
                    __html: `
                (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
                (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
      
                ym(90717918, "init", {
                      clickmap:true,
                      trackLinks:true,
                      accurateTrackBounce:true
                });
              `,
                }}
            />
            <noscript>
                <div>
                    <img src="https://mc.yandex.ru/watch/12345678" style={{position: 'absolute', left: '-9999px'}}
                         alt=""/>
                </div>
            </noscript>
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