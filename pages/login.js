import FrontLayout from "../components/layouts/front.layout";
import {Container, Row, Card, Col} from "react-bootstrap";
import {LoginForm} from "../components/forms/login.form";
import {login} from "../functions/auth.function";
import {toast} from "react-toastify";
import {useRouter} from "next/router";
import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import { loginAction, loginCleanupAction } from "../actions/user.action";
import { useEffect } from "react";

export default function Login() {
    const dispatch = useDispatch();
    const router = useRouter();
    const {token, loading, error} = useSelector(state => state.userLogin);

    async function LoginHandler(email, password) {
        dispatch(loginAction(email, password));
    }

    const tokenHandler = () => {  
        if(token) {
            toast.success("Sukses Login");
            router.push("/")
        }      
    }

    useEffect(() => {
        tokenHandler();
        return () => {
            dispatch(loginCleanupAction())
        };
    }, [token])

    useEffect(() => {
        const errorHandler = () => {
            if(error && error.data && error.data.statusCode === 400) {
                toast.error(error.data.message[0]);
            }

            if(error && error.data && error.data.statusCode === 401) {
                toast.error("Login & Email Salah");
            }
        }
        errorHandler();
    }, [error]);

    return (
        <FrontLayout>
            <Head>
                <title>GiftLove - Login</title>
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
                                <Card.Text>Sign In</Card.Text>
                                <LoginForm submit={LoginHandler} loading={loading} />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

        </FrontLayout>
    )
}
