module.exports = class AuthController {

    static login(req, res) {
        res.render('auth/login'); //render é usado quando a aplicação usa template engine

    } // Ação de login, static faz com que o método possa ser chamado sem instanciar a classe

    static register(req, res) {
        res.render('auth/register');//render é usado quando a aplicação usa template engine

    } // Ação de registro, static faz com que o método possa ser chamado sem instanciar a classe

} // exporta a classe AuthController