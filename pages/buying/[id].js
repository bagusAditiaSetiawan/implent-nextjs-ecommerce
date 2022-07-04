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
import {methods, transactionPg} from "../../functions/midtrans.function";
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
        shipping_cost: 0,
        shipping_service: "",
        payment_type: "",
        payment_mitra: "",
        item_details: [],
        customer_details: {},
        shipping_name: "",
        shipping_address: "",
        shipping_courier: "",
        shipping_cost: 0,
        shipping_destination: 0,
        shipping_destination_name: "",
        shipping_from: 0,
        shipping_from_name: "",

    });

    const [mitras, setMitras] = useState([]);
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
        const res = await getDetailProduct(id);
        setProduct(res);
        setTransaction((transaction) => ({...transaction,
            price: res.price_sell,
            amount: 1,
            total: res.price_sell,
            product_item_id: res.id,
            item_details: [{
                id: res.id,
                price: res.price_sell,
                quantity: 1,
                name: res.name,
            }]
        }))
    }, [id]);

    useEffect(async () => {
        function getCostHandler() {
            if(transaction.shipping_courier && transaction.shipping_destination) {
                getCost({
                    origin: product.seller.city_id,
                    destination: transaction.shipping_destination,
                    courier: transaction.shipping_courier,
                    weight: product.weight,
                }).then(res => {
                    setTransaction({...transaction, shipping_from: product.seller.city_id, shipping_from_name: product.seller.city_name, })
                    setShippingCosts(res.data[0])
                })
            }
        }
        getCostHandler();

    }, [transaction.shipping_courier ,transaction.city_id]);

    useEffect(() => {
        methods(transaction.payment_type).then((res) => {
            setMitras(res.data);
        })
    }, [transaction.payment_type]);


    useEffect(async () => {
        try{
            const res = await currentUser();
            if(res.data && res.data.shipping) {
                setTransaction(transaction => ({...transaction,
                    shipping_destination: res.data.shipping.city_id,
                    shipping_destination_name: res.data.shipping.city_name,
                    province_id: res.data.shipping.province_id,
                    province_name: res.data.shipping.province_name,
                    shipping_address: res.data.shipping.address,
                    shipping_name: res.data.profile.name,
                    customer_details: {
                        email: res.data.email,
                        phone: res.data.profile.mobile,
                        first_name: res.data.profile.name.split(' ')[0],
                        last_name: res.data.profile.name.split(' ')[res.data.profile.name.split(' ').length-1],
                    }
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
        transactionPg(transaction).then(res => {
            console.log(res)
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
                                const filter = transaction.item_details.filter(item=>item.id !== product.id);
                                setTransaction((trans) => ({...trans, 
                                    amount: parseInt(e.target.value),
                                    total: product.price_sell * parseInt(e.target.value),
                                    item_details: [...filter, {
                                        id: product.id,
                                        price: product.price_sell,
                                        quantity: parseInt(e.target.value),
                                        name: product.name,
                                    }]
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
                                <FormSelect value={transaction.shipping_destination} onChange={(event) => {
                                    const city = cities.find(city => city.city_id === event.target.value);
                                    setTransaction((transaction) =>
                                        ({...transaction, shipping_destination: event.target.value, shipping_destination_name: city.city_name}))
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
                                <Form.Control as="textarea" rows={3} value={transaction.shipping_address}
                                    onChange={(event) => setTransaction({...transaction, shipping_address: event.target.value})}
                                    required={true}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Kurir</Form.Label>
                                <FormSelect value={transaction.shipping_courier} onChange={(event) => {
                                    setTransaction((transaction) =>
                                        ({...transaction, shipping_courier: event.target.value}))
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
                            <Form.Group>
                                <Form.Label>Cara Pembayaran</Form.Label>
                                <FormSelect value={transaction.payment_type} onChange={(event) => {
                                    setTransaction((transaction) =>
                                        ({...transaction, payment_type: event.target.value}))
                                }} required={true}>
                                    <option value="">Pilih Metode Pembayaran</option>
                                    {['BANK_TRANSFER', 'CREDIT_CARD', 'EMONEY','OUTLET'].map((courier) => (
                                        <option value={courier.toLocaleLowerCase()}
                                                key={courier}>
                                            {courier.toLocaleLowerCase().split('_').join(' ')}
                                        </option>
                                    ))}
                                </FormSelect>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Mitra Pembayaran</Form.Label>
                                <FormSelect value={transaction.payment_mitra} onChange={(event) => {
                                    setTransaction((transaction) =>
                                        ({...transaction, payment_mitra: event.target.value}))
                                }} required={true}>
                                    <option value="">Pilih Mitra</option>
                                    {mitras && mitras.map((mitra) => (
                                        <option value={mitra.name}
                                                key={mitra.name}>
                                            {mitra.name.toLocaleLowerCase().split('_').join(' ')}
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
