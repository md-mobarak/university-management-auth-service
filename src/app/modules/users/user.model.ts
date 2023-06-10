import { Schema, model } from 'mongoose'
import { IUser, userModel } from './user.interface'

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser>(
  {
    id: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)

export const User = model<IUser, userModel>('User', userSchema)
