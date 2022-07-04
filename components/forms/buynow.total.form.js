import {Card, ListGroup} from "react-bootstrap";
import { CartBtn } from "../buttons/cart.btn";

export function TotalFormBuyNow({ transaction=  {} }) {
    return (
            <Card className="p-4">
                    <Card.Body>
                        <ListGroup variant="flush">
                            <ListGroup.Item className="d-flex justify-content-between">
                                <small className="fw-bolder me-25 text-muted">Total Produk</small>
                                <span>Rp {transaction.price * transaction.amount}</span>
                            </ListGroup.Item>
                            <ListGroup.Item className="d-flex justify-content-between">
                                <small className="fw-bolder me-25 text-muted">Ongkir</small>
                                <span>Rp {transaction.shipping_cost}</span>
                            </ListGroup.Item>
                            <ListGroup.Item className="d-flex justify-content-between">
                                <small className="fw-bolder me-25 text-muted">Total</small>
                                <span>Rp {transaction.total}</span>
                            </ListGroup.Item>
                        </ListGroup>
                        <CartBtn className="mb-2">Bayar</CartBtn>
                    </Card.Body>
                </Card>
    );
}