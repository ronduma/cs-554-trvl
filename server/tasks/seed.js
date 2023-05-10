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
    let user5 = await users.createUser("test", "Dt12345678!");
    let user6 = await users.createUser("sihang", "sihangLin43!");
    let user7 = await users.createUser("ryan12", "areWeSErious21!");

    console.log("MAKING POSTS");
    let post1 = await posts.createPost("Go-to spots in NYC", user1.insertedId.toString(), "If you wanna impress some friends with this taiwanese inspired street pubs with small tapas, 886 in St Marks is the place for you. Need a quick date spot or somewhere you are and your friends can have a casual meal to catch up, Izakaya Mew will not create the memory you did not think you needed to make. And lastly on Mott St of Chinatown, Kong Shik Tong gives anyone that quick meal transporting them to a Hong Kong station resturant where everything is there for them to enjoy, some hong kong style milk tea, golden toast and baked fried rices are a must.");
    let post2 = await posts.createPost("Top 3 restaurnts to go in Hoboken, NJ", user2.insertedId.toString(), "At third place, chicken factory. The $12 lunch special is a steal that you can't miss out with their korean corn dogs and mochi donuts. Coming in second place, we have chango kitchens, another lunch weekday deals that you won't want to miss. Each day there is something you want to grab from this cuban restaurant. Highly recommend that mango shake with your order. In first place, we have T thai where all you thai food cravings are satisfied. Don't forget to stop by baking mama for some cookies before or after your meal at T Thai.");
    let post3 = await posts.createPost("Where should you go in Philadelphia, PA", user3.insertedId.toString(), "spicy village in chinatown for some really delicious spicy noodles. Go to Kalaya if you want some upscale thai cuisine, you'll be suprised how homey it tastes. Not your average thai food. And def check out Ca Phe Roasters, a vietnamese brewery with the tastiest vietnamese coffee and variations.");
    let post4 = await posts.createPost("Baltimore is your next destination", user2.insertedId.toString(), "you would love all the things that I ate in Baltimore over the summer, from the delcious cafes and adventureous resturants. Baltimore is the next stop for all the foodies. Lot of amazing chefs are moving here and the food scene is become bigger here!!!");
    let post5 = await posts.createPost("MAINE IS A MUST", user4.insertedId.toString(), "Right on the tip and at the sea, all the seafood is at your finger tips for a better price than your local shoprite. Lobster rolls by the lighthouse, shrimp and grits mac and cheese. Don't forget the imfamous clam chowder that keep people coming for more and more. There is a famous restaurant, the number one resturant in all of Maine, Duck Fat and it's every person dream of poutine duck and butter ");
    let post6 = await posts.createPost("Calling all Bostonians", user4.insertedId.toString(), "Boston's Chinatown is the 8th wonder of the world, there is no other place like it, you'll love all the amzing chinese food there and definetly have to have hot pot one day. There are so many bakeries and little shops for you snack in on especially Tea Do!");
    let post7 = await posts.createPost("YEEHAWWW, TEXAS", user6.insertedId.toString(), "Austin, Houston, Dallas, you name it all the cities in Texas. Texas bbq is like no other, juicy tangy and absoltuely delcious. No one hates texas bbq cuz who doesn't like all that meat!!!");
    let post8 = await posts.createPost("Why you should go to California", user6.insertedId.toString(), "There is amazing weather at california, the beaches are amazing and beautiful, there is no place like it. The glitz and glam to the delicious food. Don't forget the imfamous erewhon that has taken the trends by the store. The food there is diverse, yo ucan get mexican, vegan, indian. chinese, polish, italian, anything you want to eat all at your finger tips");
    let post9 = await posts.createPost("Texas is where you should go", user2.insertedId.toString(), "Austin, Houston, Dallas, you name it all the cities in Texas.  The weather may be hot and sweltering but the activties there are amazing, horse back riding, canyons, hiking. Enjoy the wilderness that texas provides for you guys. and don't gorget to try some of that texas bbq while you're down there.");
    let post10 = await posts.createPost("New York City and where you should go", user7.insertedId.toString(), "There are so many events happening in NYC everyday everyweek, you'll never get bored. There is alot of shopping and let's not forget how amazing the food is there. Some of the best chefs around the country and world have a restaurant stationed here! Highly recommend getting omakase heres, you get them for $$$ and even cheaper too but all still very good!");
    let post11 = await posts.createPost("Top places to eat in NYC", user3.insertedId.toString(), "If you like korean kkq or even just korean food, ktown in NYC has some of the greatest foods, mostly known for its pochas tho you can check out the MAZE and Hong CHung CHeon or even Anytime to have a good time with your friends or a nice tinder date");
    let post12 = await posts.createPost("Jersey City has the best japanese food ever", user3.insertedId.toString(), "Ozu food is the best resturant in jersey city for comfort japanese food with a more modern take to it. The small platters of sushi also are delightful. Itto Sushi and DomoDomo take the cake though for amazing sushi here. LAstly, Menya has the best ramen in the hudson county");
    let post13 = await posts.createPost("Go on vacation to Hawaii", user5.insertedId.toString(), "The weather is amazing and nice, lots of breeze, the beaches are beautiful! Take some surfing lessons, go for a swim or even snorkling, there are so many acitivites for you to do with anyone in just the water. There have cute dances in hula skirts and coconuts.The fruit here is so good!!! And lets not forget the poke!");
    let post14 = await posts.createPost("Seattle is fun", user2.insertedId.toString(), "The weather is little gloomy but if you don't like the sun like i do you'll love it here. There is so much to see in Seattle, surprisingly they have alot of outdoor activities for you to enjoy from biking to hiking and even some sightseeing with the space needle");
    let post15 = await posts.createPost("Chinatown in NYC is a must travel", user4.insertedId.toString(), "Not only do you get to enjoy the city to its fullest, but you get a small food tour with all the stuff you can enjoy there. From the small rice rolls, mochi donuts, and dumplings. Don't forget to get MEi La Wah's pork buns they are so good. Support your small asian owned businesses because they need us and they have some goodies!");


    console.log("MAKING REPLIES");
    let reply1 = await posts.createReply(post1.insertedId.toString(), user2.insertedId.toString(), "wow this is useful");
    let reply3 = await posts.createReply(post1.insertedId.toString(), user3.insertedId.toString(), "wow this isn't useful");
    let reply4 = await posts.createReply(post9.insertedId.toString(), user4.insertedId.toString(), "this article was so useful");
    let reply5 = await posts.createReply(post5.insertedId.toString(), user5.insertedId.toString(), "where else should i go");
    let reply6 = await posts.createReply(post5.insertedId.toString(), user6.insertedId.toString(), "thank you for this!");
    let reply7 = await posts.createReply(post6.insertedId.toString(), user7.insertedId.toString(), "very interesting");
    let reply8 = await posts.createReply(post7.insertedId.toString(), user5.insertedId.toString(), "sounds yummy");
    let reply9 = await posts.createReply(post5.insertedId.toString(), user2.insertedId.toString(), "this article was very useful tyty");
    let reply10 = await posts.createReply(post12.insertedId.toString(), user1.insertedId.toString(), "are we serious.");
    let reply11 = await posts.createReply(post15.insertedId.toString(), user2.insertedId.toString(), "i love this");
    let reply12 = await posts.createReply(post13.insertedId.toString(), user2.insertedId.toString(), "wow i really wanna go there");

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
    let like4 = await posts.likePost(post3.insertedId.toString(), user2.insertedId.toString());
    let like5 = await posts.likePost(post3.insertedId.toString(), user5.insertedId.toString());
    let like6 = await posts.likePost(post4.insertedId.toString(), user7.insertedId.toString());
    let like7 = await posts.likePost(post5.insertedId.toString(), user5.insertedId.toString());
    let like8 = await posts.likePost(post9.insertedId.toString(), user2.insertedId.toString());
    let like9 = await posts.likePost(post11.insertedId.toString(), user1.insertedId.toString());
    let like10 = await posts.likePost(post6.insertedId.toString(), user4.insertedId.toString());
    let like11 = await posts.likePost(post12.insertedId.toString(), user7.insertedId.toString());
    let like12 = await posts.likePost(post13.insertedId.toString(), user3.insertedId.toString());
    let like13 = await posts.likePost(post12.insertedId.toString(), user6.insertedId.toString());
    let like14 = await posts.likePost(post10.insertedId.toString(), user5.insertedId.toString());



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

    try {
        console.log(await posts.getAllPosts());
    } catch (e) {
        console.log(e);
    }

    await connection.closeConnection();
    console.log("Done!");
}

main().catch((error) => {
    console.log(error);
});
