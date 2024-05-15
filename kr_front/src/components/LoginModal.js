import {
    Button,
    Checkbox,
    Input,
    Link,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure
} from "@nextui-org/react";
import {MailIcon} from "../icons/MailIcon";
import {LockIcon} from "../icons/LockIcon";
import {useState} from "react";
import axios from "axios";

export default function LoginModal({onLogin}) {

    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [user, setUser] = useState({email: '', password: ''});
    const [invalid, setInvalid] = useState(false);

    const buttonClicked = async () => {
        axios.post("http://localhost:8082/api/v1/login", user)
            .then(response => {
                onLogin(response.data.token);
                localStorage.setItem("user", JSON.stringify(response.data.user));
                onOpenChange(false);
            })
            .catch(error => {
                if(error.response.status === 401) {
                    setUser({email: '', password: ''});
                    setInvalid(true);
                }
            });

    };

    const handleChange = (event) => {
        setInvalid(false);
        const {name, value} = event.target;
        setUser({
            ...user, [name]: value,
        });
    };

    return (
        <>
            <Button onPress={onOpen} color="secondary" variant="shadow">
                Login
            </Button>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
                backdrop={"blur"}
                className="bg-primary-50 w-50 sm:w-8/12"
                motionProps={{
                    variants: {
                        enter: {
                            y: 0,
                            opacity: 1,
                            transition: {
                                duration: 0.3,
                                ease: "easeOut",
                            },
                        },
                        exit: {
                            y: -20,
                            opacity: 0,
                            transition: {
                                duration: 0.2,
                                ease: "easeIn",
                            },
                        },
                    }
                }}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
                            <ModalBody>
                                <Input
                                    autoFocus
                                    startContent={
                                        <MailIcon
                                            className="text-2xl text-default-400 pointer-events-none flex-shrink-0"/>
                                    }

                                    name="email"
                                    value={user.name}
                                    onChange={handleChange}
                                    placeholder="you@example.com"
                                    variant="bordered"
                                />
                                <Input
                                    startContent={
                                        <LockIcon
                                            className="text-2xl text-default-400 pointer-events-none flex-shrink-0"/>
                                    }
                                    name="password"
                                    isInvalid={invalid}
                                    value={user.password}
                                    onChange={handleChange}
                                    placeholder="Enter your password"
                                    color={invalid ? "danger" : "default"}
                                    errorMessage={invalid && "Incorrect password"}
                                    type="password"
                                    variant="bordered"
                                />
                                <div className="flex py-2 px-1 justify-between">
                                    <Checkbox
                                        classNames={{
                                            label: "text-small",
                                        }}
                                    >
                                        Remember me
                                    </Checkbox>
                                    <Link color="primary" href="#" size="sm">
                                        Forgot password?
                                    </Link>
                                </div>

                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="secondary" onPress={buttonClicked}>
                                    Sign in
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

        </>
    );
}