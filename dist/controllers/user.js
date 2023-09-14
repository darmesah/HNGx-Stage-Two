"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUser = exports.createUser = void 0;
const express_validator_1 = require("express-validator");
const user_1 = __importDefault(require("../models/user"));
// @desc    Create a new user
// @route   /api
// @method  POST
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, phone } = req.body;
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            const error = new Error(errors.array()[0].msg);
            error.status = 422;
            throw error;
        }
        const createdUser = yield user_1.default.create({
            name,
            email,
            phone,
        });
        res.status(200).json({ message: "User created successfully", createdUser });
    }
    catch (error) {
        next(error);
    }
});
exports.createUser = createUser;
// @desc    Get a user by id (which could be the user id or name)
// @route   /api/:id
// @method  GET
const getUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const user = yield user_1.default.findOne({ $or: [{ id: id }, { name: id }] });
        if (!user) {
            const error = new Error("The user you are looking for does not exist");
            error.status = 404;
            throw error;
        }
        res.status(200).json({ user });
    }
    catch (error) {
        next(error);
    }
});
exports.getUser = getUser;
// @desc    Update a user data by id (which could be the user id or name)
// @route   /api/:id
// @method  PATCH
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { name, email, phone } = req.body;
    try {
        const user = yield user_1.default.findOne({ $or: [{ id: id }, { name: id }] });
        if (!user) {
            const error = new Error("User does not exist");
            error.status = 404;
            throw error;
        }
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            const error = new Error(errors.array()[0].msg);
            error.status = 422;
            throw error;
        }
        user.name = name;
        user.email = email;
        user.phone = phone;
        const updatedUser = yield user.save();
        res.status(200).json({ message: "User updated successfully", updatedUser });
    }
    catch (error) {
        next(error);
    }
});
exports.updateUser = updateUser;
// @desc    Delete a user data by id (which could be the user id or name)
// @route   /api/:id or /api/:name
// @method  PATCH
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const user = yield user_1.default.findOne({ $or: [{ id: id }, { name: id }] });
        if (!user) {
            const error = new Error("User does not exist");
            error.status = 404;
            throw error;
        }
        const deletedUser = yield user_1.default.findByIdAndDelete(user === null || user === void 0 ? void 0 : user._id);
        res.status(200).json({
            message: "The user with the following information was deleted successfully",
            deletedUser,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteUser = deleteUser;
