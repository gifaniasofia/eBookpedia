const bcrypt = require('bcryptjs');

function hashing(pass) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(pass, salt);
    return hash;
}

function compare(inputPassword, passwordDb) {
    const hasil = bcrypt.compareSync(inputPassword, passwordDb);
    return hasil;
}

module.exports = { hashing, compare };