const { config } = require("dotenv");

config();

module.exports = {
    development: {
        "url": process.env.primaryDbConnectionString,
        "dialect": "postgres",
        
    },
};