import {Form} from "react-bootstrap";
import styles from "../../styles/front-layout/style.module.css";
import {useState} from "react";
import Link from "next/link";

export function LoginForm({submit, loading}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    return (
        <Form onSubmit={(event) => {
            event.preventDefault();
            submit(email, password)
        }}>

            <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
            <button className={styles.btnLogin} disabled={loading}>Masuk</button>
            <Link href="/register">
                <button type="button" className={styles.btnRegister}>Daftar</button>
            </Link>
        </Form>
    )
}