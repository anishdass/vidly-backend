const winston = require("winston");
// require('winston-mongodb');
require("express-async-errors");

module.exports = function () {
  winston.exceptions.handle(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.prettyPrint(),
        winston.format.simple()
      ),
    }),

    new winston.transports.File({ filename: "uncaughtExceptions.log" })
  );

  process.on("unhandledRejection", (ex) => {
    winston.error(ex.message, ex);
  });

  winston.add(new winston.transports.File({ filename: "logfile.log" }));

  // winston.add(winston.transports.MongoDB, {
  //   db: 'mongodb://localhost/vidly',
  //   level: 'info'
  // });
};
