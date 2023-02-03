const path = require("path");
const app = require("./app");
require("colors");
const { connectMongo } = require("./db/connection");
const { createFolderIsNotExist } = require("./helpers");

const UPLOAD_DIR = path.join(__dirname, "..", "tmp");

const { PORT = 3000 } = process.env;

connectMongo()
  .then(() => {
    console.log("Database connection successful".cyan);

    app.listen(PORT, async () => {
      await createFolderIsNotExist(UPLOAD_DIR);
      console.log(`Server running. Use our API on port: ${PORT}`.cyan);
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
