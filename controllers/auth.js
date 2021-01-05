
const passport = require('passport');

exports.loginPage = (req, res) => {
    res.render('pages/login');
}

exports.loggingIn = 
    passport.authenticate('local-login', {
        successRedirect: "/logged", 
        failureRedirect: "/login",
        failureFlash: true
    })

exports.signUp = (req, res) => {
    res.render('pages/signup', {failureFlash: true})
}

exports.signingUp =
    passport.authenticate('local-signup', {
        successRedirect: "/login", 
        failureRedirect: "/",
        failureFlash: true
    })
    
exports.logout = (req, res) => {
    req.logout();
    res.redirect('/');
}