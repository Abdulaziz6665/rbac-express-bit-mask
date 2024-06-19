import { Request, Response } from 'express'
import model from './user.model'
import { TJoi, UserData } from '../../interface/interface'
import * as dto from './user.dto'

export default {
  GET_USER: async (req: Request, res: Response) => {
    try {
      const userData = req['user'] as UserData
      const user = await model.getUser(userData.user_id)

      res.json(user)
    } catch (error) {
      console.log(error)
      res.status(500).send(error)
    }
  },
  UPDATE_ROLE: async (req: Request, res: Response) => {
    try {
      const data = req.body as dto.IUpdateRole
      const { value, error }: TJoi<dto.IUpdateRole> = dto.updateSchema.validate(data)
      const returnData = {
        data: null,
        error: null,
      }
      if (error) {
        returnData.error = error.details[0].message
        return res.status(400).json(returnData)
      }

      const updated = await model.updateUserRole(value.user_id, value.user_role)

      if (!updated) {
        returnData.error = 'something went wrong'
        return res.status(500).json(returnData)
      }

      returnData.data = updated
      res.json(returnData)
    } catch (error) {
      console.log(error)
      res.status(500).send(error)
    }
  },
}
