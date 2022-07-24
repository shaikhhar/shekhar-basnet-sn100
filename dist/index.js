"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const constants_1 = require("./utils/constants");
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use(routes_1.default);
const port = 3000;
app.listen(port, () => {
    console.log(`${constants_1.drone} listening on port ${port} of SN100!`);
});
//# sourceMappingURL=index.js.map