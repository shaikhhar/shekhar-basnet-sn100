"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPaths = void 0;
const getPaths = async () => {
    // Simulate api call
    return {
        A: { B: 5, C: 2 },
        B: { A: 1, D: 4, E: 2 },
        C: { B: 8, E: 7 },
        D: { E: 6, F: 3 },
        E: { F: 1 },
        F: {},
    };
};
exports.getPaths = getPaths;
//# sourceMappingURL=path-find.helpers.js.map