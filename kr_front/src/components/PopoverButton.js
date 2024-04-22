import {Button, Popover, PopoverContent, PopoverTrigger} from "@nextui-org/react";
import React from "react";

export default function PopoverButton(){
    return(
        <Popover placement="right">
            <PopoverTrigger>
                <Button color="secondary" variant="solid">Add to cart</Button>
            </PopoverTrigger>
            <PopoverContent className="bg-primary-200">
                {(titleProps) => (
                    <div className="px-1 py-2">
                        <h3 className="text-small font-bold" {...titleProps}>
                            You should login first
                        </h3>
                        <div className="text-tiny">Or create new account</div>
                    </div>
                )}
            </PopoverContent>
        </Popover>
    );
}