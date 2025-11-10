const User = require('../models/User');

const bcrypt = require('bcryptjs');

module.exports = class AuthController {

    static login(req, res) {
        res.render('auth/login'); //render é usado quando a aplicação usa template engine

    } // Ação de login, static faz com que o método possa ser chamado sem instanciar a classe

    static async loginPost(req, res) {
        const { email, password } = req.body;

        // encontrar usuário
        const user = await User.findOne({ where: { email: email } });

        if (!user) {
            req.flash('message', 'Usuário não encontrado!');
            return res.render('auth/login');
        }

        // verificar senha
        const passwordMatch = bcrypt.compareSync(password, user.password);

        if (!passwordMatch) {
            req.flash('message', 'Senha inválida!');
            return res.render('auth/login');
        }

        // iniciar sessão
        req.session.userid = user.id;
        req.flash('message', 'Login realizado com sucesso!');

        req.session.save(() => {
            res.redirect('/');
        });
    }

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

        //criar senha criptografada
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const user = {
            name,
            email,
            password: hashedPassword,
        };

        try {
            const createdUser = await User.create(user);

            // ininiciar sessão
            req.session.userid = createdUser.id;

            req.flash('message', 'Usuário cadastrado com sucesso!');

            req.session.save(() => {
                res.redirect('/');
            });
        } catch (error) {
            console.log(error);
        }
    }

    static logout(req, res) {
        req.session.destroy()
        res.redirect('/login')
    }
} // exporta a classe AuthController
