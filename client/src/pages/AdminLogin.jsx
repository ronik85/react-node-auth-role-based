import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AdminLogin = () => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/api/auth/admin-login", credentials);
            if (res.data.role === "customer") {
                toast.error("You are not allowed to login from here");
            } else {
                toast.success("Login successful!");
                localStorage.setItem("token", res.data.token);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center text-gray-700">Admin Login</h2>
            <form onSubmit={handleSubmit} className="mt-4">
                <input type="email" name="email" placeholder="Email" onChange={handleChange} required className="w-full p-2 border rounded-md" />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required className="w-full p-2 mt-2 border rounded-md" />
                <button type="submit" className="w-full p-2 mt-4 text-white bg-green-500 rounded-md">Login</button>
            </form>
        </div>
    );
};

export default AdminLogin;
