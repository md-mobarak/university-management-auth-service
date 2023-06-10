import { Model } from 'mongoose'

// 1. Create an interface representing a document in MongoDB.
export type IUser = {
  id: string
  password: string
  role: string
}

export type userModel = Model<IUser, Record<string, unknown>>
