import '@/styles/globals.css'
import {Provider} from "react-redux";
import React from "react";
import store from "@/redux/store";
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
    const { store, props } = wrapper.useWrappedStore(rest);
    // const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
    // const [isLoading, setIsLoading] = useState(true)
    // const router = useRouter()
    // const getInitialProps = async ({Component, ctx}) => {
    //     const appProps = Component.getInitialProps ? await Component.getInitialProps(ctx): {};
    // //
    //     return { appProps: appProps };
    // //
    // }
    // useEffect(() => {
        // typeof document !== undefined ? require("bootstrap/dist/js/bootstrap") : null;
        // const userInfo = localStorage.getItem("userInfo")
        // console.log(userInfo)
        // router.isReady && setIsLoading(false)
    // }, []);
    // const wrapper = createWrapper(() => store);
    // const {appProps} = wrapper.useWrappedStore(rest);
    return (
        <>
            {/*{!isLoading &&*/}
                <Provider store={store}>
                    <Layout>
                        <Component {...rest} />
                    </Layout>
                </Provider>
            {/*}*/}
        </>
    )

}
// const makeStore = () => store;
// const wrapper = createWrapper(makeStore);

export default MyApp