"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const path_find_types_1 = require("src/types/path-find.types");
const constants_1 = require("src/utils/constants");
const path_find_helpers_1 = require("src/utils/path-find.helpers");
const validation_1 = require("src/utils/validation");
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    res.send(`After figuring out the correct landing zone, ${constants_1.drone} needs to figure out the shortest path to get there.

It is guided by satellite S1, telling it the different paths it can take to the landing zone and the distance between each.

Currently, the API doesn't finish and overloads the server. We're cheap, so we don't want to allocate bigger resources for this.

So your task is to update the API to correctly return the shortest path between the starting and ending coordinates provided.

The API accepts a start and end value, with both being values that represent a valid point on the map (A, B, C,... F).
It should then return the shortest path between the start and end points in the form of an array that represents the order of the path that ${constants_1.drone} should take and the total distance.`);
});
router.post('/', (0, validation_1.validate)((0, express_validator_1.body)(['start', 'end'], 'Not a valid point').isIn(Object.values(path_find_types_1.EPoint))), async (req, res) => {
    const { start, end } = req.body;
    const paths = await (0, path_find_helpers_1.getPaths)();
    const path = findShortestPath(paths, start, end);
    res.status(200).send(path);
});
const findShortestPath = (paths, startNode, endNode) => {
    // track distances from the start node using a hash object
    let distances = {};
    distances[endNode] = Infinity;
    distances = Object.assign(distances, paths[startNode]);
    // track paths using a hash object
    const parents = { [endNode]: null };
    for (const child in paths[startNode]) {
        parents[child] = startNode;
    }
    // collect visited nodes
    const visited = [];
    // find the nearest node
    let node = shortestDistanceNode(distances, visited);
    // for that node:
    while (node) {
        // find its distance from the start node & its child nodes
        const distance = distances[node];
        const children = paths[node];
        // for each of those child nodes:
        for (const child in children) {
            // save the distance from the start node to the child node
            const newdistance = distance + children[child];
            // if there's no recorded distance from the start node to the child node in the distances object
            // or if the recorded distance is shorter than the previously stored distance from the start node to the child node
            if (!distances[child] || distances[child] > newdistance) {
                // save the distance to the object
                distances[child] = newdistance;
                // record the path
                parents[child] = node;
            }
        }
        // move the current node to the visited set
        visited.push(node);
        // move to the nearest neighbor node
        node = shortestDistanceNode(distances, visited);
    }
    // using the stored paths from start node to end node
    // record the shortest path
    const shortestPath = [endNode];
    let parent = parents[endNode];
    while (parent) {
        shortestPath.push(parent);
        parent = parents[parent];
    }
    shortestPath.reverse();
    //this is the shortest path
    const results = {
        distance: distances[endNode],
        path: shortestPath,
    };
    // return the shortest path & the end node's distance from the start node
    return results;
};
const shortestDistanceNode = (distances, visited) => {
    // create a default value for shortest
    let shortest = null;
    // for each node in the distances object
    for (const node in distances) {
        // if no node has been assigned to shortest yet
        // or if the current node's distance is smaller than the current shortest
        const currentIsShortest = shortest === null || distances[node] < distances[shortest];
        // and if the current node is in the unvisited set
        if (currentIsShortest && !visited.includes(node)) {
            // update shortest to be the current node
            shortest = node;
        }
    }
    return shortest;
};
exports.default = router;
//# sourceMappingURL=path-find.routes.js.map