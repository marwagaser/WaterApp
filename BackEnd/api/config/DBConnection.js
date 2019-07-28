const mongoose = require("mongoose"),
  config = require("../config/Config"),
  dburl = config.MONGO_URI;

// CAPTURE APP TERMINATION / RESTART EVENTS
// To be called when process is restarted or terminated
const gracefulShutdown = () => {
  return new Promise((resolve, reject) => {
    mongoose.connection
      .close()
      .then(() => {
        resolve();
      })
      .catch(err => {
        reject(err);
      });
  });
};

// For nodemon restarts
process.once("SIGUSR2", () => {
  gracefulShutdown()
    .then(() => {
      console.log("nodemon restart");
      process.kill(process.pid, "SIGUSR2");
    })
    .catch(err => {
      console.error(err);
    });
});

// For app termination
process.on("SIGINT", () => {
  gracefulShutdown()
    .then(() => {
      console.log("App termination (SIGINT)");
      process.exit(0);
    })
    .catch(err => {
      console.error(err);
    });
});

// For Heroku app termination
process.on("SIGTERM", () => {
  gracefulShutdown()
    .then(() => {
      console.log("App termination (SIGTERM)");
      process.exit(0);
    })
    .catch(err => {
      console.error(err);
    });
});

mongoose.Promise = Promise;
mongoose
  .connect(dburl,{useNewUrlParser : true}) //,{useNewUrlParser : true}
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch(err => {
    console.error(err);
    gracefulShutdown()
      .then(() => {
        process.exit(0);
      })
      .catch(err => {
        console.error(err);
      });
  });

require("../models/User");
require("../models/Point");
require("../models/Region");
require("../models/Sponsor");
require("../models/Voucher");
require("../models/WaterMeter");
