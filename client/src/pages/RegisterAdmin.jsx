import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const RegisterAdmin = () => {
    const [admin, setAdmin] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role: "admin",
    });
    const navigate = useNavigate()

    const handleChange = (e) => {
        setAdmin({ ...admin, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/api/auth/register", admin);
            toast.success(res.data.message);
            navigate('/verify-email')
        } catch (error) {
            toast.error(error.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center text-gray-700">Admin Registration</h2>
            <form onSubmit={handleSubmit} className="mt-4">
                <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} required className="w-full p-2 border rounded-md" />
                <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} required className="w-full p-2 mt-2 border rounded-md" />
                <input type="email" name="email" placeholder="Email" onChange={handleChange} required className="w-full p-2 mt-2 border rounded-md" />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required className="w-full p-2 mt-2 border rounded-md" />
                <button type="submit" className="w-full p-2 mt-4 text-white bg-red-500 rounded-md">Register</button>
            </form>
        </div>
    );
};

export default RegisterAdmin;
