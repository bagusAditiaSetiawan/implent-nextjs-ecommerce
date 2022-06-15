import FrontLayout from "../components/layouts/front.layout";
import {Container, Row, Card, Col} from "react-bootstrap";
import {LoginForm} from "../components/forms/login.form";
import {login} from "../functions/auth.function";
import {toast} from "react-toastify";
import {useRouter} from "next/router";

export default function Login() {
    const router = useRouter();

    async function LoginHandler(email, password) {
        try {
            const res = await login(email, password);
            localStorage.setItem('token', res.data.access_token);
            toast.success("Sukses Login");
            router.push("/")
        } catch (e) {
            if(e.response && e.response.status === 400) {
                toast.warning(e.response.data.message[0])
            }
            if(e.response && e.response.status === 401) {
                toast.warning("Email & Password Salah")
            }
        }
    }
    return (
        <FrontLayout>
            <Container>
                <Row className="mt-3">
                    <Col md={{
                        span: 6,
                        offset: 3,
                    }}>
                        <Card>
                            <Card.Body>
                                <Card.Text>Sign In</Card.Text>
                                <LoginForm submit={LoginHandler} />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

        </FrontLayout>
    )
}
