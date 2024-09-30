const express = require('express');
const userController = require('../controllers/userControllers');

const router = express.Router();

router.get('/userList', userController.getusers);
router.post('/ping', userController.createUser);
router.put('/updateUser', userController.updateUser);
router.delete('/deleteUser/:id', userController.deleteUser);

module.exports = router;