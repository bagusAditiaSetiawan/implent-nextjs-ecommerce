import {useState, useEffect} from "react"
import FrontLayout from "../components/layouts/front.layout";
import {Container, Row} from "react-bootstrap";
import styles from "./../styles/front-layout/style.module.css";
import WrapperProduct from "../components/products/wrapper.product";
import {getProducts} from "../functions/product.function";
import Head from "next/head";
import { CartBtn } from "../components/buttons/cart.btn";


export default function Products() {
  const [products, setProduct] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  useEffect(async () => {
      const resProduct = await getProducts(page, 6);
      setPages(resProduct.meta.pages);
      setProduct([...products, ...resProduct.data]);
  }, [page]);
  const handleMoreProduct = () => {
    setPage(page+1);
  }

  return (
      <FrontLayout>
         <Head>
            <title>GiftLove - Beranda</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
          <Container>
              <Row className="mt-3">
                  <h2 className={styles.textTitle} >Cari Produk Terbaru</h2>
                  <WrapperProduct products={products} />
                  <div className="d-flex justify-content-center mt-4">
                    {page < pages && (
                        <CartBtn onClick={handleMoreProduct}>More</CartBtn>
                    )}
                  </div>
              </Row>
          </Container>

      </FrontLayout>
  )
}
