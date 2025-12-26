const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendActivationEmail = async (to, token) => {
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    const activationLink = `${frontendUrl}/activate/${token}`;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: to,
        subject: 'Activate Your Sanraw Account',
        html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
                <h2 style="color: #2E8B57;">Welcome to Sanraw!</h2>
                <p>Please click the button below to activate your account:</p>
                <a href="${activationLink}" style="display: inline-block; padding: 10px 20px; background-color: #2E8B57; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">Activate Account</a>
                <p style="margin-top: 20px; font-size: 12px; color: #777;">This link expires in 24 hours.</p>
                <p style="font-size: 12px; color: #777;">Or copy this link: ${activationLink}</p>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Activation email sent to ${to}`);
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Failed to send activation email');
    }
};

const sendResetPasswordEmail = async (to, token) => {
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    // Assuming frontend has a route /reset-password/:token or similar. 
    // The user request was "send a link to email to change the password without current password".
    // Usually this links to a page where they enter the new password.
    // Let's assume the route is /reset-password/:token based on typical patterns, 
    // but I should check if I need to create that page too. 
    // The user only mentioned "forgotPassword page" for the request.
    // I'll assume the link goes to a reset page.
    const resetLink = `${frontendUrl}/reset-password/${token}`;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: to,
        subject: 'Reset Your Sanraw Password',
        html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
                <h2 style="color: #2E8B57;">Password Reset Request</h2>
                <p>You requested to reset your password. Click the link below to proceed:</p>
                <a href="${resetLink}" style="display: inline-block; padding: 10px 20px; background-color: #2E8B57; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
                <p style="margin-top: 20px; font-size: 12px; color: #777;">This link expires in 1 hour.</p>
                <p style="font-size: 12px; color: #777;">If you did not request this, please ignore this email.</p>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Reset password email sent to ${to}`);
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Failed to send reset password email');
    }
};

module.exports = { sendActivationEmail, sendResetPasswordEmail };
