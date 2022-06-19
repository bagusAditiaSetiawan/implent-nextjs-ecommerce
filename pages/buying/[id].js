import {Card, Col, Container, Form, FormSelect, Image, Row, ListGroup} from "react-bootstrap";
import FrontLayout from "../../components/layouts/front.layout";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {getDetailProduct} from "./../../functions/product.function";
import {baseApi, MIDTRANCLIENT} from "../../config";
import styles from "../../styles/front-layout/style.module.css";
import {CartBtn} from "../../components/buttons/cart.btn";
import {currentUser} from "../../functions/auth.function";
import {toast} from "react-toastify";
import {getCities, getProvinces, getCouriers, getCost} from "../../functions/rajaongkir.function";
import {transactionPg} from "../../functions/midtrans.function";
function BuyingProduct() {
    const route = useRouter();
    const {id}  = route.query;
    const [product, setProduct] = useState({
        seller: {}
    });
    const [transaction, setTransaction] = useState({
        product_item_id: 0,
        total: 0,
        price: 0,
        amount: 1,
        province_id: 0,
        province_name: "",
        city_id: 0,
        city_name: "",
        address: "",
        courier: "",
        shipping_cost: 0,
        shipping_service: "",
    });

    const [provinces, setProvinces] = useState([]);
    const [cities, setCities] = useState([]);
    const [couriers, setCouriers] = useState([]);
    const [shippingCosts, setShippingCosts] = useState([]);
    const [user, setUser] = useState({});

    useEffect(() => {
        getProvinces().then((res) => {
            setProvinces(res.data)
        })
        getCouriers().then(res => {
            setCouriers(res.data);
        })
    }, []);

    useEffect(() => {
        getCities(transaction.province_id).then((res) => {
            setCities(res.data)
        })
    }, [transaction.province_id]);

    useEffect(async () => {
        const product = await getDetailProduct(id);
        setProduct(product);
        setTransaction((transaction) => ({...transaction,
            price: product.price_sell,
            amount: 1,
            total: product.price_sell,
            product_item_id: product.id,
        }))
    }, [id]);

    useEffect(async () => {
        function getCostHandler() {
            if(transaction.courier && transaction.city_id) {
                getCost({
                    origin: product.seller.city_id,
                    destination: transaction.city_id,
                    courier: transaction.courier,
                    weight: product.weight,
                }).then(res => setShippingCosts(res.data[0]))
            }
        }
        getCostHandler();

    }, [transaction.courier ,transaction.city_id]);


    useEffect(async () => {
        try{
            const res = await currentUser();
            if(res.data && res.data.shipping) {
                setTransaction(transaction => ({...transaction,
                    city_id: res.data.shipping.city_id,
                    city_name: res.data.shipping.city_name,
                    province_id: res.data.shipping.province_id,
                    province_name: res.data.shipping.province_name,
                    address: res.data.shipping.address,
                }))
                setUser(res.data);
            }
        }catch (e) {
            window.localStorage.removeItem('token');
            route.push('/login');
            toast.warn('Silahkan untuk login terlebih dahulu');
        }
    }, []);

    const checkoutHandler = (e) => {
        e.preventDefault();
        transactionPg({
            transaction_details_gross_amount: transaction.total,
            customer_details_name: user.profile.name,
            customer_details_email: user.email,
            customer_details_phone:user.profile.mobile,
        }).then(res => {
            const script = document.createElement("script");
            script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
            script.setAttribute('data-client-key', MIDTRANCLIENT)
            script.async = true;
            document.body.appendChild(script);
            console.log(script)
        }).catch(e => console.log(e))
    }
    console.log(transaction)

    return (
        <FrontLayout>
            <Container>
                {product && product.id && (
                    <Form onSubmit={checkoutHandler}>
                    <Row className="mt-3">
                        <Col md={4}>
                            <Image src={`${baseApi}/fileupload/${product.image.id}`} className="img-fluid" />
                        </Col>
                        <Col md={4}>
                            <h2 className={styles.productDetailTitle}>{product.name}</h2>
                            <p className={styles.productDetailPrice}>Rp {product.price_sell}</p>
                            <p>{product.description}</p>
                            <Form.Control type="number" value={transaction.amount}
                            onChange={(e) => {
                                setTransaction((trans) => ({...trans, 
                                    amount: parseInt(e.target.value),
                                    total: product.price_sell * parseInt(e.target.value),
                                }))
                            }}
                          required={true} />
                            <h2 className={styles.productDetailTitle}>Pengiriman</h2>
                            <Form.Group>
                                <Form.Label>Provinsi</Form.Label>
                                <FormSelect value={transaction.province_id} onChange={(event) => {
                                    const province = provinces.find(province => province.province_id === event.target.value);
                                    setTransaction((transaction) =>
                                        ({...transaction, province_id: event.target.value, province_name: province.province}))
                                }} required={true}>
                                    <option value="" >Pilih Provinsi</option>
                                    {provinces && provinces.map((province) => (
                                        <option value={province.province_id}
                                                key={province.province_id}>
                                            {province.province}
                                        </option>
                                    ))}
                                </FormSelect>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Kota</Form.Label>
                                <FormSelect value={transaction.city_id} onChange={(event) => {
                                    const city = cities.find(city => city.city_id === event.target.value);
                                    setTransaction((transaction) =>
                                        ({...transaction, city_id: event.target.value, city_name: city.city_name}))
                                }}
                                required={true}>
                                    <option value="">Pilih Kota</option>
                                    {cities && cities.map((city) => (
                                        <option value={city.city_id}
                                                key={city.city_id}>
                                            {`${city.type === 'Kabupaten' ? city.type : ''} ${city.city_name}`}
                                        </option>
                                    ))}
                                </FormSelect>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Alamat</Form.Label>
                                <Form.Control as="textarea" rows={3} value={transaction.address}
                                    onChange={(event) => setTransaction({...transaction, address: event.target.value})}
                                    required={true}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Kurir</Form.Label>
                                <FormSelect value={transaction.courier} onChange={(event) => {
                                    setTransaction((transaction) =>
                                        ({...transaction, courier: event.target.value}))
                                }} required={true}>
                                    <option value="">Pilih Kurir</option>
                                    {couriers && couriers.map((courier) => (
                                        <option value={courier}
                                                key={courier}>
                                            {courier}
                                        </option>
                                    ))}
                                </FormSelect>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Layanan Kirim</Form.Label>
                                <FormSelect value={transaction.shipping_service} onChange={(event) => {
                                    const cost = shippingCosts.costs
                                        .find(cost => cost.service === event.target.value).cost[0].value;
                                    setTransaction((transaction) =>
                                        ({...transaction,
                                            shipping_service: event.target.value,
                                            shipping_cost: cost,
                                            total: product.price_sell * transaction.amount + cost,
                                        }))
                                }} required={true}>
                                    <option value="">Pilih Layanan Pengiriman</option>
                                    {shippingCosts && shippingCosts.costs && shippingCosts.costs.map((cost) => (
                                        <option value={cost.service}
                                                key={cost.service}>
                                            {`${shippingCosts.code.toUpperCase()}-${cost.service} Rp. ${cost.cost[0].value}`}
                                        </option>
                                    ))}
                                </FormSelect>
                            </Form.Group>
                        </Col>
                        <Col md={4}>
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
                        </Col>
                    </Row>
                    </Form>
                )}

            </Container>
        </FrontLayout>
    )
}
export default BuyingProduct
