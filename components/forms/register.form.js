import {Form} from "react-bootstrap";
import styles from "../../styles/front-layout/style.module.css";
import {useEffect, useState} from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { registerAction, registerCleanupAction } from "../../actions/user.action";
import { useRouter } from "next/router";

export function RegisterForm() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const router = useRouter();
    const {user, error, loading} = useSelector(state => state.userRegister);
    useEffect(() => {
        if(error && error.status === 400) {
            toast.error(error.data.message[0])
        }
        if(error && error.status === 409) {
            toast.error(error.data.message)
        }
    }, [error]);
    useEffect(() => {
        if(user) {
            toast.success('Register berhasil');
            router.push('/login')
        }
        return () => {
            dispatch(registerCleanupAction())
        };
    }, [user]);
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(registerAction(username, email, password))
    }
    return (
        <Form onSubmit={submitHandler}>
            <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
            <button className={styles.btnLogin} disabled={loading}>Daftar</button>
            <Link href="/login">
                <button type="button" className={styles.btnRegister}>Masuk</button>
            </Link>
        </Form>
    )
}