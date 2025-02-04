import bcrypt from 'bcryptjs';
import { Op } from 'sequelize';
import { sendVerificationEmail } from '../mailtrap/email.js';
import User from '../models/user.model.js';

export const registerUserService = async (userData) => {
    const { firstName, lastName, email, password, role } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

    const user = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role,
        verificationToken,
        verificationTokenExpiresAt: Date.now() + 15 * 60 * 1000, // 15 minutes
    });

    await sendVerificationEmail(user.email, verificationToken);
    return user;
};

export const verifyEmailService = async (code) => {
    const user = await User.findOne({
        where: {
            verificationToken: code,
            verificationTokenExpiresAt: { [Op.gt]: new Date() },
        },
    });

    if (!user) throw new Error('Invalid or expired verification code');

    user.isVerified = true;
    user.verificationToken = null;
    user.verificationTokenExpiresAt = null;
    await user.save();

    return user;
};

export const loginUserService = async (email, password) => {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error('User not found');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid credentials');
    
    return user;
};
