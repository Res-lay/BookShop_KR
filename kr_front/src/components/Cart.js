import {Button, ButtonGroup, Card, CardBody, Image, Tab, Tabs} from "@nextui-org/react";
import {useEffect, useState} from "react";
import axios from "axios";
import DeliveryTypeTabs from "./DeliveryTypeTabs";
import {toast, Toaster} from "sonner";

export default function Cart() {
    const [items, setItems] = useState([]);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const token = localStorage.getItem("token");

    const axiosInstance = axios.create({
        baseURL: "http://localhost:8082/api/v1/shopping-cart/",
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    useEffect(() => {
        axiosInstance.get(`get/${user.id}`)
            .then(response => {
                const sortedItems = response.data.sort((a, b) => {
                    if (a.book.name < b.book.name) {
                        return -1;
                    }
                    if (a.book.name > b.book.name) {
                        return 1;
                    }
                    return 0;
                });
                setItems(response.data);
            })
            .catch(error => console.error(error));
    }, [user, axiosInstance]);


    const handleDecrease = (bookId) => {
        axiosInstance.post(`item/decrease/${bookId}`)
            .then(response => console.log(response))
            .catch(error => console.error(error));
    }
    const handleIncrease = (bookId) => {
        axiosInstance.post(`item/add/${bookId}`)
            .then(response => console.log(response))
            .catch(error => console.error(error));
    }

    const handleDelete = (bookId) => {
        axiosInstance.delete(`item/delete/${bookId}`)
            .then(response => console.log(response))
            .catch(error => console.error(error));
        toast.success("Book successfully deleted from cart");
    }

    function getFinalPrice() {
        let finalPrice = 0;
        items.map((item) => {
            finalPrice += item.quantity * item.book.price;
        });
        return finalPrice;
    }

    return (
        <div className="flex flex-row">
            <Toaster />
            <div className="flex flex-col flex-wrap sm:justify-evenly justify-center rounded-md shadow-md w-0.7 h-fit p-12 gap-4 m-14">
                {items?.map((item, index) => (
                    <div key={item.book.id}
                         className="flex flex-row w-[700px]  h-fit shadow-xl rounded-md justify-evenly items-center p-5">
                        <Image src={item.book.path} className="h-[120px] min-w-[80px] object-cover"></Image>
                        <p className="ml-2 text-default-500  min-w-[100px]">{item.book.author}</p>
                        <p className="text-default-600 font-bold ml-4 min-w-[100px]">{item.book.name}</p>
                        <div className="flex flex-row w-full justify-evenly">
                            <p className="font-bold">{item.quantity}</p>
                            <p>{item.book.price * item.quantity}$</p>
                        </div>
                        <ButtonGroup className="mr-5">
                            <Button size="sm" className="bg-primary-100 shadow-md" onClick={() => {
                                handleDecrease(item.book.id)
                            }}>
                                <p className="font-bold text-large">-</p>
                            </Button>
                            <Button size="sm" className="bg-primary-100 shadow-md" onClick={() => {
                                handleIncrease(item.book.id);
                            }}>
                                <p className="font-bold text-large">+</p>
                            </Button>
                        </ButtonGroup>
                        <Button color="danger" onClick={() => {
                            handleDelete(item.book.id);
                        }}>
                            Delete
                        </Button>
                    </div>
                ))}
            </div>
            <div className="flex flex-col w-full mt-16 align-middle items-center gap-4">
                <p className="text-4xl">Order details</p>
                <DeliveryTypeTabs/>
                <p className="text-xl font-bold">Total price: {getFinalPrice()}$</p>
                <Button className="" color="success">Buy</Button>
            </div>
        </div>
    );
}