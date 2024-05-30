"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// productRoutes.ts
const express_1 = __importDefault(require("express"));
const productController_1 = require("../controllers/productController");
const router = express_1.default.Router();
router.get('/products', productController_1.getAll);
router.get('/products/category/:category', productController_1.getByCategory);
router.get('/products/:id', productController_1.getById);
router.post('/products', productController_1.add);
router.put('/products/:id', productController_1.update);
router.delete('/products/:id', productController_1.remove);
exports.default = router;
