const NewPost = require('../models/PostModel');

exports.index = (req, res) => {
  return res.render('newPost');
};

exports.newPost = async function(req, res) {
  try {
    // Adiciona o email do usuário logado ao corpo do post
    const postBody = {
      assunto: req.body.assunto,
      texto: req.body.texto,
      email: req.session.user.email // Adiciona o email do usuário logado
    };

    const newPost = new NewPost(postBody);
    await newPost.post();
    
    if (newPost.errors.length > 0) {
      req.flash('errors', newPost.errors);
      req.session.save(function() {
        return res.redirect('/newPost');
      });
      return;
    }

    req.flash('success', 'Post feito com sucesso.');
    req.session.save(function() {
      return res.redirect('/newPost');
    });
  } catch (e) {
    console.log(e);
    return res.render('404');
  }
};

exports.openPost = async function (req, res) {
  console.log('entrei na open post');
  const post = await NewPost.buscaPorId(req.params.id);
  return res.render('post', { post });
};
