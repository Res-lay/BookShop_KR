import {useEffect, useState} from "react";
import axios from "axios";
import {
    Button,
    getKeyValue, Input,
    Modal, ModalBody,
    ModalContent, ModalFooter, ModalHeader,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow, useDisclosure
} from "@nextui-org/react";
import AddNewBookButton from "./AddNewBookButton";
import {toast, Toaster} from "sonner";

export default function BooksTable() {
    const [books, setBooks] = useState([]);
    const [currentBook, setCurrentBook] = useState(null);
    const columns = [{key: "id", label: "ID"}, {key: "name", label: "NAME"}, {key: "author", label: "AUTHOR"},
        {key: "price", label: "PRICE, $"}, {key: "quantity", label: "QUANTITY"}];


    const axiosInstance = axios.create({
        baseURL: "http://localhost:8082/api/v1/books",
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setCurrentBook(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const UpdateBook = () => {
        axiosInstance.put(`/update/${currentBook.id}`, currentBook)
            .then(response => console.log(response))
            .catch(error => console.error(error));
        toast.success("Element successful deleted");
        setBooks(prevBooks => {
            return prevBooks.map(book => {
                if (book.id === currentBook.id) {
                    return currentBook;
                }
                return book;
            });
        });
    }



    const DeleteBook = () => {
        axiosInstance.delete(`/delete/${currentBook.id}`)
            .then(response => console.log(response))
            .catch(error => console.error(error));
        setBooks(prevBooks => {
            return prevBooks.filter(book => book.id !== currentBook.id);
        });
    }
    const update = (newBook) => {
        setBooks(prevBooks => {
            return [...prevBooks, newBook];
        });
    }


    useEffect(() => {
        axiosInstance.get("/get-all")
            .then(response => setBooks(response.data.sort((a, b) => a.id - b.id)))
            .catch(error => console.error(error));
    }, []);

    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    return (
        <div className="p-8">
            <Toaster />
            <Table>
                <TableHeader columns={columns}>
                    {column => (
                        <TableColumn key={column.key}>{column.label}</TableColumn>)
                    }
                </TableHeader>
                <TableBody items={books}>
                    {(item) => (
                        <TableRow key={item.key} className="hover:bg-primary-200 cursor-pointer rounded-lg">
                            {(columnKey) => <TableCell onClick={() => {
                                setCurrentBook(item);
                                onOpen();
                            }}>{getKeyValue(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <>
                <Modal
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    placement="top-center"
                >
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">Book data</ModalHeader>
                                <ModalBody>
                                    <Input
                                        autoFocus
                                        label="Name"
                                        name="name"
                                        value={currentBook.name}
                                        onChange={handleChange}
                                        variant="bordered"
                                    />
                                    <Input
                                        label="Auhor"
                                        name="author"
                                        value={currentBook.author}
                                        onChange={handleChange}
                                        variant="bordered"
                                    />
                                    <Input
                                        label="Price, $"
                                        name="price"
                                        value={currentBook.price}
                                        onChange={handleChange}
                                        variant="bordered"
                                    />
                                    <Input
                                        label="Quantity"
                                        name="quantity"
                                        value={currentBook.quantity}
                                        onChange={handleChange}
                                        variant="bordered"
                                    />
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="primary" onPress={onClose}>
                                        Close
                                    </Button>
                                    <Button color="danger" onPress={() => {
                                        onClose();
                                        DeleteBook();
                                    }}>
                                        Delete
                                    </Button>
                                    <Button color="success" onPress={() => {
                                        onClose();
                                        UpdateBook();
                                    }}>
                                        Save
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            </>
            <AddNewBookButton update={update}></AddNewBookButton>

        </div>
    );
}