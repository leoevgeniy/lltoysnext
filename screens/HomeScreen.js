import React from "react";
import Link from "next/link";
import Image from "next/image";
import {Badge} from "react-bootstrap";
import home from '@/public/home.png'
import cartImg from '@/public/cart.png'
import user from '@/public/user.png'
import logo from '@/public/logo.png'
import {useDispatch, useSelector} from "react-redux";
import BannersCarousel from '@/components/BannersCarousel'
import erotic from '@/public/erotic.jpg'
import bdsm from '@/public/bdsmhorisontal.png'
import lubricants from '@/public/lubricants.png'
import toys from '@/public/toys.png'
import things from '@/public/things.png'
import sexmebel from '@/public/sexmebel.jpg'
import women from '@/public/women.jpg'
import womenSmall from '@/public/womenSmall.jpg'
import men from '@/public/men.jpg'
import nignee from '@/public/nignee.jpg'
import kupalniki from '@/public/kupalniki.jpg'



const HomeScreen = () => {
    const dispatch = useDispatch()
    const userLogin = useSelector((state) => state.userLogin);
    const {userInfo} = userLogin;
    const cart = useSelector(state => state.cart)
    const {cartItems} = cart
    return (
        <div className='homescreen'>
            <div className='mainlady'>
                <Link href='/'>
                    <Image className='home' src={home} alt='home' />
                </Link>
                <Link href='/cart'>
                    <div>
                        <Image className='cart' src={cartImg} alt='cart'/>

                        {cart && cartItems && cartItems.length>0 && <Badge className='cartBadge text-center' style={{}} bg='primary'>{cart.cartItems.length}</Badge>}

                    </div>
                </Link>
                {!userInfo &&
                    <Link href='/login'>
                        <Image className='user' src={user} alt='user' />
                    </Link>
                }

                <Link href='/'>
                    <Image className='logo' src={logo} alt='logo' />
                </Link>
            </div>
            <div className="w-100 pt-1">
                    <div className='categories'>
                        <Link className='category category1' href='/category/Эротическая одежда'>
                            <Image loading="lazy" src={erotic} alt='Эротическая одежда'/>
                        </Link>
                        <Link className='category category2' href='/category/BDSM, садо-мазо товары'>
                            <Image loading="lazy" src={bdsm} alt='BDSM, садо-мазо товары'/>
                        </Link>
                        <Link className='category category3' href='/category/Смазки, лубриканты'>
                            <Image loading="lazy" src={lubricants} alt='Смазки, лубриканты'/>
                        </Link>
                        <Link className='category category4' href='/category/Анальные игрушки'>
                            <Image loading="lazy" src={toys} alt='Анальные игрушки'/>
                        </Link>
                        <Link className='category category5' href='/category/Приятные мелочи'>
                            <Image loading="lazy" src={things} alt='Приятные мелочи'/>
                        </Link>
                        {/*<Link className='category category2' href='/?category=BDSM, садо-мазо товары'/>*/}
                        {/*<Link className='category category3' href='/?category=Смазки, лубриканты'/>*/}
                        {/*<Link className='category category4' href='/?category=Анальные игрушки'/>*/}
                        {/*<Link className='category category5' href='/?category=Приятные мелочи'/>*/}
                    </div>
            </div>
            <BannersCarousel/>
            <div className="w-100">
                <div className='categories2'>
                    <Link className='category category6' href='/category/Секс-мебель и качели'>
                        <Image loading="lazy" src={sexmebel} alt='Секс-мебель и качели'/>
                    </Link>
                    <Link className='category category7' href='/category/Секс-товары для женщин'>
                        <Image loading="lazy" src={women} alt='Секс-товары для женщин'/>
                    </Link>
                    <Link className='category category11' href='/category/Секс-товары для женщин'>
                        <Image loading="lazy" src={womenSmall} alt='Секс-товары для женщин'/>
                    </Link>
                    <Link className='category category8' href='/category/Секс-товары для мужчин'>
                        <Image loading="lazy" src={men} alt='Секс-товары для мужчин'/>
                    </Link>
                    <Link className='category category9' href='/category/Нижнее белье'>
                        <Image loading="lazy" src={nignee} alt='Нижнее белье'/>
                    </Link>
                    <Link className='category category10' href='/category/Купальники'>
                        <Image loading="lazy" src={kupalniki} alt='Купальники'/>
                    </Link>
                </div>
            </div>

        </div>
    )
}

export default HomeScreen