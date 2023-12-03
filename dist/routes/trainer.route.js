"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const trainer_controller_1 = __importDefault(require("../controller/trainer.controller"));
const trainerRouter = express_1.default.Router();
const authInstance = new auth_middleware_1.default();
const trainerInstance = new trainer_controller_1.default();
// get all trainer
trainerRouter.get('/', trainerInstance.getAllTrainers);
// get a trainer
trainerRouter.get('/:tid', trainerInstance.getASTrainer);
// create a trainer
trainerRouter.post('/:did', authInstance.isAuthorized, authInstance.isAdmin, trainerInstance.createAtrainer);
// update a trainer
trainerRouter.put('/:tid', authInstance.isAuthorized, authInstance.isAdmin, trainerInstance.updateAtrainer);
// delete a trainer
trainerRouter.delete('/:tid', authInstance.isAuthorized, authInstance.isAdmin, trainerInstance.deleteATrainer);
exports.default = trainerRouter;
