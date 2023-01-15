const app = require("./app");
const { connectMongo } = require("./db/connection");

const { PORT = 3000 } = process.env;

// const start = async () => {
//   try {
//     await connectMongo();
//     console.log("Database connection successful");

// app.listen(PORT, () => {
//   console.log(`Server running. Use our API on port: ${PORT}`);
// });
//   } catch (error) {
// console.log(error.message);
// process.exit(1);
//   }
// };

// start();

connectMongo()
  .then(() => {
    console.log("Database connection successful");

     app.listen(PORT, () => {
       console.log(`Server running. Use our API on port: ${PORT}`);
     });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
