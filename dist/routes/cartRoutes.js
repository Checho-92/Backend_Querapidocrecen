"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//cartRoutes.ts
const express_1 = __importDefault(require("express"));
const cartController_1 = require("../controllers/cartController");
const router = express_1.default.Router();
router.post('/add', cartController_1.addToCart);
router.get('/:userId', cartController_1.getCartItems);
router.put('/update', cartController_1.updateCartItem);
router.delete('/delete', cartController_1.deleteCartItem);
exports.default = router;
