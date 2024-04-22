import {Button, Card, CardBody, CardFooter, Image} from "@nextui-org/react";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import AddToCartButton from "./AddToCartButton";

export default function AboutBook() {

    const param = useParams();
    const [item, setItem] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:8082/api/v1/books/${param.id}`)
            .then(response => {
                setItem(response.data);
                console.log(response.data);
            })
            .catch(error => console.error(error));
    }, [])

    return (
        <div className="flex flex-col sm:flex-row w-full justify-center gap-14 mt-8">
            <Card className='bg-primary-100 h-[520px] flex flex-row justify-center p-2' shadow="sm">
                <Image src={item.path} className="w-auto h-[500px]"/>
            </Card>
            <div className="flex-col align-middle gap-y-12 p-12 sm:p-0">
                <div>
                    <b className="text-3xl font-bold text-primary-800">{item.name}</b>
                </div>
                <div>
                    <b className="text-large font-bold">{item.author}</b>
                </div>
                <div className="mt-8 flex flex-row align-text-bottom gap-8">
                    <b className="text-3xl text-default-800 align-bottom justify-end">{item.price}$</b>
                    <AddToCartButton book={item}/>
                </div>
                <div className="mt-12 max-w-[500px] text-primary-800">
                    <b className="text-medium">Annotation</b>
                    <p>{item.description}</p>
                </div>
            </div>

        </div>
    );
}