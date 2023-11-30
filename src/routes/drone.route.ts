import express, { Router } from "express"
import authMiddleware from "../middlewares/auth.middleware"
import DronesController from "../controller/drone.controller"


const authInstance = new authMiddleware()


const droneRouter:Router = express.Router()
const dronesInstance = new DronesController()

// get all drones
droneRouter.get('/',dronesInstance.getAllDrones)

// get a drone
droneRouter.get('/:did',dronesInstance.getADrone)

// create a drone 
droneRouter.post("/:did",authInstance.isAuthorized, authInstance.isAdmin,dronesInstance.createADrone)
// update a drone 
droneRouter.put("/:did",authInstance.isAuthorized, authInstance.isAdmin,dronesInstance.updateADrone)
// deleted a drone 
droneRouter.delete("/:did",authInstance.isAuthorized, authInstance.isAdmin,dronesInstance.deleteADrone)







export default droneRouter