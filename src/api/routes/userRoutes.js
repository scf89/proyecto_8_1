const express = require('express');
const { registerUser, loginUser, getAllUsers, changeUserRole, deleteUser } = require('../controllers/userController');
const { isAdmin, isAuth} = require('../../middlewares/auth');
const { customCloudinaryStorage } = require('../../middlewares/file');
const router = express.Router();

router.post('/register', [customCloudinaryStorage('Users').single('image')],registerUser);
router.post('/login', loginUser);
router.patch('/:userId/role', [isAuth, isAdmin], changeUserRole);
router.delete('/:userId', isAuth, deleteUser);
router.get('/', [isAuth, isAdmin], getAllUsers);

module.exports = router;
