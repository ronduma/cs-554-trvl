const registerRoutes = require('./register');
// const itinerary = require('./itinerary')

const constructorMethod = (app) => {
  // app.use('/', (req, res) => {
  //   res.status(200).json("Hello World!")
  // }); 
  // app.use('/xx', xxRoutes);
  
  app.use('/register', registerRoutes);
  // app.use('/itinerary', itinerary);

  app.use('*', (req, res) => {
    console.log('yo')
    res.status(400).json("Error: Page not found.")
  });
};

module.exports = constructorMethod;
