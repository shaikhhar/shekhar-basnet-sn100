"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidLandingZone = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const perf_hooks_1 = require("perf_hooks");
const landing_zone_types_1 = require("src/types/landing-zone.types");
const constants_1 = require("src/utils/constants");
const landing_zone_helpers_1 = require("src/utils/landing-zone.helpers");
const validation_1 = require("src/utils/validation");
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    res.send(`${constants_1.drone} needs to fly to find a landing zone, but is not sure which of the 10 landing zones has the correct coordinates.

Since SpaceY is on a tight budget, the rovers we sent in weren't exactly high quality. One of them shared garbage coordinates, while the other one malfunctioned in the middle.

After talking to NASA, however, we found that if all the coordinates shared by rover, R2, is includes in the list of coordinates shared by other rover, R1, then that landing zone is good to go.

But again, since we were on a tight budget, we didn't exactly hire the best engineers. Your task is to fix the isValidLandingZone function in the /landing-zone/:zone endpoint to make sure that the API correctly identifies valid landing zones.

The API accepts a landing zone (Z1, Z2, Z3,... Z10) and returns an object indicating the zone, whether that zone is valid, and the time it took to compute the result.`);
});
router.get('/:zone', (0, validation_1.validate)((0, express_validator_1.param)('zone', 'Not a valid zone').isIn(Object.values(landing_zone_types_1.EZone))), async (req, res) => {
    const zone = req.params.zone;
    const coordinates = await (0, landing_zone_helpers_1.getCoordinates)(zone);
    const start = perf_hooks_1.performance.now();
    const isValid = (0, exports.isValidLandingZone)(coordinates);
    const end = perf_hooks_1.performance.now();
    res.status(200).send({
        zone,
        isValid,
        elapsedTime: end - start,
    });
});
// Function to update
const isValidLandingZone = ({ R1: arr1, R2: arr2 }) => {
    const valid = [];
    for (let i = 0; i < arr2.length; i++) {
        for (let j = 0; j < arr1.length; j++) {
            if (arr2[i] === arr1[j]) {
                valid.push(true);
            }
        }
    }
    if (valid.length === arr2.length) {
        return true;
    }
    return false;
};
exports.isValidLandingZone = isValidLandingZone;
exports.default = router;
//# sourceMappingURL=landing-zone.routes.js.map