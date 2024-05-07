import MyNavbar from "../components/MyNavbar";
import AboutBook from "../components/AboutBook";
import Footer from "../components/Footer";
import {useState} from "react";

export default function BookPage() {
    const [search, setSearch] = useState('');
    console.log(search);

    return (
        <div>
            <MyNavbar></MyNavbar>
            <AboutBook></AboutBook>
            <Footer/>
        </div>
    );
}