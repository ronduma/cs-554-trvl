const home = require('./home');
const registerRoutes = require('./register');
const loginRoutes = require('./login');
const itinerary = require('./itinerary')
const postRoutes = require('./posts');

const constructorMethod = (app) => {
  // app.use('/', (req, res) => {
  //   res.status(200).json("Hello World!")
  // }); 
  // app.use('/xx', xxRoutes);

  app.use('/register', registerRoutes);
  app.use('/login', loginRoutes);
  app.use('/itinerary', itinerary);
  app.use('/posts', postRoutes);


  app.use('*', (req, res) => {
    // console.log('yo')
    res.status(400).json("Error: Page not found.")
  });
};

module.exports = constructorMethod;
