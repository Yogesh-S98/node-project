const express = require('express');
const userController = require('../controllers/userControllers');
const { authenticateToken } = require('../middleware/authenticateToken');

const router = express.Router();

router.get('/userList', authenticateToken, userController.getusers);
router.post('/ping', authenticateToken, userController.createUser);
router.put('/updateUser', authenticateToken, userController.updateUser);
router.delete('/deleteUser/:id', authenticateToken, userController.deleteUser);
router.post('/login', userController.loginUser);

module.exports = router;