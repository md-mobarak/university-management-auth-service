import config from '../../../config'
import { ApiError } from '../../../errors/ApiError'
import { IUser } from './user.interface'
import { User } from './user.model'
import { generatedUserId } from './user.utils'

const createUser = async (user: IUser): Promise<IUser | null> => {
  // increamantelId
  const id = await generatedUserId()
  user.id = id
  // default password
  if (!user.password) {
    user.password = config.default_user_pass as string
  }

  const createdUser = await User.create(user)
  if (!createdUser) {
    throw new ApiError(400, 'Failed to user create')
  }
  return createdUser
}

// export default {
//   createUser,
// }

export const UserService = {
  createUser,
}
