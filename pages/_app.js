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
import '@/styles/multiRangeSlider.css'
import '@fortawesome/fontawesome-svg-core/styles.css'
import 'pure-react-carousel/dist/react-carousel.es.css';
import {wrapper} from "@/redux/store";
import Head from "next/head";
import MyVerticallyCenteredModal from "@/components/MyVerticallyCenteredModal";

const MyApp = ({Component, ...rest}) => {
    const {store, props} = wrapper.useWrappedStore(rest);
    const size = useWindowSize();
    const [modalShow, setModalShow] = useState(true);

    return (
        <div style={size.width < 768 ? {'marginTop': '70px'} : {}} className='bg-black'>
            <Head>
            </Head>
            <Provider store={store}>
                <Layout>
                    <div className='children' style={size.width < 768 ? {'marginBottom': '70px'} : {}}>
                        <MyVerticallyCenteredModal
                            backdrop="static"
                            keyboard={false}
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                            backdropClassName=''
                        />
                        <Component {...rest} />
                    </div>
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