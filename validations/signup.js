const Validator = require('validator');
const validText = require('./valid_txt')

module.exports = function signupValidation(data) {
    let signupErr = {};
    
    data.email = validText(data.email) ? data.email : "";
    
    if (Validator.isEmpty(data.email)) {
      signupErr.email = "email is empty";
    } else {
      if (!Validator.isEmail(data.email)) {
        signupErr.email = "email not valid";
      }
    }
    
    return Object.entries(signupErr).length === 0 ? false : signupErr;
}
