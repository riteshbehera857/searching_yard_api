"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSerchedProducts = exports.createProduct = exports.getProducts = void 0;
const appError_1 = require("../utils/appError");
const product_model_1 = __importDefault(require("../models/product.model"));
const catchAsync = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    };
};
const getProducts = catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const queryObj = Object.assign({}, req.query);
    const sort = req.query.sort;
    const excludedFields = ['limit', 'fields'];
    excludedFields.forEach(el => delete queryObj[el]);
    let queryStr = JSON.stringify(queryObj);
    queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
    let query = product_model_1.default.find(JSON.parse(queryStr));
    if (sort === "name") {
        query = query.sort(sort);
    }
    else {
        query = query.sort(`-${sort}`);
    }
    const products = yield query;
    res.status(200).json({
        status: "success",
        error: false,
        data: {
            products,
        },
    });
}));
exports.getProducts = getProducts;
const getSerchedProducts = catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { q } = req.query;
    const queryString = new RegExp(`${q}`);
    const products = yield product_model_1.default.find({ name: { $regex: queryString, $options: 'i' } });
    res.status(200).json({
        status: "success",
        error: false,
        results: products.length,
        data: {
            products
        }
    });
}));
exports.getSerchedProducts = getSerchedProducts;
const createProduct = catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body)
        next(new appError_1.AppError(`Can't find ${req.originalUrl} path on the server`, "404"));
    yield product_model_1.default.create(Object.assign({}, req.body));
    res.status(201).json({
        status: "success",
        error: false,
    });
}));
exports.createProduct = createProduct;
//# sourceMappingURL=product.controller.js.map