const User = require('../models/User');

const bcrypt = require('bcryptjs');

module.exports = class AuthController {

    static login(req, res) {
        res.render('auth/login'); //render é usado quando a aplicação usa template engine

    } // Ação de login, static faz com que o método possa ser chamado sem instanciar a classe

    static register(req, res) {
        res.render('auth/register');//render é usado quando a aplicação usa template engine

    } // Ação de registro, static faz com que o método possa ser chamado sem instanciar a classe

    static async registerPost(req, res) {
        const { name, email, password, confirmpassword } = req.body;

        //validações
        //validação se todos os campos foram preenchidos
        if (!name || !email || !password || !confirmpassword) {
            req.flash('message', 'Por favor, preencha todos os campos!');
            res.render('auth/register');
            return;
        }

        //validar se as senhas batem
        if (password != confirmpassword) {
            req.flash('message', 'As senhas não conferem, tente novamente!');
            res.render('auth/register');
            return;
        }

        // validar tamanho da senha
        if (password.length < 6) {
            req.flash('message', 'A senha deve ter pelo menos 6 caracteres!');
            res.render('auth/register');
            return;
        }

        // validar formato do email
        const checkIfUserExists = await User.findOne({ where: { email: email } });
        if (checkIfUserExists) {
            req.flash('message', 'O e-mail já está em uso!');
            res.render('auth/register');
            return;
        }

        // validar se o usuário já existe
        const userExists = await User.findOne({ where: { email } });

        if (userExists) {
            req.flash('message', 'E-mail já cadastrado, tente outro!');
            return res.render('auth/register', { name });
        }

        req.flash('message', 'Usuário validado, agora pode cadastrar!');
        return res.redirect('/login');
    }

} // exporta a classe AuthController
