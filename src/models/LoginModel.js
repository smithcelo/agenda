const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');

const LoginSchema = new mongoose.Schema({
    name: { type: String, required: true },
    cpf: { type: Number, required: false },
    email: { type: String, required: true },
    password: { type: String, required: true },
    criadoEm: { type: Date, default: Date.now }
});

const LoginModel = mongoose.model('Login', LoginSchema);

class Login {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.user = null;
    }

    async register() {
        
        await this.userExists();
        if (this.errors.length > 0) return;

        this.validaRegister();
        if (this.errors.length > 0) return;

        const salt = bcryptjs.genSaltSync();
        this.body.password = bcryptjs.hashSync(this.body.password, salt);

        this.user = await LoginModel.create(this.body);
    }

    async login() {
        this.validaLogin();
        if (this.errors.length > 0) return;
        this.user = await LoginModel.findOne({ email: this.body.email });

        if (!this.user) {
            this.errors.push('Usuário não existe.');
            return;
        }

        if(!bcryptjs.compareSync(this.body.password, this.user.password)) {
            this.errors.push('Senha inválida');
            this.user = null;
            return;
          }


    }

    validaRegister() {
        this.cleanUp();

        if (this.body.name.length === 0) {
            this.errors.push('O campo nome não pode estar vazio.');
        }
        if (!validator.isEmail(this.body.email)) {
            this.errors.push('O email precisa ser válido.');
        }
        if (this.body.password.length < 8 || this.body.password.length > 20) {
            this.errors.push('A senha precisa conter entre 8 a 20 caracteres.');
        }
        if (this.body.password !== this.body.pwordConfirm) {
            this.errors.push('Os campos de senha precisam ser iguais.');
        }
    }

    validaLogin () {
        this.cleanUp();
        if (!validator.isEmail(this.body.email)) {
            this.errors.push('O email precisa ser válido.');
        }
        if (this.body.password.length < 8 || this.body.password.length > 20) {
            this.errors.push('A senha precisa conter entre 8 a 20 caracteres.');
        }
    }

    async userExists() {
        this.user = await LoginModel.findOne({ email: this.body.email });
        if (this.user) this.errors.push('Usuário já existe.');
    }

    cleanUp() {
        for (const key in this.body) {
            if (typeof this.body[key] !== 'string') {
                this.body[key] = '';
            }
        }

        this.body = {
            name: this.body.name,
            cpf: this.body.cpf,
            email: this.body.email,
            password: this.body.password,
            pwordConfirm: this.body['password-confirm']
        };
    }

    static async buscaPorId(id) {
        if (typeof id !== 'string') return;
        const post = await PostModel.findById(id);
        return post;
    };

}

module.exports = Login;




