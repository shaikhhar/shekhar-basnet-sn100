"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCoordinates = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const getCoordinates = async (zone) => {
    if (!zone) {
        return {
            R1: [],
            R2: [],
        };
    }
    // Simulate api call
    const data = await promises_1.default.readFile(path_1.default.join(__dirname, `../../assets/${zone}.json`));
    const coordinates = JSON.parse(data.toString());
    return coordinates.data;
};
exports.getCoordinates = getCoordinates;
//# sourceMappingURL=landing-zone.helpers.js.map