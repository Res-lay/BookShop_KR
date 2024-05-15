import {Button, Card, CardBody, CardFooter, Image, Skeleton} from "@nextui-org/react";
import React from "react";
import {NavLink} from "react-router-dom";
import PopoverButton from "./PopoverButton";
import AddToCartButton from "./AddToCartButton";

export default function SkeletonCard() {
    return (
        <div>
            <Card shadow="sm" className="bg-primary-100 w-[300px]">
                    <CardBody className="flex flex-row justify-center align-middle">
                        <Skeleton>
                            <Image
                                shadow="sm"
                                radius="lg"
                                width="100%"
                                height="100%"
                                className="w-[170px] cursor-pointer object-fit:cover h-[250px]"
                            >
                            </Image>
                        </Skeleton>
                    </CardBody>
                <CardFooter className="flex-col justify-between ">
                    <div className="flex-row flex justify-evenly w-full align-text-bottom mt-5">
                        <b className="text-primary-800 flex self-center text-xl h-fit"></b>
                        {localStorage.getItem("token") === null ? (
                            <Skeleton>
                                <Button/>
                            </Skeleton>
                        ) : (
                            <Skeleton>
                                <Button/>
                            </Skeleton>
                        )}
                    </div>
                </CardFooter>

            </Card>
        </div>
    );
}