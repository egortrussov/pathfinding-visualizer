function sortNodesByDistance(unvisitedNodes) {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function sortNodesByDistanceForAstar(unvisitedNodes) {
    // let currentClosest, index;
    // for (let i = 0; i < unvisitedNodes.length; i++) {
    //     if (!currentClosest || currentClosest.distance > nodes[unvisitedNodes[i]].distance) {
    //     currentClosest = nodes[unvisitedNodes[i]];
    //     index = i;
    //     } else if (currentClosest.distance === nodes[unvisitedNodes[i]].distance) {
    //     if (currentClosest.gN > nodes[unvisitedNodes[i]].gN) {
    //         currentClosest = nodes[unvisitedNodes[i]];
    //         index = i;
    //     }
    //     }
    // }
    // unvisitedNodes.splice(index, 1);
    // return currentClosest;

    unvisitedNodes.sort((nodeA, nodeB) => {
        
        if (nodeA.distance == nodeB.distance && nodeA.distance !== Infinity) {
            return nodeA.hN - nodeB.hN;
        }
        else 
            return nodeA.distance - nodeB.distance;
    });
}

function getDistanceToFinishNode(node, finishNode) {
    console.log(finishNode, node);
    
    return Math.abs(finishNode.col - node.col) + Math.abs(finishNode.row - node.row);
}

function updateUnvisitedNeighborsForAstar(node, grid, finishNode) {
    let neighbors = getUnvisitedNeighbors(node, grid);
    
    for (const neighbor of neighbors) {
        neighbor.gN = node.gN + 1;
        neighbor.hN = getDistanceToFinishNode(neighbor, finishNode);
        neighbor.distance = neighbor.gN + neighbor.hN;
        neighbor.previousNode = node;
    }
}

function updateUnvisitedNeighborsForDijkstra(node, grid, finishNode) {
    const neighbors = getUnvisitedNeighbors(node, grid);
    
    for (const neighbor of neighbors) {
        neighbor.distance = node.distance + 1;
        neighbor.previousNode = node;
        grid[neighbor.row][neighbor.col] = neighbor;
    }
}

function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const { col, row } = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors.filter(neighbor => !neighbor.isVisited);
}

function getAllNodes(grid) {
    const nodes = [];
    for (const row of grid) 
        for (const node of row) 
            nodes.push(node);
    return nodes;
}

export {
    sortNodesByDistance,
    sortNodesByDistanceForAstar,
    getDistanceToFinishNode,
    updateUnvisitedNeighborsForAstar,
    updateUnvisitedNeighborsForDijkstra,
    getUnvisitedNeighbors,
    getAllNodes
};

// exports.sortNodesByDistance = sortNodesByDistance;
// exports.getDistanceToFinishNode = getDistanceToFinishNode;
// exports.updateUnvisitedNeighbors = updateUnvisitedNeighbors;
// exports.getUnvisitedNeighbors = getUnvisitedNeighbors;
// exports.getAllNodes = getAllNodes;