const router = require('express').Router();

const userController = require('../controller/user.controller');
const userMiddleware = require('../middlewares/user.middleware');
const {userValidators: {createUserValidator, updateUserValidator}} = require('../validators');
// const {userRoles} = require('../configs');

router.get('/',
    userController.getUsers
);
router.post('/',
    userMiddleware.isUserBodyValid(createUserValidator),
    userMiddleware.createUserMiddleware,
    userController.createUser);
router.get('/:user_id',
    userMiddleware.checkUserById,
    userController.getUserById);
router.put(
    '/:user_id',
    userMiddleware.isUserBodyValid(updateUserValidator),
    userMiddleware.checkUserById,
    userController.updateUser
);
router.delete(
    '/:user_id',
    userMiddleware.checkUserById,
    // userMiddleware.checkUserRoles([
    //     userRoles.ADMIN,
    //     userRoles.DRIVER
    // ]),
    userController.deleteUser);

module.exports = router;
