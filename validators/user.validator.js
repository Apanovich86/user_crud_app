const Joi = require('joi');

const {regexes, userRoles} = require('../configs');

const createUserValidator = Joi.object({
    username: Joi
        .string()
        .alphanum()
        .min(2)
        .max(50)
        .trim()
        .required(),
    first_name: Joi
        .string()
        .required()
        .trim(),

    last_name: Joi
        .string()
        .required()
        .trim(),
    email: Joi
        .string()
        .regex(regexes.EMAIL_REGEXP)
        .trim()
        .required(),
    password: Joi.string()
        .regex(regexes.PASSWORD_REGEX)
        .trim()
        .required(),

    user_type: Joi.string()
        .trim()
        .required()
        .allow(userRoles.ADMIN, userRoles.DRIVER)
});

const updateUserValidator = Joi.object({
    username: Joi
        .string()
        .alphanum()
        .min(2)
        .max(50)
        .trim()
        .required(),
    first_name: Joi
        .string()
        .required()
        .trim(),

    last_name: Joi
        .string()
        .required()
        .trim(),
    user_type: Joi.string()
        .trim()
        .required()
        .allow(userRoles.ADMIN, userRoles.DRIVER)
});

module.exports = {createUserValidator, updateUserValidator};

