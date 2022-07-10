import FrontLayout from "../components/layouts/front.layout";
import {Container, Row, Card, Col} from "react-bootstrap";
import {RegisterForm} from "../components/forms/register.form";
import {singUp} from "../functions/auth.function";
import {toast} from "react-toastify";
import {useRouter} from "next/router";
import Head from "next/head";

export default function Register() {
    const router = useRouter();

    async function registerHandler(username, email, password) {
        try {
            const res = await singUp(username, email, password);
            toast.success(`Sukses Register ${res.data.username}`);
            router.push("/login")
        } catch (e) {
            if(e.response && (e.response.status === 400  || e.response.status === 409)) {
                if(typeof e.response.data.message === 'string') {
                    return toast.warning(e.response.data.message);
                }
                return toast.warning(e.response.data.message[0]);
            }
            if(e.response && e.response.status === 401) {
                return toast.warning("Email & Password Salah")
            }
        }
    }
    return (
        <FrontLayout>
            <Head>
                <title>GiftLove - Register</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Container>
                <Row className="mt-3">
                    <Col md={{
                        span: 6,
                        offset: 3,
                    }}>
                        <Card>
                            <Card.Body>
                                <Card.Text>Daftar</Card.Text>
                                <RegisterForm submit={registerHandler} />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

        </FrontLayout>
    )
}
