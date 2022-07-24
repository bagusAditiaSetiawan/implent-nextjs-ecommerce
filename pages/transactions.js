import {useState, useEffect} from "react"
import FrontLayout from "../components/layouts/front.layout";
import {Card, Col, Container, Row, Image} from "react-bootstrap";
import styles from "./../styles/front-layout/style.module.css";
import {useRouter} from "next/router";
import { baseApi } from "../config";
import Link from "next/link";
import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import { getMyTransactionAction } from "../actions/transaction.action";
import { CartBtn } from "../components/buttons/cart.btn";

export default function Transactions() {
    const router = useRouter();
    const dispatch = useDispatch();
    const {list = {}, loading, error: errorMyTransaction} = useSelector(state => state.mytransaction);
    const {data = [], meta = {}} = list;
    const {pages = 0} = meta;
    const [page, setPage] = useState(1);
    const {error} = useSelector(state => state.userCurrent);

    useEffect(async () => {
        if(error && error.status === 401) {
            localStorage.removeItem('token')
            router.push('/login');
        }
    }, [error]);

    useEffect(async () => {
        dispatch(getMyTransactionAction(page, 2))
    }, [page]);

    const handleMoreMyTransaction = () => {
        setPage(page+1);
    }

    const logs = {
        WAITING_PAYMENT: 'Menunggu Pembayaran',
        WAITING_APPROVE: 'Pembayaran Diterima ',
        ON_DELIVERY: 'Dalam Perjalanan',
        DELIVERIED: 'Sampai Tujuan',
        RECEIVED: 'Diterima',
        DECLINED: 'Ditolak',
    };

    return (
        <FrontLayout>
            <Head>
                <title>GiftLove - Transactions</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Container>
                <Row className="mt-3">
                    <Col md={{
                        span: 6,
                        offset: 3,
                    }}>
                    <h2 className={styles.listTransaction } >Daftar Transaksi</h2>
                    {data.map(transaction => {
                        return (
                        <Card className={styles.transactionItem} key={transaction.id}>
                            <Card.Body>
                                <div className="d-flex justify-content-between mb-2">
                                    <Card.Subtitle className={[styles.textTitle]}>No Transaksi {transaction.transaction_number}</Card.Subtitle>
                                    <Card.Subtitle className={[styles.textTitle]}>{logs[transaction.last_log]}</Card.Subtitle>
                                </div>
                                <Row>
                                    <Col md={3}>
                                        <Image src={`${baseApi}/fileupload/${transaction.transaction_items[0].product.image.filename}`} 
                                        width={80} height={80}
                                        />
                                    </Col>
                                    <Col md={9}>
                                        <div className={styles.paragItem}>{transaction.shippings[0].shipping_name}</div>
                                        <div className={styles.paragItem}>{transaction.shippings[0].shipping_address}</div>
                                        <div className={styles.textTitle}>IDR {transaction.total_price}</div>
                                    </Col>
                                </Row>
                                <Link href={`/transactions/${transaction.id}`}>
                                 <button className={styles.btnRegister}>Lihat Detail</button>
                                </Link>
                                <Link href={`/payments/${transaction.transaction_number}`}>
                                 <button className={styles.btnLogin}>Lihat Pembayaran</button>
                                </Link>
                            </Card.Body>
                        </Card>
                        )
                    })}        
                    {page < pages && (
                        <CartBtn onClick={handleMoreMyTransaction}>More</CartBtn>
                    )}           
                    </Col>
                </Row>
            </Container>
        </FrontLayout>
    )
}
