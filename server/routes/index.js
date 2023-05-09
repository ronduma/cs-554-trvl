const home = require('./home');
const registerRoutes = require('./register');
const loginRoutes = require('./login');
const logoutRoutes = require('./logout');
const profileRoutes = require('./profile');
const itinerary = require('./itinerary')
const resturant = require('./restaurant')
const postRoutes = require('./posts');
const hotels =require('./hotels')
const eventRoutes = require('./events')
const categoriesRoute = require('./categories');
const eventIdRoute = require('./eventByID');
const collectRoutes = require('./collect');
const constructorMethod = (app) => {
  // app.use('/', (req, res) => {
  //   res.status(200).json("Hello World!")
  // }); 
  // app.use('/xx', xxRoutes);

  app.use('/register', registerRoutes);
  app.use('/collect', collectRoutes);
  app.use('/login', loginRoutes);
  app.use('/hotels', hotels)
  app.use('/posts', postRoutes);
  app.use('/profile', profileRoutes);
  app.use('/itinerary', itinerary);
  app.use('/restaurants', resturant);
  app.use('/posts', postRoutes);
  app.use('/logout', logoutRoutes);
  app.use('/events', eventRoutes);
  app.use('/categories', categoriesRoute);
  app.use('/eventByID', eventIdRoute);
  app.use('*', (req, res) => {
    // console.log('yo')
    res.status(400).json("Error: Page not found.")
  });
};

module.exports = constructorMethod;
