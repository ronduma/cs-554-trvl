const connection = require("../config/mongoConnection");
const data = require("../data/index.js");
const users = data.users;
const posts = data.posts;

async function main() {
    //first two lines
    const db = await connection.dbConnection();
    await db.dropDatabase();

    console.log("MAKING USERS");
    let user1 = await users.createUser("mxfu", "OhMyGod69!");
    let post1 = await posts.createPost("Whats your go-to spot in nyc", user1.insertedId.toString());

    let user2 = await users.createUser("ronbro", "thatisNICE100@");
    let reply1 = await posts.createReply(post1.insertedId.toString(), user2.insertedId.toString(), "wow this is useful");

    // try {
    //     let reply2 = await posts.createReply(post1.insertedId.toString(), user2.insertedId.toString(), "wow this isn't useful");
    // } catch (e) {
    //     console.log(e);
    // }

    let user3 = await users.createUser("dylanmyman", "thatisNICE100@");

    let reply3 = await posts.createReply(post1.insertedId.toString(), user3.insertedId.toString(), "wow this isn't useful");

    try {
        await posts.deleteReply(reply3._id.toString(), post1.insertedId.toString());
    } catch (e) {
        console.log(e);
    }

    let like1 = await posts.likePost(post1.insertedId.toString(), user2.insertedId.toString());

    try {
        let like1 = await posts.likePost(post1.insertedId.toString(), user2.insertedId.toString());
    } catch (e) {
        console.log(e);
    }
    //last two lines
    await connection.closeConnection();
    console.log("Done!");
}

main().catch((error) => {
    console.log(error);
});
