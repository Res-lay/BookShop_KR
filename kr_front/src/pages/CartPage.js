import MyNavbar from "../components/MyNavbar";
import Cart from "../components/Cart";
import {useEffect, useState} from "react";
import NotAuthenticatedMessage from "../components/Errors/NotAuthenticatedMessage";
import Footer from "../components/Footer";

export default function CartPage(){

    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("token") !== null)
            setAuthenticated(true);
    }, []);

    return(
        <div>
            <MyNavbar></MyNavbar>
            {authenticated ? (
                <Cart></Cart>
            ) : (
                <NotAuthenticatedMessage/>
            )}
            <Footer />
        </div>
    );
}