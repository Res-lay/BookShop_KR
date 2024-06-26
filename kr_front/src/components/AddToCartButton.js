import {Button} from "@nextui-org/react";
import React from "react";
import axios from "axios";
import {toast, Toaster} from "sonner";

export default function AddToCartButton({book}) {

    const axiosInstance = axios.create({
        baseURL: "http://localhost:8082/api/v1/shopping-cart",
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
    });

    const handleClick = () => {
        axiosInstance.post(`/item/add/${book.id}`)
            .then(response => {
                console.log(response);
                toast.success("Book successfully added to cart");
            })
            .catch(error => toast.error("The product is out of stock"));

    };

    return (
        <div>
            <Toaster />
            <Button color="secondary" variant="solid" onClick={handleClick}>

                Add to cart
            </Button>
        </div>
    );
}