import React from "react";
import MyNavbar from "../components/MyNavbar";
import CardsGrid from "../components/CardsGrid";
import {Card, CardBody, Image} from "@nextui-org/react";

export default function HomePage(){

    return(
        <div className="flex flex-col">
            <MyNavbar></MyNavbar>
            <div className="flex flex-row gap-14">
                <Card>
                    <CardBody>
                        <Image src="" />
                        <p></p>
                    </CardBody>
                </Card>

            </div>
            <CardsGrid></CardsGrid>
        </div>
    );
}