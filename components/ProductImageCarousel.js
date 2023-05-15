import React, {useState} from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from "react-responsive-carousel";
import ImageModal from "./ImageModal";

export default function ProductImageCarousel(products) {
    const [modalShow, setModalShow] = React.useState(false);
    const [source, setSource] = React.useState(false);
    const {product} = products
    const images = []
    for (let field in product) {
        if (field.indexOf('image') !== -1) {
            if (field.indexOf('imageSmall') === -1) {
                if (product[field]) {
                    images.push({field: product[field]})
                }
            }
        }
    }
    const imageHandler = (i) => {
        setModalShow(true)
        setSource(images[i].field)
    }
    return (

        <div className='carousel-wrapper w-100'>
            <ImageModal
                src = {source}

                backdrop="static"
                // keyboard={false}

                show={modalShow}
                onHide={() => setModalShow(false)}
                // backdropClassName=''
            />
            <Carousel showArrows infiniteLoop autoFocus dynamicHeight onClickItem={imageHandler} className='float-end w-100'>
                {images.map((image, index) => {
                    return (
                <div key={index} className='selectedImage d-inline-block justify-self-center' style={{'maxheight' : '400px'}}>
                    <img alt={product.name} src={image.field} className='centeredImage'/>
                </div>)
                })}

            </Carousel>
        </div>
    )
}