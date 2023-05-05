const registerRoutes = require('./register');

const constructorMethod = (app) => {
  // app.use('/', (req, res) => {
  //   res.status(400).json("Hello World!")
  // }); 
  app.use('/register', registerRoutes);

  app.use('*', (req, res) => {
    res.status(400).json("Error: Page not found.")
  });
};

module.exports = constructorMethod;
