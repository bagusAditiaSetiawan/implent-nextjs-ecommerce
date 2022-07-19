import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {Card, Col, Container, Row} from "react-bootstrap";
import FrontLayout from "../../components/layouts/front.layout";
import { getVaByOrderId } from "../../functions/midtrans.function";
function PaymentVA() {
    const route = useRouter();
    const {id}  = route.query;
    const [va, setVa] = useState({});
    const [method, setMethod] = useState({});
    useEffect(() => {
        if(id) {
            getVaByOrderId(id).then((res)=>{
                setVa(res.data.data);
                setMethod(res.data.method)
            }).catch((e) => {
                console.log(e);
            })
        }       
    }, [id]);

    return (
        <FrontLayout>
             <Head>
                <title>GiftLove - Pembayaran</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Container>
                <Row>
                    {va && va.va_number && (
                        <Col md={{
                            span: 4,
                            offset: 4,
                        }}>
                            <Card className="mt-5">
                                <Card.Header
                                style={{
                                    backgroundColor: "#27ae60",
                                    color: "#fff",
                                    textAlign: "center",
                                }}
                                >Pembayaran memalui {va.payment_type.split('_').join(' ')}</Card.Header>
                                <Card.Body className="d-flex justify-content-center p-4">
                                    <Card.Title>{va.va_number_bank.toUpperCase()} {va.va_number}</Card.Title>
                                </Card.Body>
                            </Card>
                        </Col>
                    )}                   
                </Row>
            </Container>
        </FrontLayout>
    )
}
export default PaymentVA
