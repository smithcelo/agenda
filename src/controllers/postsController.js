const Post = require ('../models/PostModel');

exports.index = async (req, res) => {
    const posts = await Post.buscaPosts();
    res.render('posts', {posts});
}
    
