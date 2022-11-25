"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    name: String,
    description: String,
    price: Number,
    rating: Number,
    category: String,
    thumbnail: String
}, {
    timestamps: true,
});
const Products = (0, mongoose_1.model)("Products", productSchema);
exports.default = Products;
//# sourceMappingURL=product.model.js.map