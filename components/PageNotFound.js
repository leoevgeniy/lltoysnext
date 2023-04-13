import React from "react";
import './css/PageNotFound.css'


function PageNotFound() {
    // throw new CustomError('PRODUCT_NOT_FOUND', 404, 'Продукт не найден')
    return (
        <div>
            <div className='PNF'>
                <a href="/" target="_blank">
                    <div className="top-header ">
                    </div>
                    <div>
                        <div className="starsec"></div>
                        <div className="starthird"></div>
                        <div className="starfourth"></div>
                        <div className="starfifth"></div>
                    </div>
                    <div className="lamp__wrap">
                        <div className="lamp">
                            <div className="cable"></div>
                            <div className="cover"></div>
                            <div className="in-cover">
                                <div className="bulb"></div>
                            </div>
                            <div className="light"></div>
                        </div>
                    </div>
                    <section className="error">
                        <div className="error__content">
                            <div className="error__message message">
                                <h1 className="message__title">Страница не найдена</h1>
                                <p className="message__text">Извините, страница, которую вы искали, здесь не найдена. А
                                    Ссылка, с которой вы следовали, может быть сломана, либо больше не существует.
                                    Пожалуйста, попробуйте еще раз или вернитесь на главную страницу.</p>
                            </div>
                        </div>

                    </section>

                </a>
            </div>
        </div>
    )


}

export default PageNotFound;