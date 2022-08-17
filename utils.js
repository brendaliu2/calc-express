const { BadRequestError } = require("./expressError");


/** Convert strNums like ["1","2","3"] to [1, 2, 3]. */

function convertStrNums(strNums) {
  // if the conversion isn't successful, throw a BadRequestError and will
  // be handled in your route
  if (!strNums) throw new BadRequestError(`num is required`);

  let numbers = strNums.split(",");

  numbers = numbers.map(function (n) {
    if (isNaN(Number(n))) {
      throw new BadRequestError(`${n} is not a number`);
    }
    n = parseInt(n);
    return n;
  });

  return numbers;

}


module.exports = { convertStrNums };