const registerRoutes = require('./register');
const itinerary = require('./itinerary')
const loginRoutes = require('./login');
const logoutRoutes = require('./logout');
const home = require('./home');

const constructorMethod = (app) => {
  // app.use('/', (req, res) => {
  //   res.status(200).json("Hello World!")
  // }); 
  // app.use('/xx', xxRoutes);
  
  app.use('/register', registerRoutes);

  app.use('/itinerary', itinerary);
  app.use('/login', loginRoutes);
  app.use('/logout', logoutRoutes)
  app.use('*', (req, res) => {
    console.log('yo')
    res.status(400).json("Error: Page not found.")
  });
};

module.exports = constructorMethod;
