"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const http_1 = require("http");
const product_routes_1 = __importDefault(require("./routes/product.routes"));
const appError_1 = require("./utils/appError");
(0, dotenv_1.config)();
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
app.use((0, morgan_1.default)('dev'));
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    credentials: true,
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/products", product_routes_1.default);
app.all("*", (req, _res, next) => {
    next(new appError_1.AppError(`Can't find ${req.originalUrl} path on the server`, "404"));
});
exports.default = server;
//# sourceMappingURL=index.js.map