import {
    Accordion,
    AccordionItem,
    Button,
    ButtonGroup,
    Card,
    CardBody,
    Image, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader,
    Select, SelectItem,
    Tab,
    Tabs, useDisclosure
} from "@nextui-org/react";
import {useEffect, useState} from "react";
import axios from "axios";
import DeliveryTypeTabs from "./DeliveryTypeTabs";
import {toast, Toaster} from "sonner";

export default function Cart() {
    const [items, setItems] = useState([]);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const {isOpen, onOpen, onClose} = useDisclosure();
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
        onOpen();
        axiosInstance.post(`purchases/${user.id}`)
            .then(response => console.log(response))
            .catch(error => console.error(error));
    }
    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + "...";
        } else {
            return text;
        }
    };

    return (
        <div className="flex flex-col sm:flex-row ">
            <Toaster/>
            <div
                className="flex flex-col flex-wrap sm:justify-evenly items-center justify-center rounded-md shadow-md w-8/12 h-fit p-12 gap-4 m-14">
                {items.length === 0 ?
                    <p className="text-xl">Your cart is empty</p>
                    :
                    items?.map((item, index) => (
                        <div key={item.book.id}
                             className="flex flex-col sm:flex-row w-fit sm:w-[700px]  h-fit shadow-xl gap-4 sm:gap-0 rounded-md sm:justify-evenly items-center p-5">
                            <Image src={item.book.path} className="h-[200px] sm:h-[120px] min-w-[80px] object-cover"></Image>
                            <p className="text-sm sm:text-medium sm:ml-2 text-default-500 w-fit sm:min-w-[100px]">{truncateText(item.book.author, 20)}</p>
                            <p className="text-small sm:text-medium text-default-600 font-bold sm:ml-4 w-fit sm:min-w-[100px]">{truncateText(item.book.name, 20)}</p>
                            <div className="flex flex-row w-full justify-evenly">
                                <p className="font-bold">{item.quantity}</p>
                                <p className="sm:ml-4">{item.book.price * item.quantity}$</p>
                            </div>
                            <ButtonGroup className="sm:mr-5">
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
                    ))
                }

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
            <>
                <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                                <ModalBody>
                                    <p>Thank {user.name} for your purchase!</p>
                                    <p>Your order has been successfully placed. You will receive an email shortly with the details of your purchase on this address {user.email}.</p>
                                    <p>If you have any questions or concerns, please feel free to contact us.</p>
                                    <p>Thank you for shopping with us!</p>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="primary" onPress={onClose}>
                                        Ok
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            </>
        </div>
    );
}