const Validator = require('validator');

module.exports = function loginValidation(form) {
    let loginErr = new Set();

    if (!Validator.isEmail(form.email)) {
        errors.add(1)
    }
    if (!Validator.isEmpty(form.email)) {
        errors.add(2)
    }
    if (!Validator.isEmpty(form.password)) {
        errors.add(3)
    }

    return loginErr
}
