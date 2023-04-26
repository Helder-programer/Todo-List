export default {
    async showLogin(req, res) {
        res.render('auth/login');
    },

    async showRegister(req, res) {
        res.render('auth/register');
    },

    async login(req, res) {
        res.send('OK');
    }
}