const Validator = require('validator');

module.exports = function loginValidation(form) {
    let loginErr = new Set();

    if (Validator.isEmpty(form.email)) {
        loginErr.add(2)
    } else {
        if (!Validator.isEmail(form.email)) {
            loginErr.add(1)
        }
    }
    
    if (Validator.isEmpty(form.password)) {
        loginErr.add(3)
    }

    return loginErr
}
