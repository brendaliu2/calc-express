/** Simple demo Express app. */

const express = require("express");
const app = express();

// useful error class to throw
const { NotFoundError, BadRequestError } = require("./expressError");

const MISSING = "Expected key `nums` with comma-separated list of numbers.";


/** Finds mean of nums in qs: returns {operation: "mean", result } */
app.get("/mean", function (req, res) {
  const nums = req.query.nums;

  if (!nums) {
    throw new BadRequestError("Nums are required");
  }
  let numbers = nums.split(",");


  numbers = numbers.map(function (n) {
    if (isNaN(parseInt(n))) {
      throw new BadRequestError(`${n} is not a number`);
    }
    n = parseInt(n);
    return n;
  });

  const sum = numbers.reduce((previousValue, currValue) => previousValue + currValue, 0);
  const mean = sum / numbers.length;

  return res.send({
    operation: "mean",
    value: mean
  });
});

/** Finds median of nums in qs: returns {operation: "median", result } */


/** Finds mode of nums in qs: returns {operation: "mean", result } */


/** 404 handler: matches unmatched routes; raises NotFoundError. */
app.use(function (req, res, next) {
  throw new NotFoundError();
});

/** Error handler: logs stacktrace and returns JSON error message. */
app.use(function (err, req, res, next) {
  const status = err.status || 500;
  const message = err.message;
  if (process.env.NODE_ENV !== "test") console.error(status, err.stack);
  return res.status(status).json({ error: { message, status } });
});



module.exports = app;