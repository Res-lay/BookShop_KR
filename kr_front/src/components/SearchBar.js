import {Input} from "@nextui-org/react";

export default function SearchBar({onData}){

    return (
        <div className='w-full flex flex-row justify-center mt-8'>
            <Input
                label="Search"
                isClearable
                radius="lg"
                onChange={(e) => onData(e.target.value)}
                classNames={{
                    base: "w-9/12",
                    label: "text-black/50 dark:text-white/90",
                    input: [
                        "bg-transparent",
                        "text-black/90 dark:text-white/90",
                        "placeholder:text-default-700 dark:placeholder:text-black/60",
                    ],
                    innerWrapper: "bg-transparent",
                    inputWrapper: [
                        "shadow-xl",
                        "bg-default-200",
                        "backdrop-blur-xl",
                        "backdrop-saturate-200",
                        "hover:bg-default-200/70",
                        "dark:hover:bg-default/70",
                        "group-data-[focused=true]:bg-default-200/50",
                        "dark:group-data-[focused=true]:bg-default/60",
                        "!cursor-text",
                    ],

                }}
                placeholder="Type to search..."

            />
        </div>
    );
}