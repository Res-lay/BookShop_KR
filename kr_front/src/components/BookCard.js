import {Button, Card, CardBody, CardFooter, Image} from "@nextui-org/react";
import {NavLink} from "react-router-dom";
import React from "react";
import AddToCartButton from "./AddToCartButton";
import PopoverButton from "./PopoverButton";

export default function BookCard({book}){
    return(
        <Card shadow="sm" className="bg-primary-100 w-[300px]" >
            <CardBody className="flex flex-row justify-center align-middle">
                <NavLink to={`/book/${book.id}`}>
                    <Image
                        shadow="sm"
                        radius="lg"
                        width="100%"
                        height="100%"
                        alt={book.title}
                        className="w-[200px] cursor-pointer object-fit:cover h-[300px]"
                        src={book.path}
                    >
                    </Image>
                </NavLink>
            </CardBody>
            <CardFooter className="flex-col justify-between ">
                <NavLink to={`/book/${book.id}`} className="font-medium text-default-700">{book.name}</NavLink>
                <NavLink to={`/book/${book.id}`} className="font-medium text-default-500">{book.author}</NavLink>
                <div className="flex-row flex justify-evenly w-full align-text-bottom mt-5">
                    <b className="text-primary-800 flex self-center h-fit">{`${book.price}$`}</b>
                    {localStorage.getItem("token") === null ? (
                        <PopoverButton />
                    ) : (
                        <AddToCartButton book={book} />
                    )}
                </div>
            </CardFooter>
        </Card>
    );
}