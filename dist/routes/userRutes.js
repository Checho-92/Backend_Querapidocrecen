"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//userRutes.ts
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const userController_1 = require("../controllers/userController");
const cartController_1 = require("../controllers/cartController");
const router = express_1.default.Router();
router.post('/api/register', userController_1.registerUser);
router.post('/login', authController_1.login);
router.post('/cart/add', cartController_1.addToCart);
exports.default = router;
