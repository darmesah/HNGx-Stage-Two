import { RequestHandler } from "express";
import { validationResult } from "express-validator";

import User from "../models/user";
import { Iuser } from "../types/Iuser";
import { ResponseError } from "../types/error";

// @desc    Create a new user
// @route   /api
// @method  POST

export const createUser: RequestHandler = async (req, res, next) => {
  const { name, email, phone }: Iuser = req.body;

  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const error: ResponseError = new Error(errors.array()[0].msg);
      error.status = 422;
      throw error;
    }

    const createdUser = await User.create({
      name,
      email,
      phone,
    });

    res.status(200).json({ message: "User created successfully", createdUser });
  } catch (error) {
    next(error);
  }
};

// @desc    Get a user by id (which could be the user id or name)
// @route   /api/:id
// @method  GET

export const getUser: RequestHandler = async (req, res, next) => {
  const id = req.params.id;

  try {
    const user = await User.findOne({ $or: [{ id: id }, { name: id }] });

    if (!user) {
      const error: ResponseError = new Error(
        "The user you are looking for does not exist"
      );
      error.status = 404;
      throw error;
    }

    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a user data by id (which could be the user id or name)
// @route   /api/:id
// @method  PATCH

export const updateUser: RequestHandler = async (req, res, next) => {
  const id = req.params.id;
  const { name, email, phone }: Iuser = req.body;

  try {
    const user = await User.findOne({ $or: [{ id: id }, { name: id }] });

    if (!user) {
      const error: ResponseError = new Error("User does not exist");
      error.status = 404;
      throw error;
    }

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const error: ResponseError = new Error(errors.array()[0].msg);
      error.status = 422;
      throw error;
    }

    user!.name = name;
    user!.email = email;
    user!.phone = phone;

    const updatedUser = await user!.save();

    res.status(200).json({ message: "User updated successfully", updatedUser });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a user data by id (which could be the user id or name)
// @route   /api/:id or /api/:name
// @method  PATCH

export const deleteUser: RequestHandler = async (req, res, next) => {
  const id = req.params.id;

  try {
    const user = await User.findOne({ $or: [{ id: id }, { name: id }] });

    if (!user) {
      const error: ResponseError = new Error("User does not exist");
      error.status = 404;
      throw error;
    }

    const deletedUser = await User.findByIdAndDelete(user?._id);

    res.status(200).json({
      message:
        "The user with the following information was deleted successfully",
      deletedUser,
    });
  } catch (error) {
    next(error);
  }
};
