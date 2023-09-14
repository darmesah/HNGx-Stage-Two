import { Schema, model } from "mongoose";
import { Iuser } from "../types/Iuser";

const userSchema = new Schema<Iuser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    default: "",
  },
  phone: {
    type: String,
    default: "",
  },
});

const User = model<Iuser>("User", userSchema);
export default User;
