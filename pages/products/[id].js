import {Container, Row} from "react-bootstrap";
import FrontLayout from "../../components/layouts/front.layout";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {DetailProduct} from "../../components/products/detail.product";
import {getDetailProduct} from "./../../functions/product.function";
import Head from "next/head";

function ProductDetail() {
    const {id}  = useRouter().query;
    const [productId, setProductId] = useState(0);
    const [product, setProduct] = useState({});

    useEffect(() => {
        setProductId(id);
    }, [id]);

    useEffect(async () => {
        if(productId) {
            const product = await getDetailProduct(productId);
            setProduct(product);
        }
    }, [productId]);
    return (
        <FrontLayout>
            <Head>
                <title>GiftLove - {product.name}</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Container>
                {product && product.id && (
                    <Row className="mt-3">
                        <DetailProduct product={product} />
                    </Row>
                )}

            </Container>
        </FrontLayout>
    )
}
export default ProductDetail
