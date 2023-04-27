import '@/styles/globals.css'
import {Provider} from "react-redux";
import React, {useEffect, useState} from "react";
import Layout from '@/components/layout'
import '@/styles/header.css'
import '@/styles/category.css'
import '@/styles/catalog.css'
import '@/styles/fontawesome.min.css'
import 'bootstrap/dist/css/bootstrap.css'
import '@/styles/searchBox.css'
import '@/styles/loginScreen.css'
import '@/styles/footer.css'
import '@/styles/page404.css'
import '@/styles/topCarousel.css'
import '@/styles/ProductScreen.css'
import '@/styles/ProductImageCarousel.css'
import '@/styles/homeScreen.css'
import '@/styles/imageModal.css'
import '@/styles/inputPD.css'
import '@/styles/PageNotFound.css'
import '@/styles/product.css'
import '@fortawesome/fontawesome-svg-core/styles.css'
import {wrapper} from "@/redux/store";
import Head from "next/head";

const MyApp = ({Component, ...rest}) => {
    const {store, props} = wrapper.useWrappedStore(rest);
    const size = useWindowSize();

    return (
        <div style={size.width < 768 ? {'marginTop': '75px'}:{}}>
            <Head>
            </Head>
            <Provider store={store}>
                <Layout>
                    <Component {...rest} />
                </Layout>
            </Provider>
        </div>
    )

}
function useWindowSize() {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined,
    });
    useEffect(() => {
        // only execute all the code below in client side
        // Handler to call on window resize
        function handleResize() {
            // Set window width/height to state
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }
        // Add event listener
        window.addEventListener("resize", handleResize);
        // Call handler right away so state gets updated with initial window size
        handleResize();
        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount
    return windowSize;
}
export default MyApp