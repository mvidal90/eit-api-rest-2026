import { model, Schema } from "mongoose";

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  birthday: {
    type: Date,
  },
  deletedAt: {
    type: Date,
    default: null,
  },
}, { timestamps: true })

export const User = model("User", UserSchema)