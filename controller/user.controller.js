const User = require('../dataBase/User');
const passwordService = require('../service/password.service');
const userUtil = require('../util/user.util');

module.exports = {
    getUsers: async (req, res) => {
        try{
            const users = await User.find({})
                .lean()
                .select('-password');

            res.json(users);
        } catch (e) {
            res.json(e.message);
        }
    },

    getUserById: async (req, res) => {
        try{
            const { user_id } = req.params;
            const user = await User.findById(user_id).lean();
            console.log(user);
            const normalizedUser = userUtil.userNormalizator(user);
            console.log(normalizedUser);
            res.json(normalizedUser);
        } catch (e) {
            res.json(e.message);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const hashedPassword = await passwordService.hash(req.body.password);

            const newUser = await User.create({...req.body, password: hashedPassword});

            const normUsers = userUtil.userNormalizator(newUser.toObject());

            res.json(normUsers);
        } catch (e) {
            next(e);
        }
    },

    // updateUser: async (req, res, next) => {
    //     try {
    //         const {user_id} = req.params;
    //         const {name} = req.body;
    //
    //         const updateUser = await User.findByIdAndUpdate(user_id, {name}, {new: true});
    //
    //         const normUsers = userUtil.userNormalizator(updateUser);
    //
    //         res.json(normUsers);
    //     } catch (e) {
    //         next(e);
    //     }
    // },

    updateUser: async (req, res, next) => {
        try {
            const { user_id } = req.params;
            const { username, first_name, last_name, user_type} = req.body;

            const updatedUser = await User
                .findByIdAndUpdate(user_id, { username, first_name, last_name, user_type }, { new: true, fields: { __v: 0 } });

            res.json(updatedUser);
        } catch (e) {
            next(e);
        }
    },
    deleteUser: async (req, res, next) => {
        try {
            const {user_id} = req.params;
            const delUser = await User.findByIdAndDelete(user_id);

            const normUsers = userUtil.userNormalizator(delUser.toObject());

            res.json(normUsers);
        } catch (e) {
            next(e);
        }
    }
};

