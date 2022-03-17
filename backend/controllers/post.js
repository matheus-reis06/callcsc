const Post = require("../models/post");

exports.createPost = (req, res) => {
    console.log(req.file);
    const {title, meta, content, slug, author, tags} = req.body;
    const newPost = new Post({title, meta, content, slug, author, tags});

    res.json(newPost);
};