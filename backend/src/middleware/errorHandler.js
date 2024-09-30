const { errorResponse } = require('../utils/responseUtil');

const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    errorResponse(res, 'Something went wrong!', 500, { error: err.message });
};

module.exports = {
    errorHandler
}