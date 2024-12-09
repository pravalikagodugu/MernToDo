const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = () => {
    const dbURL = process.env.DATABASE_URL;
    if (!dbURL) {
        console.error("DATABASE_URL is not defined in the environment variables.");
        process.exit(1);
    }

    mongoose.connect(dbURL)
    .then(() => {
        console.log("Database connected successfully");
    })
    .catch((error) => {
        console.error("Error in database connection");
        console.error(error.message);
        process.exit(1);
    });
};

module.exports = dbConnect;
