const PostModel = require('../models/PostModel');

// exports.index = async (req, res) => {
//   if (req.session.user) {
//     const userEmail = req.session.user.email;
//     const userPosts = await PostModel.find({ email: userEmail }).sort({ criadoEm: -1 });
//     res.render('index', { user: req.session.user, posts: userPosts });
//   } else {
//     res.render('index', { user: null, posts: [] });
//   }
// };

exports.index =(req,res) => {
res.render('newPost');
}