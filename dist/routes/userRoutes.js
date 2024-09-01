"use strict";
//userRoutes.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
router.post('/register', userController_1.registerUser);
router.post('/login', authController_1.login);
router.put('/update-user', userController_1.updateUserInformation);
router.delete('/delete-user/:id', userController_1.deleteUserAccount); // Nueva ruta para eliminar cuenta
exports.default = router;
