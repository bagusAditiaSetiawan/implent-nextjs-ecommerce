import {useState, useEffect} from "react"
import FrontLayout from "../components/layouts/front.layout";
import CarouselFront from "../components/carousel/corousel.front";
import {Container, Row} from "react-bootstrap";
import styles from "./../styles/front-layout/style.module.css";
import WrapperProduct from "../components/products/wrapper.product";
import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import { getProductAction } from "../actions/product.action";

export default function Home() {
  const dispatch = useDispatch();
  const {list = {}, loading, error} = useSelector(state => state.productList);
  const {data = []} = list;
  const [page, setPage] = useState(1);
  useEffect(async () => {
      dispatch(getProductAction(page, 6))
  }, [page]);

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
                  <WrapperProduct products={data} />
              </Row>
          </Container>

      </FrontLayout>
  )
}
