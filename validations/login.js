const Validator = require('validator');

module.exports = function loginValidation(form) {
    let loginErr = {};

    if (Validator.isEmpty(form.email)) {
        loginErr.email = 'email is empty';
    } else {
        if (!Validator.isEmail(form.email)) {
            loginErr.email = 'email not valid';
        }
    }
    
    if (Validator.isEmpty(form.password)) {
        loginErr.password = 'password is empty';
    }

    return Object.entries(loginErr).length === 0 ? false : loginErr;
}
