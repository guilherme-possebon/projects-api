"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const data_source_1 = require("../data-source");
const User_1 = require("../entities/User");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const uuid_1 = require("uuid");
const repo = data_source_1.AppDataSource.getRepository(User_1.User);
class UserController {
    async store(req, res) {
        const { name, email, password, password_confirmation } = req.body;
        if (!name || !email || !password || !password_confirmation) {
            res
                .status(400)
                .json({ success: false, error: "All fields are required." });
            return;
        }
        if (password !== password_confirmation) {
            res
                .status(400)
                .json({ success: false, error: "Passwords do not match." });
            return;
        }
        try {
            const user = repo.create({
                name,
                email,
                password: await bcryptjs_1.default.hash(password, 10),
                remember_token: (0, uuid_1.v4)(),
            });
            await repo.save(user);
            res.json({ success: true });
            return;
        }
        catch (e) {
            console.error(e);
            res.status(500).json({
                success: false,
                error: "There was an error while saving the user.",
            });
            return;
        }
    }
    async listAllUsers(req, res) {
        try {
            const users = await repo.find();
            res.json({ users });
            return;
        }
        catch (e) {
            res.status(500).json({ error: "Error fetching users" });
            return;
        }
    }
    async verifyUserName(req, res) {
        const { name } = req.body;
        if (!name) {
            res.status(400).json({ error: "Name is required." });
            return;
        }
        const user = await repo.findOne({ where: { name } });
        res.json({ exists: !!user });
        return;
    }
    async show(req, res) {
        const { id } = req.params;
        const user = await repo.findOneBy({ id: Number(id) });
        if (!user) {
            res.status(404).json({ error: "User not found." });
            return;
        }
        res.json({ user });
        return;
    }
}
exports.UserController = UserController;
