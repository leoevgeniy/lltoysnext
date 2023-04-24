import Header from "@/components/Header";
import Footer from "@/components/Footer";
import React, {useEffect, useState} from "react";
import MyVerticallyCenteredModal from "@/components/MyVerticallyCenteredModal";
import {userAgent} from "next/server";

const Layout = ({children}) => {
    const [modalShow, setModalShow] = useState(true);
    return (
        <div id='layout'>
            {/*<MyVerticallyCenteredModal*/}
            {/*    backdrop="static"*/}
            {/*    keyboard={false}*/}
            {/*    show={modalShow}*/}
            {/*    onHide={() => setModalShow(false)}*/}
            {/*    backdropClassName=''*/}
            {/*/>*/}
            <Header/>
            {children}
            <Footer/>
        </div>
    )
}
export default Layout