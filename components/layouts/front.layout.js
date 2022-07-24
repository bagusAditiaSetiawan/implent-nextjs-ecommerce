import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userCurrentAction } from "../../actions/user.action";
import FooterFront from "../front-layout/footer.front";
import NavbarFront from "../front-layout/navbar.front";

export default function FrontLayout({ children }) {
    const dispatch = useDispatch();    
    const {user, loading} = useSelector(state => state.userCurrent);
    useEffect(async () => {
        if(!user) {
            dispatch(userCurrentAction())
        }        
    }, []);

    return !loading ? (
        <>
            <NavbarFront />
            <main>{children}</main>
            <FooterFront />
        </>
    ) : (
        <div></div>
    )
}