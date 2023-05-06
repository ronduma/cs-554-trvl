const { ObjectId } = require('mongodb');
const mongoCollections = require("../config/mongoCollections");
const helpers = require("../helpers");
const { post } = require('../routes/register');
const user = require("../data/users.js")
const posts = mongoCollections.posts;
const users = mongoCollections.users;

/** creates a new post for the community page : articles for users to like and comment */
const createPost = async (title, userPosted) => {
    //validation for creating posts
    if (!title || !userPosted || !title.trim() || !userPosted.trim()) {
        throw 'Error: a title and user must be supplied';
    }

    const now = new Date();

    let newPost = {
        _id: new ObjectId(),
        title: title.trim(),
        userPosted: userPosted.trim(),
        likes: [],
        replies: [],
        time: now.toLocaleTimeString(),
    };

    //insert the new post into postCollection
    const postCollection = await posts();
    const insertInfoToPost = await postCollection.insertOne(newPost);

    //find the user and update the post array into it
    const userCollection = await users();
    let userFound = await user.getUserById(userPosted);
    if (!userFound) {
        throw "the user posting is not found";
    }

    let userPosts = userFound.posts;
    userPosts.push(newPost);

    let updateUser = await userCollection.updateOne(
        { _id: new ObjectId(userPosted) },
        { $set: { posts: userPosts } }
    )


    //check if the user and post collections were updated
    if (!updateUser.modifiedCount === 0) throw `Could not update post successfully`;
    if (!insertInfoToPost.acknowledged || !insertInfoToPost.insertedId) {
        throw "Could not add post";
    }
    return { newPost: true, insertedId: insertInfoToPost.insertedId }
}

//returns an array of all the posts
const getAllPosts = async () => {
    const postCollection = await posts();
    const postList = await postCollection.find({}).toArray();
    return postList;
}

//returns the post by id
const getPostById = async (id) => {
    helpers.validateId(id);
    const postCollection = await posts();
    const post = await postCollection.findOne({ _id: new ObjectId(id) });
    if (!post) { throw 'Error: User cannot be found with id given' };
    return post;
}

/**
 * updating posts with replies
 */

const createReply = async (postId, userId, reply) => {
    // validation for commenting
    if (!reply || !postId || !userId) {
        throw "must enter a reply and ids";
    }
    helpers.validateId(postId);
    helpers.validateId(userId);

    if (typeof reply !== "string") {
        throw "reply must be a string";
    }

    // checking if valid post and user
    const postFound = await getPostById(postId);
    if (!postFound) {
        throw "there is no post of that id";
    }

    let userFound = await user.getUserById(userId);
    if (!userFound) {
        throw "user is not found";
    }

    // checking if already reviewed
    let comments = postFound.replies;
    if (comments.length !== 0) {
        for (let i = 0; i < comments.length; i++) {
            let curr = comments[i];
            if (curr.userId === userId) throw `You already left a review on ${postFound.title}`;
        }
    }

    //creates a comment object
    let newPostReply = {
        _id: new ObjectId(),
        postId: postId,
        userId: userId,
        username: userFound.username,
        content: reply,
    };

    /**push the new comment into the post**/

    const postCollection = await posts();
    comments.push(newPostReply); //remember comments is post.replies which is an array

    let updatePost = await postCollection.updateOne(
        { _id: new ObjectId(postId) },
        { $set: { replies: comments } }
    )

    //check if the post was updated
    if (updatePost.modifiedCount === 0) throw `Could not update song successfully`;

    return newPostReply;
};

/** gets all the replies of a specific post */

const getAllReplies = async (postId) => {

    //validate id
    helpers.validateId(postId);

    //grab db
    const postCollection = await posts();

    //find the post
    let post = await postCollection.findOne({ _id: ObjectId(postId) });
    if (post === null) throw `No post with id: ${postId}`;

    //return the reply array
    const replyList = post.replies;

    return replyList;
}

/** gets a reply by its id */
const getReplyById = async (replyId) => {
    helpers.validateId(replyId);

    //grab db
    const postCollection = await posts();

    //get a list of all the posts
    let allPosts = await postCollection.find({}).toArray();
    if (!allPosts) throw "Could not get all posts";

    //grab the replies from each post
    const allReplies = allPosts.map((elem) => elem.replies).flat();
    //find the reply with the supplied reply id
    const reply = allReplies.filter((elem) => elem["_id"].toString() === replyId.trim());
    //return the reply
    return reply;
};

/** deletes a reply from a specific post */
const deleteReply = async (replyId, postId) => {
    helpers.validateId(replyId);
    helpers.validateId(postId);

    //find the post
    let postFound = await getPostById(postId)
    if (!postFound) {
        throw "song is not found";
    }

    //store a local copy of all the replies
    let currentReplies = postFound.replies;
    //remove the reply
    for (let i = 0; i < currentReplies.length; i++) {

        if (currentReplies[i]._id.toString() === replyId) {
            currentReplies.splice(i, 1);
            break;
        }
    }

    //update post with that updated comment
    const postCollection = await posts();

    const updatePost = await postCollection.updateOne(
        { _id: new ObjectId(postId) },
        { $set: { replies: currentReplies } }
    )

    if (updatePost.modifiedCount === 0) {
        throw "could not remove reply from the post"
    }

    return "comment removed successfully";
}

/** like a post by a user  */
//PROBLEM : how do we make sure the user liking it didn't like it already
const likePost = async (postId, userId) => {
    helpers.validateId(userId);
    helpers.validateId(postId);

    //find the post
    let postFound = await getPostById(postId)
    if (!postFound) {
        throw "song is not found";
    }

    //find the user
    let userFound = await user.getUserById(userId)
    if (!userFound) {
        throw "user is not found";
    }

    let currLikes = postFound.likes;
    if (currLikes.includes(userFound.username)) {
        throw "user cannot like a post again"
    }

    //push like (username) into post's like array 
    currLikes.push(userFound.username);

    //update post with +1 like
    const postCollection = await posts();

    const updatePost = await postCollection.updateOne(
        { _id: new ObjectId(postId) },
        { $set: { likes: currLikes } }
    )

    if (updatePost.modifiedCount === 0) {
        throw "could not like from the post"
    }

    //update the liked post on the user db
    const userCollection = await users();

    userLikedPostList = userFound.likes;
    userLikedPostList.push(postId);

    const updateUser = await userCollection.updateOne(
        { _id: new ObjectId(userId) },
        { $set: { likes: userLikedPostList } }
    )

    if (updateUser.modifiedCount === 0) {
        throw "could not like the post"
    }

    return "Liked Sucessfully";
}

module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    createReply,
    getAllReplies,
    getReplyById,
    deleteReply,
    likePost,
};