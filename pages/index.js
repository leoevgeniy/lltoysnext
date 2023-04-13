import React from "react";
import {useState} from "react";
import Head from "next/head";
import HomeScreen from '../screens/HomeScreen'
import MyVerticallyCenteredModal from '../components/MyVerticallyCenteredModal'

const Home = () => {
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
            <HomeScreen/>
        </>


    )
        ;
}


// const mapStateToProps = state => ({
//     productlist: state.productlist
// })
//
// const mapDispatchToProps = (dispatch) => {
//     return {
//         listProducts: listProducts
//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Home)
export default Home