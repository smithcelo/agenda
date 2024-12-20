const express = require('express');
const router = express.Router();
const newPostController = require('./src/controllers/newPostController');
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const cadastroController = require('./src/controllers/cadastroController');
const postsController = require('./src/controllers/postsController');
// const {middlewareTeste} = require('./src/middlewares/middleware')

router.use((req, res, next) => {
    console.log(`Método: ${req.method}, Rota: ${req.originalUrl}`);
    next();
});


router.get(['/'], homeController.index);

router.get('/register', cadastroController.index);

router.post('/register/login',loginController.register);
router.post('/login/login',loginController.login);
router.get('/login/logout',loginController.logout);

// router.get('/posts', postsController.index);

router.get('/new/', newPostController.index);
// router.post('/new/post',  postController.newPost); 
// router.get('/posts/post/:id',  postController.openPost); 

module.exports = router;
