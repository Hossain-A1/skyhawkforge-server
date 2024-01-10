"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const manage_error_1 = require("../errors/manage.error");
const trainer_model_1 = __importDefault(require("../models/trainer.model"));
const drone_model_1 = __importDefault(require("../models/drone.model"));
class TrainerController {
    constructor() { }
    async getAllTrainers(req, res) {
        try {
            await Promise.resolve().then(async () => {
                const trainers = await trainer_model_1.default.find({});
                res.status(200).json(trainers);
            });
        }
        catch (error) {
            await (0, manage_error_1.handleError)(error, res);
        }
    }
    // get a trainer
    async getASTrainer(req, res) {
        try {
            const { tid } = req.params;
            if (!mongoose_1.default.Types.ObjectId.isValid(tid)) {
                res.status(404).json({ message: 'Trainer not found!' });
            }
            await Promise.resolve().then(async () => {
                const trainer = await trainer_model_1.default.findById(tid);
                res.status(200).json(trainer);
            });
        }
        catch (error) {
            await (0, manage_error_1.handleError)(error, res);
        }
    }
    // create a trainer
    async createAtrainer(req, res) {
        try {
            const { name, designation, bio, picUrl, dateOfBirth } = req.body;
            const { did } = req.params;
            if (!mongoose_1.default.Types.ObjectId.isValid(did)) {
                res.status(404).json({ message: 'Drone not found!' });
            }
            await Promise.resolve().then(async () => {
                const trainer = await trainer_model_1.default.create({
                    name,
                    designation,
                    bio,
                    picUrl,
                    dateOfBirth,
                });
                await drone_model_1.default.findByIdAndUpdate(did, {
                    $addToSet: {
                        trainers: trainer._id,
                    },
                });
                res.status(200).json(trainer);
            });
        }
        catch (error) {
            await (0, manage_error_1.handleError)(error, res);
        }
    }
    // update a trainer
    async updateAtrainer(req, res) {
        try {
            const { name, designation, bio, photoUrl, dateOfBirth } = req.body;
            const { tid } = req.params;
            if (!mongoose_1.default.Types.ObjectId.isValid(tid)) {
                res.status(404).json({ message: 'Trainer not found!' });
            }
            await Promise.resolve().then(async () => {
                const trainer = await trainer_model_1.default.findByIdAndUpdate({
                    name,
                    designation,
                    bio,
                    photoUrl,
                    dateOfBirth,
                }, { new: true });
                res.status(200).json(trainer);
            });
        }
        catch (error) {
            await (0, manage_error_1.handleError)(error, res);
        }
    }
    // delete a trainer
    async deleteATrainer(req, res) {
        try {
            const { tid } = req.params;
            if (!mongoose_1.default.Types.ObjectId.isValid(tid)) {
                res.status(404).json({ message: 'Trainer not found!' });
            }
            await Promise.resolve().then(async () => {
                const trainer = await trainer_model_1.default.findByIdAndDelete(tid);
                res.status(200).json(trainer);
            });
        }
        catch (error) {
            await (0, manage_error_1.handleError)(error, res);
        }
    }
}
exports.default = TrainerController;
