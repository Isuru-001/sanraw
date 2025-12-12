const pool = require('../config/db');

const createUser = async (userData) => {
    const { name, email, password_hash, role } = userData;
    const [result] = await pool.query(
        'INSERT INTO user (name, email, password_hash, role) VALUES (?, ?, ?, ?)',
        [name, email, password_hash, role]
    );
    return result.insertId;
};

const findUserByEmail = async (email) => {
    const [rows] = await pool.query('SELECT * FROM user WHERE email = ?', [email]);
    return rows[0];
};

const findUserById = async (id) => {
    const [rows] = await pool.query('SELECT id, name, email, role, created_at FROM user WHERE id = ?', [id]);
    return rows[0];
};

const getAllUsers = async () => {
    const [rows] = await pool.query('SELECT id, name, email, role, created_at FROM user');
    return rows;
};

const updateUser = async (id, userData) => {
    const { name, role } = userData;
    await pool.query('UPDATE user SET name = ?, role = ? WHERE id = ?', [name, role, id]);
};

const deleteUser = async (id) => {
    await pool.query('DELETE FROM user WHERE id = ?', [id]);
};

// Reset Password Logic Helpers
const updatePassword = async (id, newPasswordHash) => {
    await pool.query('UPDATE user SET password_hash = ? WHERE id = ?', [newPasswordHash, id]);
};

module.exports = {
    createUser,
    findUserByEmail,
    findUserById,
    getAllUsers,
    updateUser,
    deleteUser,
    updatePassword
};
