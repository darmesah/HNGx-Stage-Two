"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (error, req, res, next) => {
    const status = error.status || 500;
    const message = error.message || "An unknown error occured";
    return res.status(status).json({ message });
};
exports.default = errorHandler;
