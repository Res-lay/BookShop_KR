import MyNavbar from "../components/MyNavbar";
import {useEffect} from "react";
import {useSelector} from "react-redux";

export default function ProfilePage() {
    const isAuthenticated = useSelector(state => state.isAuthenticated);
    useEffect(() => {
        if(!isAuthenticated){
            window.location.href = "/";
        }
    });

    return (
        <div>
            <MyNavbar></MyNavbar>
        </div>
    );
};