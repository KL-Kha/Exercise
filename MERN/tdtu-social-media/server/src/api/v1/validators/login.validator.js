const { check } = require('express-validator');
const LOGIN_CONSTANT = require('../constants/login.validator.constant');

module.exports = [
    check('username').notEmpty().withMessage(LOGIN_CONSTANT.USERNAME_IS_EMPTY).trim(),

    check('password')
        .notEmpty()
        .withMessage(LOGIN_CONSTANT.PASSWORD_IS_EMPTY)
        .isLength({ min: 6 })
        .withMessage(LOGIN_CONSTANT.INVALID_PASSWORD_LENGTH)
        .trim(),
];
