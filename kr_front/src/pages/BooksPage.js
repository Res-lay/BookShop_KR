import MyNavbar from "../components/MyNavbar";
import Footer from "../components/Footer";
import CardsGrid from "../components/CardsGrid";
import React, {useState} from "react";
import SearchBar from "../components/SearchBar";
import {Pagination} from "@nextui-org/react";

export default function BooksPage(){

    const [searchData, setSearchData] = useState('');

    const handleDataFromSearch = (data) => {
        setSearchData(data);
    }



    return (
        <div>
            <MyNavbar/>
            <SearchBar onData={handleDataFromSearch}/>
            <CardsGrid type={"all"} filter={searchData}/>
            <Footer/>
        </div>
    );
}