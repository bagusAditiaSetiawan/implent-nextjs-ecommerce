import {useState, useEffect} from "react"
import FrontLayout from "../components/layouts/front.layout";
import CarouselFront from "../components/carousel/corousel.front";
import {Container, Row} from "react-bootstrap";
import styles from "./../styles/front-layout/style.module.css";
import WrapperProduct from "../components/products/wrapper.product";
import {getProducts} from "../functions/product.function";
import {currentUser} from "../functions/auth.function";
import {useRouter} from "next/router";
import Head from "next/head";
import { useSelector } from "react-redux";

export default function Carts() {
    const router = useRouter();
    const {error} = useSelector(state => state.userCurrent);
    useEffect(async () => {
        if(error && error.status === 401) {
            localStorage.removeItem('token')
            router.push('/login');
        }
    }, [error]);

    return (
        <FrontLayout>
             <Head>
                <title>GiftLove - Carts</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Container>
                <CarouselFront />
                <Row className="mt-3">

                </Row>
            </Container>

        </FrontLayout>
    )
}
