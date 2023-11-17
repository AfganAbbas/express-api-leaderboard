// Import required modules
const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const Result = require("./model/Result");
const { notFound, errorHandler } = require("./middlewares");
const helmet = require('helmet')
const morgan = require('morgan')

dotenv.config();

// Create an instance of Express
const app = express();

// Middleware
app.use(helmet())
app.use(morgan('dev'));
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json()); // Parse incoming JSON requests

// Connect to MongoDB
mongoose
  .connect(
    process.env.DATABASE_URL
  )
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

// Define your routes
// app.get("/", (req, res) => {
//   res.send("Hello, this is your Express backend!");
// });

app.get("/api/leaderboard", async (req, res, next) => {
  try {
    const data = await Result.find({}).then((output) =>
      output.sort((a, b) => b.score - a.score)
    );
    res.json(data);
  } catch (error) {
    next(error);
  }
});
app.post("/api/leaderboard", async (req, res, next) => {
  try {
    const { username, score } = req.body;
    const existingResult = await Result.findOne({
      username,
    });
    // Employee already exists
    if (existingResult) {
      if (existingResult.score < score) {
        const updatedResult = await Result.findByIdAndUpdate(
          existingResult.id,
          req.body,
          {
            new: true,
          }
        );
        res.status(201).json(updatedResult);
      } else {
        const error = new Error("User couldn't update its record");
        res.status(409);
        return next(error);
      }
    } else {
      const result = new Result({
        username,
        score,
      });
      await result.save();
      res.status(201).json(result);
    }
  } catch (error) {
    next(error);
  }
});

app.post("/api/clear-all", async (req, res, next) => {
  try {
    async function clearCollections() {
      const collections = mongoose.connection.collections;

      await Promise.all(
        Object.values(collections).map(async (collection) => {
          await collection.deleteMany({}); // an empty mongodb selector object ({}) must be passed as the filter argument
        })
      );
    }
    await clearCollections();
  } catch (error) {
    next(error);
  }
});

app.use(notFound);
app.use(errorHandler);

// Start the server
module.exports = app;
