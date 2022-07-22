import {Container} from "react-bootstrap";
import FrontLayout from "../../components/layouts/front.layout";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {getDetailProduct} from "./../../functions/product.function";
import {currentUser} from "../../functions/auth.function";
import {toast} from "react-toastify";
import {getCities, getProvinces, getCouriers, getCost} from "../../functions/rajaongkir.function";
import {methods, transactionPg} from "../../functions/midtrans.function";
import { BuyNowForm } from "../../components/forms/buynow.form";
import Head from "next/head";
function BuyingProduct() {
    const route = useRouter();
    const {id = 0}  = route.query;
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
        payment_type: "BANK_TRANSFER",
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
        }).catch((e) => {
            console.log(e)
        })
        getCouriers().then(res => {
            setCouriers(res.data);
        }).catch(e => {
            console.log(e)
        })
    }, []);

    useEffect(() => {
        getCities(transaction.province_id).then((res) => {
            setCities(res.data)
        }).catch(e => console.log(e));
    }, [transaction.province_id]);

    useEffect(async () => {
        try{
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
        }catch(e) {
            console.log(e)
        }
    }, [id]);

    useEffect(async () => {
        function getCostHandler() {
            if(transaction.shipping_courier && transaction.shipping_destination) {
                console.log(product)
                getCost({
                    origin: product.seller.city_id,
                    destination: transaction.shipping_destination,
                    courier: transaction.shipping_courier,
                    weight: product.weight,
                }).then(res => {
                    setTransaction({...transaction, shipping_from: product.seller.city_id, shipping_from_name: product.seller.city_name, })
                    setShippingCosts(res.data[0])
                }).catch(e => {
                    console.log(e)
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
            route.push(`/payments/${res.data.order_id}`)
            toast.success("Success membuat transaksi silahkan bayar")
        }).catch((e) => {
            if(e.response && e.response.status === 400) {
                toast.warning(e.response.data.message[0])
                return;
            }
            toast.warning("Terjadi kesalahan tolong coba")
        })
    }

    return (
        <FrontLayout>
            <Head>
                <title>GiftLove - Buy Now</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Container>
                {product && product.id && (
                    <BuyNowForm 
                    checkoutHandler={checkoutHandler} 
                    product={product} 
                    transaction={transaction} 
                    provinces={provinces}
                    cities={cities}
                    couriers={couriers}
                    shippingCosts={shippingCosts}
                    mitras={mitras}
                    setTransaction={setTransaction}
                    setShippingCosts={setShippingCosts}
                    />
                )}
            </Container>
        </FrontLayout>
    )
}
export default BuyingProduct
