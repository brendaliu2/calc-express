const { BadRequestError } = require("./expressError");

// const MISSING = "Expected key `nums` with comma-separated list of numbers.";
/** Convert strNums like ["1","2","3"] to [1, 2, 3]. */

function convertStrNums(strNums) {
  // if the conversion isn't successful, throw a BadRequestError and will
  // be handled in your route
  if (!strNums) throw new BadRequestError(`num is required`);

  let queryStr = strNums.split(",");

  return queryStr.map(function (n) {
    if (isNaN(Number(n))) {
      throw new BadRequestError(`${n} is not a number`);
    }
    return parseInt(n);
  });
}


module.exports = { convertStrNums };