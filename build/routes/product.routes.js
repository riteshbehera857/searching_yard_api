"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("../controller/product.controller");
const router = express_1.default.Router();
router.route("/").get(product_controller_1.getProducts).post(product_controller_1.createProduct);
router.route("/search").get(product_controller_1.getSerchedProducts);
exports.default = router;
//# sourceMappingURL=product.routes.js.map