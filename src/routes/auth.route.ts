import express, { Router } from "express"
import AuthController from "../controller/auth.controller"

const authInstance = new AuthController()

const authRouter:Router = express.Router()

// user route
authRouter.post('/register',authInstance.register)
authRouter.post('/login',authInstance.login)
// drone route





export default authRouter