import React from "react";
import {useState} from "react";
import Head from "next/head";
import HomeScreen from '../screens/HomeScreen'
import MyVerticallyCenteredModal from '../components/MyVerticallyCenteredModal'
import axios from "axios";
import {API_HOST} from "@/consts";
import {connect, useDispatch} from "react-redux";
import {wrapper} from "@/redux/store";
import {useAppSelector} from "@/Hook";
import {reduxLogin} from "@/redux/actions/userActions";


const Home = ({pageProps}) => {
    // const isServer = typeof window === "undefined";
    // let {userInfo} = useAppSelector(state=> state.userLogin)
    // if (!isServer) {
    //     userInfo = localStorage.getItem('userInfo')
    // }
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
            />
        </>


    )

}


// const mapStateToProps = state => {
//     console.log(state)
//
// }
// const getStaticProps = wrapper.getStaticProps(({state}) => {
//     console.log(state.userLogin)
// })
// ({
//     userInfo: state.userLogin.userInfo
// })
//
// const mapDispatchToProps = (dispatch) => {
//     return {
//         listProducts: listProducts
//     }
// }

export const getServerSideProps = wrapper.getServerSideProps(store => async (ctx) => {
    const {data} = await axios.get(`${API_HOST}/api/products/top`);
    if (!data) {
        return {
            notFound: true,
        }
    }
    return {props: {topData: data}}
})
// export default connect(mapStateToProps, mapDispatchToProps)(Home)
export default Home