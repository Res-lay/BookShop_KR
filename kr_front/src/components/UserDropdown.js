import {Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, NavbarContent, User} from "@nextui-org/react";
import React, {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";

export default function UserDropdown({onLogout}) {

    const handleLogout = () => {
        if (typeof onLogout === "function") {
            onLogout();
        }
    }
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, [])

    return (
        <NavbarContent justify="end">
            <Dropdown placement="bottom-start" className="bg-primary-100">
                <DropdownTrigger>
                    <User
                        as="button"
                        avatarProps={{
                            isBordered: true,
                        }}
                        className="transition-transform"
                    />
                </DropdownTrigger>
                <DropdownMenu aria-label="User Actions" variant="flat">
                    <DropdownItem key="profile" className="h-14 gap-2">
                        <p className="font-bold">Signed in as</p>
                        <p className="font-bold">{user?.email}</p>
                    </DropdownItem>
                    <DropdownItem key="settings">
                        <NavLink to={"/profile"}>Profile</NavLink>
                    </DropdownItem>
                    <DropdownItem key="team_settings">
                        <NavLink to={"/cart"}>Cart</NavLink>
                    </DropdownItem>
                    <DropdownItem key="logout" color="danger" onClick={handleLogout}>
                        Log Out
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </NavbarContent>
    );
}