const Login = require('../models/LoginModel');

exports.register = async function (req, res) {
    try {
        const login = new Login(req.body);
        await login.register();

        if (login.errors.length > 0) {
            req.flash('errors', login.errors);
            req.session.save(() => res.redirect(req.get("Referrer")));
            return;
        }

        req.flash('success', 'Seu usuário foi criado com sucesso.');
        req.session.save(() => res.redirect('/'));
    } catch (e) {
        console.log(e);
        return res.render('404');
    }
};

exports.login = async function (req, res) {
    try {
        const login = new Login(req.body);
        await login.login();

        if (login.errors.length > 0) {
            req.flash('errors', login.errors);
            req.session.save(() => res.redirect('/'));
            // req.session.save(() => res.redirect(req.get("Referrer")));
            return;
        }

        req.flash('success', 'Você entrou no sistema.');
        req.session.user = login.user;
        req.session.save(() => res.redirect('/'));
    } catch (e) {
        console.log(e);
        return res.render('404');
    }
};

exports.logout = function (req, res) {
    req.session.destroy();
    res.redirect('/');
};
