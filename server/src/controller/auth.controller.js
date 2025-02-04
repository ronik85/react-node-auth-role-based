import { registerUserSchema, loginUserSchema, verifyEmailSchema } from '../validation/user.validation.js';
import { registerUserService, verifyEmailService, loginUserService } from '../services/user.service.js';

export const registerUser = async (req, res) => {
    const { error } = registerUserSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const user = await registerUserService(req.body);
        res.status(201).json({
            success: true,
            message: "Registration successful. Check your email to verify.",
        });
    } catch (err) {
        res.status(500).json({ message: "Error registering user", error: err.message });
    }
};

export const verifyEmail = async (req, res) => {
    const { error } = verifyEmailSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        await verifyEmailService(req.body.code);
        res.status(200).json({
            success: true,
            message: "Email verified successfully",
        });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

export const loginAdmin = async (req, res) => {
    const { error } = loginUserSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const user = await loginUserService(req.body.email, req.body.password);

        console.log(user)
        if (user.role !== 'admin') {
            return res.status(403).json({ message: "Access denied. Admin login only." });
        }

        if (!user.isVerified) {
            return res.status(403).json({ message: "Email not verified. Please verify your email first." });
        }

        res.json({
            message: "Login successful",
            user,
        });
    } catch (err) {
        res.status(500).json({
            message: "An error occurred while logging in. Please try again later.",
            error: err.message,
        });
    }
};
