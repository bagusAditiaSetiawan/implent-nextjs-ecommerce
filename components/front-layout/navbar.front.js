import {Container, Navbar, Nav, NavDropdown} from "react-bootstrap";
import styles from "./../../styles/front-layout/style.module.css";
import Link from "next/link";
import {useRouter} from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../../actions/user.action";

export default function NavbarFront({ children }) {
    const dispatch = useDispatch();
    const router = useRouter();
    const {user} = useSelector(state => state.userCurrent);
    return (
        <>
            <Navbar bg="dark" expand="lg" className={styles.navbarFront}>
                <Container>
                    <Link href="/">
                        <Navbar.Brand href="/">GiftLove</Navbar.Brand>
                    </Link>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Link href="/">
                            <Nav.Link href="#home">Home</Nav.Link>
                            </Link>
                            <Link href="/products">
                                <Nav.Link href="/products">Produk</Nav.Link>
                            </Link>
                        </Nav>
                        <Nav className="justify-content-end" >
                            {!user && (
                                <Link href="/login">
                                    <Nav.Link href="/login">Login</Nav.Link>
                                </Link>
                            )}
                            {user && user.id && (
                                <>
                                <Link href="/carts">
                                    <Nav.Link href="/carts">Keranjang</Nav.Link>
                                </Link>
                                <NavDropdown title="User" id="basic-nav-dropdown">
                                    <Link href="/profile">
                                        <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                                    </Link>
                                    <Link href="/transactions">
                                        <NavDropdown.Item href="#action/3.1">Transaksi</NavDropdown.Item>
                                    </Link>
                                    <NavDropdown.Item
                                    onClick={(event) => {
                                        event.preventDefault();
                                        dispatch(logoutAction())
                                        router.push("/login");
                                    }}
                                    href="#logout">Keluar</NavDropdown.Item>
                                </NavDropdown>
                                </>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}