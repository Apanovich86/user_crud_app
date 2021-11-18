const User = require('../dataBase/User');
const {ErrorHandler, errors} = require('../errors');

module.exports = {
    createUserMiddleware: async (req, res, next) => {
        try {
            const userByEmail = await User.findOne({email: req.body.email});

            if (userByEmail) {
                throw new ErrorHandler(errors.RESOURCE_ALREADY_EXISTS.message, errors.RESOURCE_ALREADY_EXISTS.code);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserBodyValid: (validator) => (req, res, next) => {
        try{
            const { error, value } = validator.validate(req.body);

            if (error) {
                throw new ErrorHandler(errors.NOT_VALID_BODY.message, errors.NOT_VALID_BODY.code);
            }

            req.body = value;

            next();
        } catch (e) {
            res.json(e.message);
        }
    },

    checkUserById: async (req, res, next) => {
        try {
            const {user_id} = req.params;

            const userById = await User.findById(user_id).lean();

            if (!userById) {
                throw new ErrorHandler(errors.NOT_FOUND_USER_BY_ID.message, errors.NOT_FOUND_USER_BY_ID.code);
            }

            req.user = userById;

            next();
        } catch (e) {
            next(e);
        }
    },
    checkUserRoles: (roleArr = []) => (req, res, next) => {
        try {
            const {role} = req.user;

            if (!roleArr.includes(role)) {
                throw new ErrorHandler(errors.FORBIDDEN_ERR.message, errors.FORBIDDEN_ERR.code);
            }

            next();
        } catch (e) {
            next(e);
        }
    },
};
