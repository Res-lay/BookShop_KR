import {
    Accordion,
    AccordionItem,
    Button,
    ButtonGroup,
    Card,
    CardBody,
    Image, Input,
    Select, SelectItem,
    Tab,
    Tabs
} from "@nextui-org/react";
import {useEffect, useState} from "react";
import axios from "axios";
import DeliveryTypeTabs from "./DeliveryTypeTabs";
import {toast, Toaster} from "sonner";

export default function Cart() {
    const [items, setItems] = useState([]);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const token = localStorage.getItem("token");

    const axiosInstance = axios.create({
        baseURL: "http://localhost:8082/api/v1/",
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    useEffect(() => {
        axiosInstance.get(`shopping-cart/get/${user.id}`)
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
        axiosInstance.post(`shopping-cart/item/decrease/${bookId}`)
            .then(response => console.log(response))
            .catch(error => console.error(error));
    }
    const handleIncrease = (bookId) => {
        axiosInstance.post(`shopping-cart/item/add/${bookId}`)
            .then(response => console.log(response))
            .catch(error => console.error(error));
    }

    const handleDelete = (bookId) => {
        axiosInstance.delete(`shopping-cart/item/delete/${bookId}`)
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

    function handleBuy() {
        axiosInstance.post(`purchases/${user.id}`)
            .then()
            .catch(error => console.error(error));
    }

    return (
        <div className="flex flex-row">
            <Toaster/>
            <div
                className="flex flex-col flex-wrap sm:justify-evenly justify-center rounded-md shadow-md w-0.7 h-fit p-12 gap-4 m-14">
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
                <Accordion selectionMode="multiple" defaultExpandedKeys={["1"]}>
                    <AccordionItem key="1" aria-label="Accordion 1" title="Delivery type">
                        <DeliveryTypeTabs/>
                    </AccordionItem>
                    <AccordionItem key="2" aria-label="Accordion 2" title="Payment methods">
                        <Select
                            label="Payment method"
                            placeholder="Select a  method"
                            className="max-w-xs"
                            variant="faded"
                        >
                            <SelectItem key="1" value={"By cart"}>
                                By cart online
                            </SelectItem>
                            <SelectItem key="2" value={"After receiving"}>
                                After receiving
                            </SelectItem>
                        </Select>
                    </AccordionItem>
                    <AccordionItem key="3" aria-label="Accordion 3" title="Recipient's personal data">
                        <div className="flex flex-row gap-4">
                            <Input
                                key={"1"}
                                type="text"
                                label="Name"
                                className="bg-default-100"
                            />
                            <Input
                                key={"2"}
                                type="email"
                                label="Email"
                            />
                            <Input
                                key={"3"}
                                type="tel"
                                label="Telephone"
                            />
                        </div>
                    </AccordionItem>
                </Accordion>
                <p className="text-xl font-bold">Total price: {getFinalPrice()}$</p>
                <Button onClick={handleBuy} color="success">Buy</Button>
            </div>
        </div>
    );
}