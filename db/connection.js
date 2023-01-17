const { connect , set} = require("mongoose");

set("strictQuery", false);

function connectMongo() {
  return connect(process.env.DB_HOST);
}

module.exports = { connectMongo };
