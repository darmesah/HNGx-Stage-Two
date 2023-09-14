import { Router } from "express";
import { body, query } from "express-validator";

import {
  createUser,
  deleteUser,
  getUser,
  updateUser,
} from "../controllers/user";

const router: Router = Router();

router.post(
  "/",
  [body("name").isString().withMessage("Name is not a string").trim()],

  createUser
);

router.get("/:id", getUser);

router.patch(
  "/:id",
  [body("name").isString().withMessage("Name is not a string").trim()],
  updateUser
);

router.delete("/:id", deleteUser);

export default router;
