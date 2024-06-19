import { Request, Response } from 'express'
import { _sign } from '../../utils/jsonwebtoken'
import * as dto from './login.dto'
import model from './login.model'
import { TJoi } from '../../interface/interface'

export default {
  REGISTRATION: async (req: Request, res: Response) => {
    try {
      const { value, error }: TJoi<dto.IRegistr> = dto.registerSchema.validate(req.body)
      const returnData = {
        data: null,
        error: null,
      }

      if (error) {
        returnData.error = error.details[0].message
        return res.status(400).json(returnData)
      }

      const checkUserName = await model.checkUserName(value.username)
      if (checkUserName) return res.status(400).send('This user name already exists')

      const registered = await model.registerUser(value)

      if (!registered) {
        returnData.error = 'something went wrong'
        return res.status(500).json(returnData)
      }

      const token = _sign({
        user_id: registered.user_id,
      })

      returnData.data = { registered, token }
      res.json(returnData)
    } catch (error) {
      console.log(error)
      res.status(500).send(error)
    }
  },
  LOGIN: async (req: Request, res: Response) => {
    try {
      const { value, error }: TJoi<dto.ILogin> = dto.loginSchema.validate(req.body)
      const returnData = {
        data: null,
        error: null,
      }

      if (error) {
        returnData.error = error.details[0].message
        return res.status(400).json(returnData)
      }

      const registered = await model.checkUserLogin(value)

      if (!registered) {
        returnData.error = 'User not found'
        return res.status(404).json(returnData)
      }

      const token = _sign({
        user_id: registered.user_id,
      })

      returnData.data = { registered, token }
      res.json(returnData)
    } catch (error) {
      console.log(error)
      res.status(500).send(error)
    }
  },
}
