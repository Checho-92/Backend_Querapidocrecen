"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// cartRoutes.ts
const express_1 = __importDefault(require("express"));
const cartController_1 = require("../controllers/cartController");
const router = express_1.default.Router();
router.post('/cart/add', cartController_1.addToCart);
router.get('/cart/:userId', cartController_1.getCartItems);
exports.default = router;
