"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const constants_1 = require("src/utils/constants");
const landing_zone_routes_1 = __importDefault(require("./landing-zone.routes"));
const path_find_routes_1 = __importDefault(require("./path-find.routes"));
const router = (0, express_1.Router)();
// Home route
router.get('/', (req, res) => {
    res.send(`Greetings, underpaid employee!

SpaceY is on a mission to get ahead of SpaceX, not just in name, but in exploring and understanding Mars.

As such, our dear company is sending ${constants_1.ship} to Mars with drone model ${constants_1.drone}. Your team is working on an REST API interface for ${constants_1.drone} to communicate with. The purpose of this interface is to give enough data to ${constants_1.drone} so it can navigate when ${constants_1.ship} lands on Mars.

Your mission, as you have no choice but to accept it since I'm paying you, is to make sure that the API sends and receives the correct data to make sure that our mission is a success and I can finally get ahead of my brother.

Head to the following endpoints to get started:
- /landing-zone
- /path-find

- Elton Musk (Elon Musk's younger, but smarter brother)`);
});
// Other routes
router.use('/landing-zone', landing_zone_routes_1.default);
router.use('/path-find', path_find_routes_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map