function generateCodeBook(title, id, isbn) {
    let prefix = title.split('')[0];
    return prefix.toUpperCase() + '-' +  id + isbn.substr(0, 2);
}

module.exports = generateCodeBook;