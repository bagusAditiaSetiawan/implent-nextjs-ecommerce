import {useState, useEffect} from "react"
import FrontLayout from "../components/layouts/front.layout";
import CarouselFront from "../components/carousel/corousel.front";
import {Container, Row} from "react-bootstrap";
import styles from "./../styles/front-layout/style.module.css";
import WrapperProduct from "../components/products/wrapper.product";
import {getProducts} from "../functions/product.function";
import Head from "next/head";

export default function Home() {
  const [products, setProduct] = useState([]);
  useEffect(async () => {
      const resProduct = await getProducts(1, 6);
      setProduct(resProduct.data);
  }, []);

  return (
      <FrontLayout>
         <Head>
            <title>GiftLove - Beranda</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
          <Container>
              <CarouselFront />
              <Row className="mt-3">
                  <h2 className={styles.textTitle} >Cari Produk Terbaru</h2>
                  <WrapperProduct products={products} />
              </Row>
          </Container>

      </FrontLayout>
  )
}
