class Controller {
    static getHome(req, res) {
        res.render('home.ejs');
    }

    static getLogin(req, res) {
        res.render('login.ejs');
    }

    static getLogout(req, res) {
        res.redirect('/');
    }
}

module.exports = Controller;