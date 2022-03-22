const Post = require("../models/post");
const FeaturedPost = require("../models/featuredPost");
const cloudinary = require("../cloud")

const FEATURED_POST_COUNT = 4;
const addToFeaturedPost = async(postId) => {
    const isAlreadyExists = await FeaturedPost.findOne({ post: postId})

    if(isAlreadyExists) return;

    const featuredPost = new FeaturedPost({post: postId})
    await featuredPost.save();

    const featuredPosts = await FeaturedPost.find({}).sort({createdAt: -1})
    featuredPosts.forEach(async (post, index) => {
        if(index >= FEATURED_POST_COUNT) 
        await FeaturedPost.findByIdAndDelete(post._id)
    })
}

exports.createPost = async (req, res) => {
    const {title, meta, content, slug, author, tags, featured} = req.body;
    const {file} = req;
    const isAlreadyExists = await Post.findOne({slug})

    if(isAlreadyExists) return res.status(401).json({error: "Please use unique slug!"})
    const newPost = new Post({title, meta, content, slug, author, tags});
    
    await newPost.save();
    
        if(file){
           const {secure_url: url, public_id} = await cloudinary.uploader.upload(file.path);
            newPost.thumbnail = {url, public_id}
        }

    if(featured) await addToFeaturedPost(newPost._id)

    res.json({post: {id: newPost._id,title, meta, slug, content, thumbnail: newPost.thumbnail?.url, 
        author: newPost.author, }});

}