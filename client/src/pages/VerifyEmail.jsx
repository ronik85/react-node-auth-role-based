import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

const VerifyEmail = () => {
    const [code, setCode] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const handleVerify = async () => {
        if (!code.trim()) {
            setError("Please enter the verification code.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:5000/api/auth/verify-email", {
                code,
            });

            if (response.data.success) {
                setSuccess("Email verified successfully! Redirecting...");
            }
        } catch (error) {
            setError(error.response?.data?.message || "Invalid verification code.");
        }
    };

    return (
        <div className="verify-container">
            <h2>Email Verification</h2>
            <p>Enter the verification code sent to your email: </p>

            <input
                type="text"
                placeholder="Enter Code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
            />

            <button onClick={handleVerify}>Verify</button>

            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
        </div>
    );
};

export default VerifyEmail;
