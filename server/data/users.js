const {ObjectId} = require('mongodb');
const mongoCollections = require("../config/mongoCollections");
const helpers = require("../helpers");
const users = mongoCollections.users;
const bcrypt = require('bcryptjs');
const saltRounds = 10;

const createUser = async (
  username,
  password,
  itinerary={},
  posts=[],
  likes=[]
) => {
  // input validation
  helpers.validateUsername(username);
  helpers.validatePassword(password);
  // trim inputs
  username = username.trim();
  password = password.trim();
  // create user
  const userCollection = await users();
  const userExists = await userCollection.findOne({username: username});
  if (userExists){throw 'Error: A user with that username already exists.'}
  password = await bcrypt.hash(password, saltRounds);
  let newUser = {
    username: username,
    password: password,
    itinerary: itinerary,
    posts: posts,
    likes: likes
  };
  const insertInfo = await userCollection.insertOne(newUser);
  console.log(insertInfo)
  if (!insertInfo.acknowledged || !insertInfo.insertedId) {
    throw "Could not add user";
  }
  return {insertedUser : true} 
};

module.exports = {
  createUser,
};
