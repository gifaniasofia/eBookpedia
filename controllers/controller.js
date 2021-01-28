const { User } = require('../models');
const { compare } = require('../helpers/bcrypt.js');

class Controller {
    static getHome(req, res) {
        const is_login = req.session.user_id;
        res.render('home.ejs', {is_login});
    }

    static getSignUp(req, res) {
        res.render('signup.ejs');
    }

    static postSignUp(req, res) {
        const { name, username, email, password } = req.body;
        const newUser = { name, username, email, password };

        User.create(newUser)
            .then(() => res.redirect('/login'))
            .catch(err => res.send(err))
    }

    static getLogin(req, res) {
        const is_login = req.session.user_id;
        const errorValidation = req.query.alert;
        res.render('login.ejs', { errorValidation, is_login });
    }

    static postLogin(req, res) {
        User.findOne({
                where: {
                    username: req.body.username
                }
            })
            .then(user => {
                let hasilPassword = compare(req.body.password, user.password)
                if (user && hasilPassword) {
                    req.session.user_id = user.id;
                    console.log(req.session);
                    res.redirect('/');
                } else {
                    const message = `Invalid username/password`
                    res.redirect(`/login?alert=${message}`)
                }
            })
            .catch(err => {
                const message = `Sorry! You must register first`
                res.redirect(`/login?alert=${message}`)
            })
    }

    static getLogout(req, res) {
        req.session.destroy(err => {
            res.redirect('/')
        })
    }
}

module.exports = Controller;