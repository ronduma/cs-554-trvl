# TRVL
Every holiday season, planning a vacation getaway seems more and more stressful. TRVL is a web application that enables users to plan their domestic trips with ease.

Built using MongoDB, Express, React, Node.js, and Material UI

## MongoDB
MongoDB is used as the main database system of this project. This database holds the registered user's information as objects. 
These objects include their username, their bcrypted password, their itnierary, posts, and their profile picture.  
The MongoDB also holds all the different posts made the different users.

## Express
Express was used throught out the front and backend of the project inorder to maintain proper route handling between client and server side. 
It provides a set of features for developing web applications in Node.js, such as handling HTTP requests and responses, routing, and middleware.
Express is also making easy HTTP requests and API calls which allows us to get the data for our project from the YELP Fusion API.

## React
React is a front-end JavaScript library that is used for building the user interface of the website. React is responsible for most of the
front end development seen throughout. It also allows us to make reusable UI components that can be composed together to build complex user interfaces. In short, this declarative program 
allows us to make changes based on what we want the website to look like.

## Node.js
Node.js is responsible for most of  data calls as it's the first and main connection we implemented to our mongoDB. Node makes the backend database calls that is later used 
for frontend developement. Node.js makes axios such as post, get and delete that both grabs data from MongoDB and edits data within the database.

## Material UI
Material UI is a react-library that is used for most of the designs within the website. Material UI was used to implement the individual events, 
categories, hotels, and restaurants. Mui Material was also used to make most of the search engines within the website. In short, Material UI a well-developed front-end library 
that was implemented to give our project the "website" material look.

## ImageMagick
ImageMagick is a feature within the webiste that allows the users to crop or resize their image to a certain size. ImageMagick allows the users upload, edit, and modify their profile picture 
for a more distinguised or unqiue look. Please create an /uploads directory in server

## MagicSearch
MagicSearch is a web development feature within the website that makes it easier for the users to make searches. MagicSearch can be seen implemented in the search bar of the community secition. 


# Starting the Website

## NPM I 
npm i in both client and server side in different terminals

## Redis
Open both redis-server and redis-cli as this program is implemented within the server for easy memory caching

## Elasticsearch 
Download https://www.elastic.co/downloads/elasticsearch
Run bin/elasticsearch (or bin\elasticsearch.bat on Windows)

Change to your password in server/data/posts.js
const { Client } = require("@elastic/elasticsearch");
const elasticClient = new Client({
    node: "http://localhost:9200",
    auth: {
        username: 'elastic',
        password: 'xJtXQYCe++W-xXGOMdyp'
    }
});

## Kibana
Download https://www.elastic.co/downloads/kibana
Run bin/kibana (or bin\kibana.bat on Windows)

If there are any troubles https://www.youtube.com/watch?v=BybAetckH88&ab_channel=SoumilShah is very useful

## Run seed.js
node seed.js in server/tasks

## NPM start
cd to both client and server side in different terminals and type 'npm start'




