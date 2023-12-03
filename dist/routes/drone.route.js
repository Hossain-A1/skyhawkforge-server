"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const drone_controller_1 = __importDefault(require("../controller/drone.controller"));
const authInstance = new auth_middleware_1.default();
const droneRouter = express_1.default.Router();
const dronesInstance = new drone_controller_1.default();
// get all drones
droneRouter.get('/', dronesInstance.getAllDrones);
// get a drone
droneRouter.get('/:did', dronesInstance.getADrone);
// create a drone
droneRouter.post('/', authInstance.isAuthorized, authInstance.isAdmin, dronesInstance.createADrone);
// update a drone
droneRouter.put('/:did', authInstance.isAuthorized, authInstance.isAdmin, dronesInstance.updateADrone);
// deleted a drone
droneRouter.delete('/:did', authInstance.isAuthorized, authInstance.isAdmin, dronesInstance.deleteADrone);
exports.default = droneRouter;
