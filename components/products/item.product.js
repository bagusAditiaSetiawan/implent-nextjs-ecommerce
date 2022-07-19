import {Card, CardImg} from "react-bootstrap";
import {baseApi} from "../../config";
import styles from "../../styles/front-layout/style.module.css";
import Link from "next/link";

export function ItemProduct({ product }) {
    return (
        <Link href={`/products/${product.id}`}>
            <Card className={styles.productItem}>
                <CardImg src={`${baseApi}/fileupload/${product.image.filename}`} className={styles.productImage} />
                <Card.Body>
                    <Card.Title className={styles.productTitle}>{product.name}</Card.Title>
                    <Card.Title className={styles.productPrice}>Rp. {product.price_buy}</Card.Title>
                </Card.Body>
            </Card>
        </Link>
    )
}
