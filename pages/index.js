import React, {useState} from "react";
import Head from "next/head";
import HomeScreen from '../screens/HomeScreen'
import axios from "axios";
import {API_HOST} from "@/consts";
import {wrapper} from "@/redux/store";
import {useRouter} from "next/router";
import MyVerticallyCenteredModal from "@/components/MyVerticallyCenteredModal";


const Home = ({pageProps}) => {

    const history = useRouter()
    try {
        if (pageProps.search) {
            history.push(`/search?keyword=${pageProps.search}`)
        }

    } catch {
    }
    return (
        <>
            <Head>

                <title>Магазин интимных товаров</title>
                <meta
                    name="description"
                    content="Интернет магазин секс шоп интимных товаров.
      У нас большой выбор - вибраторы, фаллоимитаторы, вагинальные шарики, вакуумные помпы,
      фаллопротез, вибростимулятор, духи феромоны, анальная смазка, надувные резиновые куклы,
      возбуждающие средства, сексуальное эротическое белье, мужское и женское нижнее белье,
      наручники, кляпы, кандалы, плетки. Доставка почтой по России и курьером в Москве."
                />
            </Head>

            <HomeScreen
                data={pageProps.topData}
                bestSeller={pageProps.bestSeller}
                novelties={pageProps.novelties}
            />
        </>


    )

}


export const getServerSideProps = wrapper.getServerSideProps(store => async (ctx) => {

    const {keyword} = ctx.query;
    let {data} = await axios.get(`${API_HOST}/api/products/top`);

    const topData = data
    data = {}
    const {data: bestSeller} = await axios.get(`${API_HOST}/api/products/bestseller`);
    const {data: novelties} = await axios.get(`${API_HOST}/api/products/new`);
    let search = null
    if (keyword) {
        search = keyword
    }

    if (!topData) {
        return {
            notFound: true,
        }
    }
    return {
        props: {
            topData,
            search,
            bestSeller,
            novelties
        }
    }
})
// export default connect(mapStateToProps, mapDispatchToProps)(Home)
export default Home