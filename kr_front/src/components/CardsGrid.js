import React, {useEffect, useState} from "react";
import axios from "axios";
import BookCard from "./BookCard";
import {Pagination} from "@nextui-org/react";

export default function CardsGrid({type, filter}) {

    const [booksData, setBooksData] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8082/api/v1/books/get-${type}`)
            .then(response => setBooksData(response.data))
            .catch(error => console.error(error));
    })

    return (
        <div className="gap-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-fit justify-items-center
         mt-16 ml-10">
            {booksData.filter((item) => {
                return filter.toLowerCase() === '' ? item : item.name.toLowerCase().includes(filter) || item.author.toLowerCase().includes(filter);
            }).map((item, index) => (
                <BookCard key={index} book={item}/>
            ))}

        </div>
    );
}

