const connection = require("../config/mongoConnection");
const data = require("../data/index.js");
const { getAllPosts } = require("../data/posts");
const users = data.users;
const posts = data.posts;

async function main() {
    //first two lines
    const db = await connection.dbConnection();
    await db.dropDatabase();

    console.log("MAKING USERS");
    let user1 = await users.createUser("mxfu", "OhMyGod69!");
    let post1 = await posts.createPost("Whats your go-to spot in nyc", user1.insertedId.toString(), "GO TO IZAKAYA MEW!!! OR 886 OR hakantonton or hong kong chun chun");

    let user2 = await users.createUser("ronbro", "thatisNICE100@");
    let reply1 = await posts.createReply(post1.insertedId.toString(), user2.insertedId.toString(), "wow this is useful");
    let post2 = await posts.createPost("Whats your go-to spot in Philly", user2.insertedId.toString(), "spicy village or matcha kimreiga");

    // console.log(await posts.getAllPosts());

    // try {
    //     let reply2 = await posts.createReply(post1.insertedId.toString(), user2.insertedId.toString(), "wow this isn't useful");
    // } catch (e) {
    //     console.log(e);
    // }

    let user3 = await users.createUser("dylanmyman", "thatisNICE100@");

    let reply3 = await posts.createReply(post1.insertedId.toString(), user3.insertedId.toString(), "wow this isn't useful");

    // /**testing you cannot like the same post twice */
    // let like1 = await posts.likePost(post1.insertedId.toString(), user2.insertedId.toString());

    // try {
    //     let like1 = await posts.likePost(post1.insertedId.toString(), user2.insertedId.toString());
    // } catch (e) {
    //     console.log(e);
    // }
    //last two lines

    /**testing delete reply function */

    let reply4 = await posts.createReply(post2.insertedId.toString(), user3.insertedId.toString(), "this article was so useful");
    let reply5 = await posts.createReply(post2.insertedId.toString(), user2.insertedId.toString(), "this article was very useful tyty");


    // //this tests deleting from the actual owner of the comment
    // try {
    //     let delete4 = await posts.deleteReply(reply4._id.toString(), post2.insertedId.toString(), user3.insertedId.toString())
    // } catch (e) {
    //     console.log(e);
    // }

    //this tests deleting from not the actual owner of the comment
    try {
        let delete5 = await posts.deleteReply(reply5._id.toString(), post2.insertedId.toString(), user1.insertedId.toString())
    } catch (e) {
        console.log(e);
    }

    await connection.closeConnection();
    console.log("Done!");
}

main().catch((error) => {
    console.log(error);
});
