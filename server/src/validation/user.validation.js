import Joi from 'joi';

export const registerUserSchema = Joi.object({
    firstName: Joi.string().min(2).max(100).required(),
    lastName: Joi.string().min(2).max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(20).required(),
    role: Joi.string().valid('admin', 'customer').required(),
});

export const loginUserSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(20).required(),
});

export const verifyEmailSchema = Joi.object({
    code: Joi.string().length(6).required(),
});
