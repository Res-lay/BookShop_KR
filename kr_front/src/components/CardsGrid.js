import React, {useEffect, useState} from "react";
import axios from "axios";
import BookCard from "./BookCard";
import {Image, Pagination, Skeleton, Spacer, Spinner} from "@nextui-org/react";
import SkeletonCard from "./SkeletonCard";

export default function CardsGrid({type, filter}) {

    const [booksData, setBooksData] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8082/api/v1/books/get-${type}`)
            .then(response => setBooksData(response.data))
            .catch(error => console.error(error));
    })

    return (
        <div className="w-full mt-16 min-h-96">
            {booksData.length !== 0 ?
                <div className="gap-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-fit justify-items-center
          ml-10 ">{
                booksData.filter((item) => {
                    return filter.toLowerCase() === '' ? item : item.name.toLowerCase().includes(filter) || item.author.toLowerCase().includes(filter);
                }).map((item, index) => (

                        <BookCard key={index} book={item}/>


                ))}</div>
                :
                <div className="gap-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-fit justify-items-center
          ml-10 ">
                    <SkeletonCard />
                    <SkeletonCard />
                    <SkeletonCard />
                    <SkeletonCard />
                </div>
            }
        </div>

    );
}

