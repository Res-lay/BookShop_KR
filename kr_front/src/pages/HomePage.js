import React from "react";
import MyNavbar from "../components/MyNavbar";
import CardsGrid from "../components/CardsGrid";
import {Button, Card, CardBody, CardHeader, Image} from "@nextui-org/react";
import Footer from "../components/Footer";

export default function HomePage(){

    return(
        <div className="flex flex-col">
            <MyNavbar></MyNavbar>
            <div className="flex justify-center flex-row gap-14 mt-8">
                <Card className="">
                    <CardBody>
                        <Image className="w-[1200px]" src="/banners/banner1.jpg"/>
                    </CardBody>
                </Card>

            </div>
            <CardsGrid type={"recommended"} filter={''}/>
            <div className="flex justify-center flex-row gap-14 ml-4 mt-16">
                <Image className="w-[700px]" src="/banners/banner2.jpg"/>
                <div>
                    <p className="font-bold text-3xl">For the anniversary of Nabokov: </p>
                    <p className="text-xl">books about relationships with a big age difference</p>
                    <Button radius="full" className="mt-2 bg-gradient-to-tr from-violet-500 to-yellow-500 text-white shadow-lg">
                        Read
                    </Button>
                </div>
            </div>

            <Footer />
        </div>
    );
}