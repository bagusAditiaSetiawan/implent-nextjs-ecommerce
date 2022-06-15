import FooterFront from "../front-layout/footer.front";
import NavbarFront from "../front-layout/navbar.front";

export default function FrontLayout({ children }) {
    return (
        <>
            <NavbarFront />
            <main>{children}</main>
            <FooterFront />
        </>
    )
}