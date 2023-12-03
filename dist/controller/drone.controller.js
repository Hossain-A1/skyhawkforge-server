"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const manage_error_1 = require("../errors/manage.error");
const drone_model_1 = __importDefault(require("../models/drone.model"));
class DronesController {
    constructor() { }
    // Get all drones
    async getAllDrones(req, res) {
        try {
            await Promise.resolve().then(async () => {
                const drones = await drone_model_1.default.find({});
                res.status(200).json(drones);
            });
        }
        catch (error) {
            await (0, manage_error_1.handleError)(error, res);
        }
    }
    // Get a drone
    async getADrone(req, res) {
        try {
            const { did } = req.params;
            if (!mongoose_1.default.Types.ObjectId.isValid(did)) {
                res.status(404).json({ message: 'Drone not found' });
            }
            await Promise.resolve().then(async () => {
                const drone = await drone_model_1.default.findById(did);
                res.status(200).json(drone);
            });
        }
        catch (error) {
            await (0, manage_error_1.handleError)(error, res);
        }
    }
    // Create a drone
    async createADrone(req, res) {
        try {
            const { title, description, about, category, images, price, rating, stock, } = req.body;
            if (!title ||
                !description ||
                !about ||
                !category ||
                !images ||
                !price ||
                !rating ||
                !stock) {
                throw new Error('Please provide all the following fields: Title, Description, Category, Images, Price, rating ,stock');
            }
            await Promise.resolve().then(async () => {
                const drone = await drone_model_1.default.create({
                    title,
                    description,
                    about,
                    category,
                    images,
                    price,
                    rating,
                    stock,
                });
                res.status(200).json(drone);
            });
        }
        catch (error) {
            await (0, manage_error_1.handleError)(error, res);
        }
    }
    // Update a drone
    async updateADrone(req, res) {
        try {
            const { title, description, category, images, price, rating, stock } = req.body;
            const { did } = req.params;
            if (!mongoose_1.default.Types.ObjectId.isValid(did)) {
                res.status(404).json({ message: 'Drone not found' });
            }
            await Promise.resolve().then(async () => {
                const drone = await drone_model_1.default.findByIdAndUpdate(did, {
                    title,
                    description,
                    category,
                    images,
                    price,
                    rating,
                    stock,
                }, { new: true });
                res.status(200).json(drone);
            });
        }
        catch (error) {
            await (0, manage_error_1.handleError)(error, res);
        }
    }
    // Delete a drone
    async deleteADrone(req, res) {
        try {
            const { did } = req.params;
            if (!mongoose_1.default.Types.ObjectId.isValid(did)) {
                res.status(404).json({ message: 'Drone not found' });
            }
            await Promise.resolve().then(async () => {
                const drone = await drone_model_1.default.findByIdAndDelete(did);
                res.status(200).json(drone);
            });
        }
        catch (error) {
            await (0, manage_error_1.handleError)(error, res);
        }
    }
}
exports.default = DronesController;
