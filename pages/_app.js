import '@/styles/globals.css'
import {Provider} from "react-redux";
import React from "react";
import Layout from '@/components/layout'
import '@/styles/header.css'
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

const MyApp = ({Component, ...rest}) => {
    const {store, props} = wrapper.useWrappedStore(rest);
    return (
        <>
            <Provider store={store}>
                <Layout>
                    <Component {...rest} />
                </Layout>
            </Provider>
        </>
    )

}

export default MyApp