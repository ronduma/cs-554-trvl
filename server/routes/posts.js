const express = require('express');
const router = express.Router();
const users = require('../data/users');
const helpers = require('../helpers');
const posts = require('../data/posts');

router.route('/').get(async (req, res) => {
    try {
        const searchTerm = req.query.searchTerm;
        if (searchTerm) {
          const searchResults = await posts.searchPosts(searchTerm);
          return res.json(searchResults);
        } else {
          const allPosts = await posts.getAllPosts();
          return res.json(allPosts);
        }
      } catch (e) {
        console.log(e);
        res.status(500).json({ errorCode: 500, message: e });
      }

    // let getAllPosts = await posts.getAllPosts();
    // return res.json(getAllPosts);

})
router.route('/:userId').post(async (req, res) => {
    let postForm = req.body;
    let createPost = await posts.createPost(postForm.title, req.params.userId, postForm.content);

    return res.json(createPost)
})
router.route('/:postId').get(async (req, res) => {
    let getPost = await posts.getPostById(req.params.postId);
    return res.json(getPost);
})
router.route('/like/:postId/:userId').put(async (req, res) => {

    try {
        let likePost = await posts.likePost(req.params.postId, req.params.userId);
        return res.json(likePost);
    } catch (e) {
        return res.status(400).json(e);
    }
})
router.route('/reply/:postId/:userId').post(async (req, res) => {
    let replyForm = req.body;
    try {
        let createComment = await posts.createReply(req.params.postId, req.params.userId, replyForm.reply);
        return res.json(createComment);
    } catch (e) {
        return res.status(400).json(e);
    }
})

//pls bring back the session.user
router.route('/reply/:replyId/:postId/:userId').delete(async (req, res) => {
    try {
        let deleteReply = await posts.deleteReply(req.params.replyId, req.params.postId, req.params.userId);
        return res.json(deleteReply);
    } catch (e) {
        return res.status(400).json(`${e}`);
    }
})
module.exports = router;
