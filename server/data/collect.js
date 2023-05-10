const {ObjectId} = require('mongodb');
const mongoCollections = require("../config/mongoCollections");
const helpers = require("../helpers");
const users = mongoCollections.users;

const postItineraryToUser = async (userid, itinerary) => {
  console.log(userid);
  console.log(itinerary);
  const userCollection = await users();
  if(!ObjectId.isValid(userid)) throw 'Invalid: ID';
  const user = await userCollection.updateOne({_id: new ObjectId(userid)}, {$push: {itinerary: itinerary}});
  const result = await userCollection.findOne({_id: new ObjectId(userid)});
  if(!result){
    throw 'Error: user with that id does not exist';
  }
  if(result.modifiedCount === 0) throw 'Error: didnt update';
  return result;

}

const deleteItineraryToUser = async(userid, itinerary_name)=>{
  console.log(userid);
  console.log(itinerary_name);
  const userCollection = await users();
  if(!ObjectId.isValid(userid)) throw 'Invalid: ID';
  const user = await userCollection.updateOne({_id: new ObjectId(userid)}, {$pull: {itinerary: {name: itinerary_name}}});
  if(user.modifiedCount === 0) throw 'Error: didnt update';
  return result;

}

module.exports = {
  postItineraryToUser,
  deleteItineraryToUser
};