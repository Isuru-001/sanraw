const userModel = require('../models/userModel');
const { hashPassword, comparePassword } = require('../utils/hash');
const jwt = require('jsonwebtoken');

const login = async (email, password) => {
    const user = await userModel.findUserByEmail(email);
    if (!user) {
        throw new Error('Invalid credentials');
    }

    const isMatch = await comparePassword(password, user.password_hash);
    if (!isMatch) {
        throw new Error('Invalid credentials');
    }

    const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    );

    return { token, user: { id: user.id, email: user.email, role: user.role } };
};

const requestResetPassword = async (email) => {
    const user = await userModel.findUserByEmail(email);
    if (!user) return; // Fail silently for security
    // In a real app, send OTP/Email. For this "simple" prompt, we just mock the process.
    return { message: 'If user exists, reset instructions sent.' };
};

const resetPassword = async (email, newPassword) => {
    const user = await userModel.findUserByEmail(email);
    if (!user) throw new Error('User not found');

    const hashedPassword = await hashPassword(newPassword);
    await userModel.updatePassword(user.id, hashedPassword);
    return { message: 'Password updated successfully' };
};

const signup = async (userData) => {
    // Check if user exists
    const existingUser = await userModel.findUserByEmail(userData.email);
    if (existingUser) {
        throw new Error('User already exists');
    }

    // Hash password
    const password_hash = await hashPassword(userData.password);

    // Create user
    return await userModel.createUser({ ...userData, password_hash });
};

module.exports = {
    login,
    signup,
    requestResetPassword,
    resetPassword
};
