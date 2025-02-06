import { Outlet, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../SideBar/Sidebar";

export default function Home() {
    console.log("KKKKKKKKKKKKKKKKKKKKKKKK")
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
     
        // ✅ Get token from localStorage
        const authToken = localStorage.getItem("authToken");
        if (!authToken) {
            navigate("/"); // Redirect to login if no token is found
            return;
        }
        console.log({authToken})
        // ✅ Fetch user data from backend
        axios.get("http://localhost:3000/protected", {
            headers: { Authorization: `Bearer ${authToken}` }
        })
            .then((res) => setUser(res.data.user))
            .catch(() => {
                localStorage.removeItem("authToken"); // Remove invalid token
                navigate("/"); // Redirect to login
            });
    }, [navigate]);

    return (
        <>
            {/* Navbar */}
            <div className="navbar flex items-center w-screen bg-red-500 fixed top-0 left-0 px-4 h-16">
                {/* Sidebar (inside Navbar) */}
                <Sidebar />
                {/* Navbar Title */}
                <a className="btn btn-ghost text-xl ml-4">daisyUI</a>
                {/* Show user info if authenticated */}
                {user && <span className="ml-auto mr-4 text-white">Welcome, {user.name}</span>}
            </div>

            {/* Main Content Below Navbar */}
            <div className="w-screen h-screen p-4 pt-20">
                <div className="pl-16 pr-16">
                    <Outlet />
                </div>
            </div>
        </>
    );
}
