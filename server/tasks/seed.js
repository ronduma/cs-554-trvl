const connection = require("../config/mongoConnection");
const data = require("../data/index.js");
const { getAllPosts } = require("../data/posts");
const users = data.users;
const posts = data.posts;

async function main() {
    const db = await connection.dbConnection();
    await db.dropDatabase();
    // COMMENT THE LINES UNDER
    await posts.clearIndex();
    console.log("clearing mongo and elasticsearch")

    console.log("MAKING USERS");
    let user1 = await users.createUser("mxfu", "OhMyGod69!");
    let user2 = await users.createUser("ronbro", "thatisNICE100@");
    let user3 = await users.createUser("dylanmyman", "thatisNICE100@");
    let user4 = await users.createUser("jaejaejae", "NewJeans0201!");

    console.log("MAKING POSTS");
    let post1 = await posts.createPost("Go-to spots in NYC", user1.insertedId.toString(), "If you wanna impress some friends with this taiwanese inspired street pubs with small tapas, 886 in St Marks is the place for you. Need a quick date spot or somewhere you are and your friends can have a casual meal to catch up, Izakaya Mew will not create the memory you did not think you needed to make. And lastly on Mott St of Chinatown, Kong Shik Tong gives anyone that quick meal transporting them to a Hong Kong station resturant where everything is there for them to enjoy, some hong kong style milk tea, golden toast and baked fried rices are a must.");
    let post2 = await posts.createPost("Top 3 restaurnts to go in Hoboken, NJ", user2.insertedId.toString(), "At third place, chicken factory. The $12 lunch special is a steal that you can't miss out with their korean corn dogs and mochi donuts. Coming in second place, we have chango kitchens, another lunch weekday deals that you won't want to miss. Each day there is something you want to grab from this cuban restaurant. Highly recommend that mango shake with your order. In first place, we have T thai where all you thai food cravings are satisfied. Don't forget to stop by baking mama for some cookies before or after your meal at T Thai.");
    let post3 = await posts.createPost("Where should you go in Philadelphia, PA", user3.insertedId.toString(), "spicy village in chinatown for some really delicious spicy noodles. Go to Kalaya if you want some upscale thai cuisine, you'll be suprised how homey it tastes. Not your average thai food. And def check out Ca Phe Roasters, a vietnamese brewery with the tastiest vietnamese coffee and variations.");

    console.log("MAKING REPLIES");
    let reply1 = await posts.createReply(post1.insertedId.toString(), user2.insertedId.toString(), "wow this is useful");
    let reply3 = await posts.createReply(post1.insertedId.toString(), user3.insertedId.toString(), "wow this isn't useful");
    let reply4 = await posts.createReply(post2.insertedId.toString(), user3.insertedId.toString(), "this article was so useful");
    let reply5 = await posts.createReply(post2.insertedId.toString(), user2.insertedId.toString(), "this article was very useful tyty");

    // test - users cannot comment twice
    // try {
    //     let reply2 = await posts.createReply(post1.insertedId.toString(), user2.insertedId.toString(), "wow this isn't useful");
    // } catch (e) {
    //     console.log(e);
    // }

    console.log("MAKING LIKES");
    let like1 = await posts.likePost(post1.insertedId.toString(), user2.insertedId.toString());
    let like2 = await posts.likePost(post1.insertedId.toString(), user3.insertedId.toString());
    let like3 = await posts.likePost(post3.insertedId.toString(), user1.insertedId.toString());

    // test - users cannot like the same post twice
    // try {
    //     let like4 = await posts.likePost(post1.insertedId.toString(), user2.insertedId.toString());
    // } catch (e) {
    //     console.log(e);
    // }

    // test - deleting from the actual owner of the comment
    // try {
    //     let delete4 = await posts.deleteReply(reply4._id.toString(), post2.insertedId.toString(), user3.insertedId.toString())
    // } catch (e) {
    //     console.log(e);
    // }

    //test - deleting from not the actual owner of the comment : should fail 
    // try {
    //     let delete5 = await posts.deleteReply(reply5._id.toString(), post2.insertedId.toString(), user1.insertedId.toString())
    // } catch (e) {
    //     console.log(e);
    // }

    await connection.closeConnection();
    console.log("Done!");
}

main().catch((error) => {
    console.log(error);
});
