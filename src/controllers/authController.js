const authService = require('../services/authService');

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password required' });
        }
        const result = await authService.login(email, password);
        res.json(result);
    } catch (err) {
        res.status(401).json({ message: err.message });
    }
};

const requestResetPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const result = await authService.requestResetPassword(email);
        res.json(result);
    } catch (err) {
        res.status(500).json({ message: 'Error processing request' });
    }
};

const verifyOTP = async (req, res) => {
    // Mock OTP verification
    res.json({ message: 'OTP Verified' });
};

const resetPassword = async (req, res) => {
    try {
        const { email, newPassword } = req.body;
        if (!email || !newPassword) {
            return res.status(400).json({ message: 'Email and new password required' });
        }
        await authService.resetPassword(email, newPassword);
        res.json({ message: 'Password reset successful' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Name, email, and password required' });
        }
        await authService.signup({ name, email, password, role: 'employee' });
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

module.exports = {
    login,
    signup,
    requestResetPassword,
    verifyOTP,
    resetPassword
};
