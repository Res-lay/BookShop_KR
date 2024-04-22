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
import {MailIcon} from "../icons/MailIcon";
import {LockIcon} from "../icons/LockIcon";
import React, {useState} from "react";
import axios from "axios";

export default function SignUpModal() {

    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [password, setPassword] = useState("");
    const [invalidEmail, setInvalidEmail] = useState(false);
    const [invalidPassword, setInvalidPassword] = useState(false);
    const [userDetails, setUserDetails] = useState({email: '', password: ''});

    const validateEmail = (emailValue) => emailValue.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
    const validatePassword = (passwordValue1, passwordValue2) => passwordValue1 === passwordValue2;

    const handlePasswordChange = (event) => {
        setPassword(event.value);
        if (validatePassword(userDetails.password, password)) {
            setInvalidPassword(false);
        } else {
            setInvalidPassword(true);
        }
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        console.log(event.target);
        if (event.target.type === 'text') {
            if (validateEmail(value)) {
                setInvalidEmail(false);
            } else {
                setInvalidEmail(true);
                setInvalidEmail(true);  
            }
            setUserDetails({...userDetails, [name]: value});
        }
    }

        const onClickEvent = () => {
            axios.post("http://localhost:8082/api/v1/registration", userDetails)
                .then(response => console.log(response.data))
                .catch(error => console.error(error));
        }

        return (
            <>
                <Button onPress={onOpen} color="secondary" variant="ghost">
                    Sign up
                </Button>
                <Modal
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    placement="center"
                    backdrop={"blur"}
                    className="bg-primary-50"
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
                                <ModalHeader className="flex flex-col gap-1">Sing Up</ModalHeader>
                                <ModalBody>
                                    <Input
                                        autoFocus
                                        startContent={
                                            <MailIcon
                                                className="text-2xl text-default-400 pointer-events-none flex-shrink-0"/>
                                        }
                                        isInvalid={invalidEmail}
                                        color={invalidEmail ? "danger" : "success"}
                                        onChange={handleChange}
                                        placeholder="you@example.com"
                                        variant="bordered"
                                    />
                                    <Input
                                        startContent={
                                            <LockIcon
                                                className="text-2xl text-default-400 pointer-events-none flex-shrink-0"/>
                                        }
                                        isInvalid={invalidPassword}
                                        onChange={handleChange}
                                        placeholder="Enter your password"
                                        type="password"
                                        variant="bordered"
                                    />
                                    <Input
                                        startContent={
                                            <LockIcon
                                                className="text-2xl text-default-400 pointer-events-none flex-shrink-0"/>
                                        }
                                        value={password}
                                        onValueChange={handlePasswordChange}
                                        isInvalid={invalidPassword}
                                        errorMessage={invalidPassword && "Passwords don't match"}
                                        placeholder="Confirm your password"
                                        type="password"
                                        variant="bordered"
                                    />

                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="flat" onPress={onClose}>
                                        Close
                                    </Button>
                                    <Button color="secondary" onPress={onClickEvent}>
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