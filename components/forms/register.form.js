import {Form} from "react-bootstrap";
import styles from "../../styles/front-layout/style.module.css";
import {useState} from "react";
import Link from "next/link";

export function RegisterForm({submit}) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    return (
        <Form onSubmit={(event) => {
            event.preventDefault();
            submit(username, email, password)
        }}>
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
            <button className={styles.btnLogin}>Daftar</button>
            <Link href="/login">
                <button type="button" className={styles.btnRegister}>Masuk</button>
            </Link>
        </Form>
    )
}