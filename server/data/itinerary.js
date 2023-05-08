const { ObjectId } = require('mongodb');
const mongoCollections = require("../config/mongoCollections");
const helpers = require("../helpers");
const user = require("../data/users.js")
const posts = mongoCollections.posts;
const users = mongoCollections.users;

const postItineraryToUser = async (username, restaurantsid, hotelid, eventid) => {
    const userCollection = await users();
    const user = await userCollection.findOne({username: username});
    if(!user) throw 'Error: There is no user with the given name';
    if (user.itinerary.length >= 5) {
        throw 'Error: Only 5 elements allowed in the itinerary';
    }
    const itinerary = {
        restaurantsid: restaurantsid,
        hotelid: hotelid,
        eventid: eventid
      };
    
    const updateInfo = await userCollection.updateOne(
      { _id: user._id },
      { $push: { itinerary: itinerary } }
    );
    if (updateInfo.modifiedCount === 0) {
      throw "Could not update user with itinerary";
    }
    return { updatedUser: true };
  }
  
  module.exports = {
    postItineraryToUser
  };