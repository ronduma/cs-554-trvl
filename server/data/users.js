const { ObjectId } = require('mongodb');
const mongoCollections = require("../config/mongoCollections");
const helpers = require("../helpers");
const users = mongoCollections.users;
const fs = require('fs');

const gm = require('gm');

const bcrypt = require('bcryptjs');
const saltRounds = 10;

const emptyUploadsFolder = async () => {
  const folderPath = './uploads';
  const files = await fs.promises.readdir(folderPath);

  for (const file of files) {
    await fs.promises.unlink(`${folderPath}/${file}`);
  }
};

const saveImgToDB = async (username, path) => {
  const image = fs.readFileSync(path);

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

    console.log('User updated.');
    await emptyUploadsFolder()
  } catch (err) {
    console.error(err);
  }
}

const modifyImage = async (imageBuffer) => {
  if (imageBuffer && imageBuffer.length > 0) {
    console.log(imageBuffer.length)
    gm(imageBuffer)
    .crop(100, 100, 0, 0)
    .toBuffer('PNG', (err, croppedBuffer) => {
      if (err) throw err;
      console.log('yo')
      // return croppedBuffer
    })
  } else throw 'Empty image buffer'
}

const createUser = async (
  username,
  password,
  itinerary = [],
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
  saveImgToDB,
  modifyImage
};
