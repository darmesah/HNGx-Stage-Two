"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = __importDefault(require("./routes/user"));
const _404_1 = __importDefault(require("./middleware/404"));
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api", user_1.default);
app.use(_404_1.default);
app.use(errorHandler_1.default);
const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT;
mongoose_1.default.set("strictQuery", true);
mongoose_1.default
    .connect(MONGODB_URI)
    .then((result) => {
    app.listen(PORT);
    console.log("Server started at " + process.env.PORT);
})
    .catch((err) => console.log(err));
