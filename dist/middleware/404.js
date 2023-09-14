"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const error404 = (req, res) => {
    return res.status(404).json({ message: "Could not find this route" });
};
exports.default = error404;
