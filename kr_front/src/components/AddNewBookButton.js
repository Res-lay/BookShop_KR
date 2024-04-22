import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure
} from "@nextui-org/react";
import axios from "axios";
import {useState} from "react";

export default function AddNewBookButton({update}){

    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        author: '',
        price: '',
        quantity: ''});

    const CreateBook = () => {
        axios.post(`http://localhost:8082/api/v1/books/add`, formData)
            .then(response => update(formData))
            .catch(error => console.error(error));
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    return(
        <div>
            <Button radius="full" onPress={onOpen} color="default" size="sm" className="fixed bottom-10 right-10">
                <p className="font-bold text-large">+</p>
            </Button>
            <>
                <Modal
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    placement="top-center"
                >
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">New Book</ModalHeader>
                                <ModalBody>
                                    <Input
                                        autoFocus
                                        label="Id"
                                        name="id"
                                        onChange={handleChange}
                                        placeholder="Id"
                                        variant="bordered"
                                    />
                                    <Input
                                        autoFocus
                                        label="Name"
                                        name="name"
                                        onChange={handleChange}
                                        placeholder="Name"
                                        variant="bordered"
                                    />
                                    <Input
                                        label="Auhor"
                                        name="author"
                                        onChange={handleChange}
                                        placeholder="Author"
                                        variant="bordered"
                                    />
                                    <Input
                                        label="Price"
                                        name="price"
                                        onChange={handleChange}
                                        placeholder="Price"
                                        variant="bordered"
                                    />
                                    <Input
                                        label="Quantity"
                                        name="quantity"
                                        onChange={handleChange}
                                        placeholder="Quantity"
                                        variant="bordered"
                                    />
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="primary"  onPress={onClose}>
                                        Cancel
                                    </Button>
                                    <Button color="success" onPress={() => {
                                        onClose();
                                        CreateBook();
                                    }}>
                                        Save
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