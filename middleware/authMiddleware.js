const ApiError = require('./../error/APIError');
const tokenService = require('./../services/tokenService');

module.exports = function (req, res, next) {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return next(ApiError.unAuthorized("Не авторизован"));
        }

        const accessToken = authorizationHeader.split(' ')[1];
        if (!accessToken) {
            return next(ApiError.unAuthorized("Не авторизован"));
        }

        const data = tokenService.validateAccessToken(accessToken);
        if (!data) {
            return next(ApiError.unAuthorized("Не авторизован"));
        }

        req.user = data;
        next();
    } catch (e) {
        console.log("4")
        return next(ApiError.unAuthorized("Не авторизован"));
    }
};
