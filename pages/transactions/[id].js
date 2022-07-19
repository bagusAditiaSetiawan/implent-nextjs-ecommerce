import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {Card, Col, Container, Image, Row} from "react-bootstrap";
import FrontLayout from "../../components/layouts/front.layout";
import { getMyTransactionById } from "../../functions/transactions.function";
import { convertLog } from "../../functions/logs.function";
import moment from "moment";
import styles from "./../../styles/front-layout/style.module.css";
import { baseApi } from "../../config";
function TransactionDetail() {
    const route = useRouter();
    const {id = 0}  = route.query;
    const [transaction, setTransaction] = useState({});
    useEffect(() => {
        getMyTransactionById(id).then((res)=>{
            setTransaction(res.data);
        }).catch((e) => {
            console.log(e);
        })
    }, [id]);
    console.log(transaction.transaction_items);

    return (
        <FrontLayout>
             <Head>
                <title>GiftLove - Pembayaran</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Container>
                <Row>
                    {transaction && transaction.transaction_number && (
                        <Col md={{
                            span: 6,
                            offset: 3,
                        }}>
                            <Card className="mt-5">
                                <Card.Header
                                style={{
                                    backgroundColor: "#27ae60",
                                    color: "#fff",
                                    textAlign: "center",
                                }}
                                >{transaction.transaction_number}</Card.Header>
                                <Card.Body>
                                    <div className="d-flex justify-content-between">
                                    <p className="text-muted">Status Pembayaran</p>
                                    <p className="text-bold">{convertLog(transaction.last_log)}</p>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                    <p className="text-muted">Tanggal Pembelian</p>
                                    <p className="text-bold">{moment(transaction.created_at).format('YYYY, MMM DD')}</p>
                                    </div>
                                    <Card.Text>Detail Pembelian</Card.Text>
                                    {transaction.transaction_items.map(item => (
                                        <div key={item.id} className="d-flex justify-content-between">
                                            <div className="d-flex justify-content-between">
                                                <Image
                                                width={80}
                                                height={80}
                                                src={`${baseApi}/fileupload/${item.product.image.filename}`} />
                                                <p>{item.product.name}</p>
                                            </div>
                                            <div>
                                                 <Card.Text>Total Harga</Card.Text>
                                                 <p className={styles.textBold}>Rp {item.price * item.amount}</p>
                                            </div>
                                        </div>
                                    ))}                                   
                                </Card.Body>
                            </Card>
                        </Col>
                    )}                   
                </Row>
            </Container>
        </FrontLayout>
    )
}
export default TransactionDetail
