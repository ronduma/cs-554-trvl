const { ObjectId } = require('mongodb');
const mongoCollections = require("../config/mongoCollections");
const helpers = require("../helpers");
const user = require("../data/users.js")
const posts = mongoCollections.posts;
const users = mongoCollections.users;