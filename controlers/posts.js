const { response } = require("express");
const db = require("../models");
const post = require("../models/post");

module.exports.getAllPosts = async (req, res) => {
    try {
        const allPosts = await db.Post.findAll();
        res.send(allPosts);
    } catch (error) {
        console.error("smth went wrong");
        res.send({
            error: "smth went wrong boy",
        });
    };
}

module.exports.getPostById = async (req, res) => {
    const postId = parseInt(req.params.id);

    try {
        const post = await db.Post.findByPk(postId);
        const author = await post.getUser();
        console.log("author", author);
        const response = {
            ...post.dataValues,
            author,
        };

        res.send(response);
    } catch (error) {
        console.error("smth went wrong");
        res.send({
            error: "smth went wrong boy",
        });
    }
}

module.exports.createPost = async (req, res) => {
    const userId = req.params.id;

    const {
        title,
        body,
    } = req.body
    //console.log(userId)
    try {
        const user = await db.User.findByPk(userId);

        if (!user) {
            throw new Error('User not found');
        }
        const newPost = {
            title,
            body,
        };

        const createdPost = await user.createPost(newPost);
        console.log("hello1")
        res.status(201).send(newPost);
    } catch (error) {
        console.error(error);
        res.send({
            error: "smth went wrong",
        });
    }
}

module.exports.addTagToPost = async (req, res) => {
    const postId = req.params.postId;
    const tagId = req.params.tagId;

    try {
        const post = await db.Post.findByPk(postId);
        const tag = await db.Tag.findByPk(tagId);

        if (!post) {
            throw new Error('Post not found');
        }
        if (!tag) {
            throw new Error('Tag not found');
        }

        await post.setTags(tag);

        const updatedPost = await db.Post.findByPk(postId);
        const updatedPostsTags = await updatedPost.getTags();

        const response={
            ...updatedPost.toJSON(),
            tags: updatedPostsTags,
        }
        res.status(201).send(response);
    } catch (error) {
        console.error(error);
        res.send({
            error: "smth went wrong",
        })
    }
}
module.exports.updatePost = (req, res) => {

}

module.exports.deletePost = (req, res) => {

}