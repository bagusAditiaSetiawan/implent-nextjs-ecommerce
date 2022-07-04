import { Form, FormSelect } from "react-bootstrap";
export const ShippingBuyNowForm = ({transaction={}, setTransaction, provinces=[], cities=[], couriers=[], shippingCosts=[], product={}}) =>{
    return (
        <>
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
        </>
    );
}