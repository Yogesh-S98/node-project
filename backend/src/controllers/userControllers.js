const { json } = require('express');
const userService = require('../services/userServices');
const { successResponse, errorResponse, createdResponse } = require('../utils/responseUtil');

exports.loginUser = async (req, res) => {
    try {
        const user = await userService.login(req.body);
        if (!user) {
            return errorResponse(res, 'User not found');
        }
        return successResponse(res, 'Login Successfully', user);
    } catch (error) {
        return errorResponse(res, 'Error fetching users');
    }
}

exports.getusers = async (req, res) => {
    try {
        const users = await userService.getUsers();
        const result = {
            users: users,
        }
        return successResponse(res, 'Users List', result);
    } catch (error) {
        return errorResponse(res, 'Error fetching users');
    }
}

exports.createUser = async (req, res) => {
    try {
        const user = await userService.createUser(req.body);
        createdResponse(res, 'User Created', user);
    } catch (error) {
        errorResponse(res, 'Error creating user');
    }
}

exports.updateUser = async (req, res) => {
    try {
        const updatedUser = await userService.updateUser(req.body);
        if (!updatedUser) {
            return errorResponse(res, 'User not found');
        }
        return successResponse(res, 'Updated Successfully', updatedUser);
    } catch (error) {
        return errorResponse(res, 'Error updaing user');
    }
}

exports.deleteUser = async(req, res) => {
    try {
        const deleteUser = await userService.deleteUser(req.params.id);
        if (deleteUser) {
            return successResponse(res, `User deleted successfully`, deleteUser);
        } else {
            return errorResponse(res, `User with id ${req.params.id} not found.`, 404);
        }
    } catch (error) {
        return errorResponse(res, 'Error delete user');
    }
}