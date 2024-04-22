import {
    Link,
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenu,
    NavbarMenuItem,
    NavbarMenuToggle
} from "@nextui-org/react";
import React, {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";
import UserDropdown from "./UserDropdown";

export default function MyNavbar() {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        setToken(storedToken);
    }, []);

    const handleLogin = (newToken) => {
        localStorage.setItem("token", newToken);
        setToken(newToken);
    }

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href='/';
        setToken(null);
    };

    const menuItems = [
        "Sign Up",
        "Home",
        "Shop",
        "About us",
        "Log out",
    ]

    return (
        <Navbar onMenuOpenChange={setIsMenuOpen}>

            <NavbarContent>
                <NavbarMenuToggle className="flex sm:hidden"></NavbarMenuToggle>
                <NavbarBrand>
                    <p className="font-bold text-inherit text-xl tracking-widest">LATYSHEV</p>
                </NavbarBrand>
            </NavbarContent>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                    <NavLink to="/">
                        Home
                    </NavLink>
                </NavbarItem>
                <NavbarItem>
                    <NavLink to="/books" aria-current="page">
                        Books
                    </NavLink>
                </NavbarItem>
                <NavbarItem>
                    <NavLink color="foreground" to="#">
                        Integrations
                    </NavLink>
                </NavbarItem>
            </NavbarContent>
            {token === null ? <NavbarContent justify="end">
                    <NavbarItem >
                        <LoginModal onLogin={handleLogin}/>
                    </NavbarItem>
                    <NavbarItem className="hidden lg:flex">
                        <SignUpModal/>
                    </NavbarItem>
                </NavbarContent> :
                <UserDropdown onLogout={handleLogout}/>
            }

            <NavbarMenu>
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                        <Link
                            color={
                                index === 0 ? "secondary" : index === 3 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
                            }
                            className="w-full"
                            href="#"
                            size="lg"
                        >
                            {item}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    );
}