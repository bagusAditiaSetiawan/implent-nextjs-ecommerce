import { Form, FormSelect } from "react-bootstrap"

export const MethodPaymentBuyNowForm = ({setTransaction, mitras=[], transaction = {}}) => {
    return (
        <>        
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
        </>

    )
}