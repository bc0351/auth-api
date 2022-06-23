'use strict';

function logger(req, res, next) {
  console.log(`\n****************************************************************************************************\nMETHOD: ${req.method}\nENDPOINT: ${req.originalUrl}\nHEADERS: ${JSON.stringify(req.headers)}\nQUERY: ${JSON.stringify(req.query)}\nPARAMETERS: ${JSON.stringify(req.params)}\n****************************************************************************************************\n`);
  next();
}
module.exports = logger;
