const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  assunto: { type: String, required: true },
  texto: { type: String, required: true },
  email: { type: String, required: true },
  criadoEm: { type: Date, default: Date.now }
});

const PostModel = mongoose.model('Post', PostSchema);

class NewPost {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.newPost = null;
  }

  async post() {
    this.valida();
    if (this.errors.length > 0) return; // Se houver erros, retorna e não tenta criar o post

    try {
      this.newPost = await PostModel.create(this.body);
    } catch (error) {
      this.errors.push('Erro ao salvar no banco de dados.');
      console.log(error);
    }
  }

  valida() {
    this.cleanUp();

    if (this.body.assunto.trim() === '') {
      this.errors.push('O assunto não pode estar vazio.');
    }
    if (this.body.assunto.length > 50) {
      this.errors.push('O assunto não pode ultrapassar 50 caracteres.');
    }
    if (this.body.texto.length > 4000) {
      this.errors.push('O texto precisa ter menos caracteres.');
    }
  }

  cleanUp() {
    for (const key in this.body) {
      if (typeof this.body[key] !== 'string') {
        this.body[key] = '';
      }
    }

    this.body = {
      assunto: this.body.assunto.trim(),
      texto: this.body.texto.trim(),
      email: this.body.email // Certifique-se de que o email está incluído no corpo do post
    };
  }

  static async buscaPorId (id) {
    if (typeof id !== 'string') return;
    const post = await PostModel.findById(id);
    return post;
  };

  static async buscaPosts () {
    const posts = await PostModel.find()
    .sort({ criadoEm: -1 });
    return posts;
  };
  
  static async getPostsPaginated(page, limit) {
    const offset = (page - 1) * limit;
    return await PostModel.find().sort({ criadoEm: -1 }).skip(offset).limit(limit);
  }
  
  static async countPosts() {
    return await PostModel.countDocuments();
  }
}

module.exports = NewPost;
