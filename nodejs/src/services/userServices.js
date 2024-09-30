const pool = require('../config/db');
const bcrypt = require('bcrypt');



const getUsers = async () => {
    try {
        const result = await pool.query('SELECT id, name, email, role FROM users ORDER BY id ASC');
        return result.rows;
    } catch (error) {
        console.error('Error retrieving users:', error);
        throw error;
    }
}

const createUser = async (user) => {
    const { name, email, role, password } = user;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await pool.query(
            'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, email, hashedPassword, role]
        );
        const setResult = {
            name: result.rows[0].name,
            email: result.rows[0].email,
            role: result.rows[0].role,
            id: result.rows[0].id,
        }
        return setResult;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
}

const updateUser = async (user) => {
    const { name, email, role, id } = user;
    try {
        const userId = parseInt(id, 10);

        if (isNaN(userId)) {
            throw new Error('Invalid user ID');
        }
        const result = await pool.query(
            'UPDATE users SET name = $1, email = $2, role = $3 WHERE id = $4 RETURNING *',
            [name, email, role, id]
        );
        const setResult = {
            name: result.rows[0].name,
            email: result.rows[0].email,
            role: result.rows[0].role,
            id: result.rows[0].id,
        }
        return setResult;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
}

const deleteUser = async (id) => {
    try {
        const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
        return result.rowCount > 0 ? result.rows[0] : null;
    } catch (error) {
        console.error('error delete user', error);
        throw error;
    }
}

module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser
};