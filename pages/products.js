import {useState, useEffect} from "react"
import FrontLayout from "../components/layouts/front.layout";
import {Container, Row} from "react-bootstrap";
import styles from "./../styles/front-layout/style.module.css";
import WrapperProduct from "../components/products/wrapper.product";
import {getProductAction} from "../actions/product.action";
import Head from "next/head";
import { CartBtn } from "../components/buttons/cart.btn";
import { useDispatch, useSelector } from "react-redux";


export default function Products() {
  const dispatch = useDispatch();
  const {list = {}, loading, error} = useSelector(state => state.productList);
  const {data = [], meta = {}} = list;
  const {pages = 0} = meta;
  const [page, setPage] = useState(1);
  useEffect(async () => {
     dispatch(getProductAction(page, 6))
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
                    <WrapperProduct products={data} />
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
