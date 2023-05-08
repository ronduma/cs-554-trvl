const { ObjectId } = require('mongodb');
const mongoCollections = require("../config/mongoCollections");
const helpers = require("../helpers");
const users = mongoCollections.users;
const mongoose = require('mongoose');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const { empty } = require('@apollo/client');
const saltRounds = 10;

mongoose.connect('mongodb://localhost:27017');

const emptyUploadsFolder = async () => {
  const folderPath = './uploads';
  const files = await fs.promises.readdir(folderPath);

  // console.log(files)
  for (const file of files) {
    await fs.promises.unlink(`${folderPath}/${file}`);
  }
};

const saveImgToDB = async (username, path) => {
  const userSchema = new mongoose.Schema({
    profilePic : Buffer
  })
  
  const User = mongoose.model('User', userSchema, 'users_collection');
  
  const image = fs.readFileSync(path);

  const user = new User({
    profilePic : image
  });

  try {
    const userCollection = await users();
    const userExists = await userCollection.findOne({ username: username });
    if (userExists) { console.log('A user with that username already exists.') }
    const updatedUser = await userCollection.findOneAndUpdate(
      { username: username },
      { $set: {profilePic: image} },
      { returnOriginal: false }
    );

    if (!updatedUser) {
      throw `Error: User with username ${username} not found`;
    }

    console.log('User updated: ', updatedUser);
    await emptyUploadsFolder()
  } catch (err) {
    console.error(err);
  }
}

const createUser = async (
  username,
  password,
  itinerary = {},
  posts = [],
  likes = [],
  profilePic = null
) => {
  // input validation
  helpers.validateUsername(username);
  helpers.validatePassword(password);
  // trim inputs
  username = username.trim();
  password = password.trim();
  // create user
  const userCollection = await users();
  const userExists = await userCollection.findOne({ username: username });
  if (userExists) { throw 'Error: A user with that username already exists.' }
  password = await bcrypt.hash(password, saltRounds);
  let newUser = {
    username: username,
    password: password,
    itinerary: itinerary,
    posts: posts,
    likes: likes,
    profilePic: profilePic
  };
  const insertInfo = await userCollection.insertOne(newUser);
  // console.log(insertInfo)
  if (!insertInfo.acknowledged || !insertInfo.insertedId) {
    throw "Could not add user";
  }
  return { insertedUser: true, insertedId: insertInfo.insertedId };
};

const checkUser = async (
  username, password
) => {
  helpers.validateUsername(username);
  helpers.validatePassword(password);
  username = username.trim();
  password = password.trim();


  const userCollection = await users();
  const userExists = await userCollection.findOne({ username: username });

  if (!userExists) {
    throw 'Error: User with the given username or password does not exist. Try Again!';
  }
  let compare = await bcrypt.compare(password, userExists.password);
  if (compare) {
    return { authenticatedUser: true };
  }
  else {
    throw 'Error: Invalid Password. Try Again!';
  }
}

const getUserByUsername = async (username) => {
  username = username.toLowerCase();
  const userCollection = await users();
  const user = await userCollection.findOne({ username: username });
  if (!user) throw 'Error: There is no user with the given name';
  // user._id = user._id.string();
  return user;
}

const getUserById = async (userId) => {
  helpers.validateId(userId);
  const userCollection = await users();
  const user = await userCollection.findOne({ _id: new ObjectId(userId) });
  if (!user) throw "User not found";
  return user;
}

module.exports = {
  createUser,
  checkUser,
  getUserByUsername,
  getUserById,
  saveImgToDB
};
