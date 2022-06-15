import {Card, Col, Container, Form, Image, Row} from "react-bootstrap";
import FrontLayout from "../../components/layouts/front.layout";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {DetailProduct} from "../../components/products/detail.product";
import {getDetailProduct} from "./../../functions/product.function";
import {baseApi} from "../../config";
import styles from "../../styles/front-layout/style.module.css";
import {CartBtn} from "../../components/buttons/cart.btn";
import Link from "next/link";
import {BuyBtn} from "../../components/buttons/buy.btn";

function BuyingProduct() {
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
            <Container>
                {product && product.id && (
                    <Row className="mt-3">
                        <Col md={4}>
                            <Image src={`${baseApi}/fileupload/${product.image.id}`} className="img-fluid" />
                        </Col>
                        <Col md={4}>
                            <h2 className={styles.productDetailTitle}>{product.name}</h2>
                            <p className={styles.productDetailPrice}>Rp {product.price_sell}</p>
                            <p>{product.description}</p>
                            <Form.Control type="number" />
                            <h2 className={styles.productDetailTitle}>Pengiriman</h2>
                        </Col>
                        <Col md={4}>
                            <Card className="p-4">
                                <Card.Body>
                                    <CartBtn className="mb-2" onClick={() => (addToCartHandler(product.id))}>Bayar</CartBtn>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                )}

            </Container>
        </FrontLayout>
    )
}
export default BuyingProduct
