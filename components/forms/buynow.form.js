import styles from "../../styles/front-layout/style.module.css";
import {baseApi} from "../../config";
import {Col, Form, Image, Row} from "react-bootstrap";
import { TotalFormBuyNow } from "./buynow.total.form";
import { ShippingBuyNowForm } from "./buynow.shipping.form";
import { MethodPaymentBuyNowForm } from "./buynow.methodpayment.form";


export function BuyNowForm({
    checkoutHandler, 
    product = {}, 
    transaction = {}, 
    provinces = [], 
    cities=[], 
    couriers=[],
    shippingCosts = [],
    mitras=[],
    setTransaction,
}) {
    return (
        <>
        <Form onSubmit={checkoutHandler}>
            <Row className="mt-3">
                <Col md={4}>
                    <Image src={`${baseApi}/fileupload/${product.image.filename}`} className="img-fluid" />
                </Col>
                <Col md={4}>
                    <h2 className={styles.productDetailTitle}>{product.name}</h2>
                    <p className={styles.productDetailPrice}>Rp {product.price_sell}</p>
                    <p>{product.description}</p>
                    <Form.Control type="number" value={transaction.amount}
                    onChange={(e) => {
                        const filter = transaction.item_details.filter(item=>item.id !== product.id);
                        setTransaction((trans) => ({...trans, 
                            amount: parseInt(e.target.value),
                            total: product.price_sell * parseInt(e.target.value),
                            item_details: [...filter, {
                                id: product.id,
                                price: product.price_sell,
                                quantity: parseInt(e.target.value),
                                name: product.name,
                            }]
                        }))
                    }}
                    required={true} />
                    <h2 className={styles.productDetailTitle}>Pengiriman</h2>
                    <ShippingBuyNowForm
                    setTransaction={setTransaction}
                    mitras={mitras}
                    transaction={transaction}
                    provinces={provinces}
                    cities={cities}
                    couriers={couriers}
                    shippingCosts={shippingCosts}
                    product={product}
                    />
                </Col>
                <Col md={4}>
                    <MethodPaymentBuyNowForm transaction={transaction} mitras={mitras} setTransaction={setTransaction}  />
                    <TotalFormBuyNow transaction={transaction} />
                </Col>
            </Row>
        </Form>
        </>
    )
}