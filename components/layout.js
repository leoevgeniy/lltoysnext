import Header from "@/components/Header";
import Footer from "@/components/Footer";
import React, {useState} from "react";
import MyVerticallyCenteredModal from "@/components/MyVerticallyCenteredModal";

const Layout = ({children, pageProps}) => {
    console.log(pageProps)
    const [navShow, setNavShow] = useState(false);
    const [expandedFilter, setExpandedFilter] = useState(false)
    const [modalShow, setModalShow] = useState(true);

    return (
        <>
            {/*<MyVerticallyCenteredModal*/}
            {/*    backdrop="static"*/}
            {/*    keyboard={false}*/}
            {/*    show={modalShow}*/}
            {/*    onHide={() => setModalShow(false)}*/}
            {/*    backdropClassName=''*/}
            {/*/>*/}
            <Header
                expadedFilter={expandedFilter}
                setExpandedFilter={setExpandedFilter}
                setNavShow={setNavShow}
                navShow={navShow}

            />
            {children}
            <Footer/>
        </>
    )
}
export default Layout