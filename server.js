const app = require("./app");
require('colors');
const { connectMongo } = require("./db/connection");

const { PORT = 3000 } = process.env;

connectMongo()
  .then(() => {
    console.log("Database connection successful".cyan);

     app.listen(PORT, () => {
       console.log(`Server running. Use our API on port: ${PORT}`.cyan);
     });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
