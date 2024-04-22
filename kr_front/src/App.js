import './App.css';
import {NextUIProvider} from "@nextui-org/react";
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import BookPage from "./pages/BookPage";
import CartPage from "./pages/CartPage";
import AdminPanel from "./pages/AdminPanel";
import {checkAdminAccess} from "./utils/authUtils";

function App() {

    const router = createBrowserRouter([
        {
            path: "/",
            element: <HomePage/>
        },
        {
            path: "/profile",
            element: <ProfilePage></ProfilePage>
        },
        {
            path: "/book/:id",
            element: <BookPage></BookPage>
        },
        {
            path:"/cart",
            element: <CartPage />
        },
        {
            path:"/admin-panel",
            element: checkAdminAccess() ? <AdminPanel /> : <Navigate to="/" />
        }
    ]);
    return (
        <NextUIProvider>
            <RouterProvider router={router}/>
        </NextUIProvider>
    );
}

export default App;
