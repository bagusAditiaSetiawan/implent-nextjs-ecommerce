import {Col} from "react-bootstrap";
import {ItemProduct} from "./item.product";

export default function WrapperProduct({ children, products }) {
    return (
        <>
            {products.map((product) => (
                <Col md={2} key={product.id}>
                    <ItemProduct product={product} />
                </Col>
            ))}
        </>
    )
}