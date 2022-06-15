import {Col, Image, Card} from "react-bootstrap";
import styles from "./../../styles/front-layout/style.module.css"
import {baseApi} from "../../config";
import {CartBtn} from "../buttons/cart.btn";
import {BuyBtn} from "../buttons/buy.btn";
import {addToCart} from "../../functions/carts.function";
import {toast} from "react-toastify";
import {useRouter} from "next/router";
import Link from "next/link";

export function DetailProduct({product}) {
    const router = useRouter();
    async function addToCartHandler(id) {
        try {
            await addToCart(product.id);
            toast.success("Sukses menambahkan produk ke keranjang");
        } catch (e) {
            if(e.response.status === 401) {
                toast.warning("Anda Belum Login Silahkan Login Terlebih Dahulu");
                router.push("/login");
                return;
            }
            toast.warning("Terjadi kesalahan silahkan coba kembali");
        }
    }

    return (
        <>
            <Col>
                <Image src={`${baseApi}/fileupload/${product.image.id}`} className="img-fluid" />
            </Col>
            <Col>
                <h2 className={styles.productDetailTitle}>{product.name}</h2>
                <p className={styles.productDetailPrice}>Rp {product.price_sell}</p>
                <p>{product.description}</p>
            </Col>
            <Col>
                <Card className="p-4">
                    <Card.Body>
                        <CartBtn className="mb-2" onClick={() => (addToCartHandler(product.id))}>+ Keranjang</CartBtn>
                        <Link href={`/buying/${product.id}`}>
                            <BuyBtn>Beli Langsung</BuyBtn>
                        </Link>
                    </Card.Body>
                </Card>
            </Col>
        </>
    );
};
