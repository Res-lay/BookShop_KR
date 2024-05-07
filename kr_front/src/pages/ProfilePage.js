import MyNavbar from "../components/MyNavbar";
import Footer from "../components/Footer";
import {useEffect, useState} from "react";
import axios from "axios";
import {
    Accordion,
    AccordionItem,
    Avatar,
    Table,
    TableBody, TableCell,
    TableColumn,
    TableHeader,
    TableRow
} from "@nextui-org/react";

export default function ProfilePage() {

    const [userData, setUserData] = useState(null);
    const [purchasesData, setPurchasesData] = useState([]);
    const token = localStorage.getItem("token");


    const axiosInstance = axios.create({
        baseURL: "http://localhost:8082/api/v1/purchases",
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });


    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser)
            setUserData(JSON.parse(storedUser));
        axiosInstance.get(`/${JSON.parse(storedUser).id}`)
            .then(response => {
                setPurchasesData(response.data);
                console.log(response.data);
            })
            .catch(err => console.error(err));
    }, []);

    return (
        <div>
            <MyNavbar></MyNavbar>
            <div className="flex flex-col gap-14 w-full mt-16 items-center min-h-screen justify-center">
                <div className="w-8/12 ">
                    <Accordion variant="splitted" selectionMode="multiple">
                        <AccordionItem key="1" aria-label="My purchases" title="My purchases">
                            {purchasesData?.map((item, key) => (
                                <div className="w-full gap-4 border-y-2 border-gray-400 flex flex-col items-center justify-center">
                                    <p className="mt-4">{item.date}</p>
                                    <Table>
                                        <TableHeader>
                                            <TableColumn>NAME</TableColumn>
                                            <TableColumn>AUTHOR</TableColumn>
                                            <TableColumn>QUANTITY</TableColumn>
                                        </TableHeader>
                                        <TableBody>
                                            {item.items.map((book, key) => (
                                                <TableRow>
                                                    <TableCell>{book.book.name}</TableCell>
                                                    <TableCell>{book.book.author}</TableCell>
                                                    <TableCell>{book.quantity}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>

                                </div>
                            ))}
                            <div>{purchasesData.status}</div>
                        </AccordionItem>
                        <AccordionItem key="2" aria-label="Account data" title="Account data">
                            <p>email: {userData?.email}</p>
                            <p>name: {userData?.name}</p>
                            <p>surname: {userData?.surname}</p>
                        </AccordionItem>
                        <AccordionItem key="3" aria-label="Account data" title="Referral system">
                            No $(
                        </AccordionItem>
                    </Accordion>
                </div>
            </div>
            <Footer/>
        </div>
    );
};