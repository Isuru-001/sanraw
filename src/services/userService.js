const userModel = require('../models/userModel');
const { hashPassword } = require('../utils/hash');

const createUser = async (userData) => {
    const { password } = userData;
    const password_hash = await hashPassword(password);
    return await userModel.createUser({ ...userData, password_hash });
};

const getAllUsers = async () => {
    return await userModel.getAllUsers();
};

const updateUser = async (id, userData) => {
    await userModel.updateUser(id, userData);
    return { message: 'User updated' };
};

const deleteUser = async (id) => {
    await userModel.deleteUser(id);
    return { message: 'User deleted' };
};

module.exports = {
    createUser,
    getAllUsers,
    updateUser,
    deleteUser
};
