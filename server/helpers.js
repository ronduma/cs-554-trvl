const { ObjectId } = require('mongodb');

// register validation
function validateId(id) {
    if (!id || !id.trim().length) throw 'Error: an id must be supplied.'
    if (!ObjectId.isValid(id)) {
        throw 'Error: id must be a an objectid.'
    }
    return true
}

function validateUsername(username) {
    if (!username || !username.trim().length) throw 'Error: You must supply a username.'
    if (typeof username != "string") {
        throw 'Error: Username must be a string.'
    }
    username = username.trim().toLowerCase();
    if (username.length < 3) {
        throw 'Error: Username must at least be 3 characters long.'
    }
    for (let i = 0; i < username.length; i++) {
        if (!(username.charAt(i) >= 'a' && username.charAt(i) <= 'z') && !(username.charAt(i) >= '0' && username.charAt(i) <= '9')) {
            throw 'Error: Username must only consist of alphanumeric characters.'
        }
    }
    return true
}

function validatePassword(password) {
    if (!password || !password.trim().length) throw 'Error: You must supply a password.';
    if (typeof password !== "string") throw 'Error: Password must be a string.';
    password = password.trim();
    //source for regex:
    //https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
    if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(password)) throw 'Error: Password should be at least 6 characters long, and have at least one uppercase character, one number and one special character.'
    return true;
}
function validateNumber(num){
    if(!num) throw "Error: no number for pages";
    if(num < 0 || typeof Number(num) == 'NaN') throw 'Error: number of pages cannot be less than 1';
    
}
module.exports = {
    validateId,
    validateUsername,
    validatePassword,
    validateNumber

}