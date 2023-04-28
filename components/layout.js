import Header from "@/components/Header";
import Footer from "@/components/Footer";
import React, {useEffect, useState} from "react";
import MyVerticallyCenteredModal from "@/components/MyVerticallyCenteredModal";
import {userAgent} from "next/server";
import HeaderSmall from "@/components/HeaderSmall";
import FooterSmall from "@/components/FooterSmall";

const Layout = ({children}) => {
    const [modalShow, setModalShow] = useState(true);
    return (
        <div id='layout' style={{'backgroundColor': 'black'}}>
            {/*<MyVerticallyCenteredModal*/}
            {/*    backdrop="static"*/}
            {/*    keyboard={false}*/}
            {/*    show={modalShow}*/}
            {/*    onHide={() => setModalShow(false)}*/}
            {/*    backdropClassName=''*/}
            {/*/>*/}
            <Header/>
            <HeaderSmall/>
                {children}
            <Footer/>
            <FooterSmall/>
        </div>
    )
}
export default Layout