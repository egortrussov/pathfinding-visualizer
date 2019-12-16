function sortNodesByDistance(unvisitedNodes) {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function getDistanceToFinishNode(node, finishNode) {
    console.log(finishNode, node);
    
    return Math.abs(finishNode.col - node.col) + Math.abs(finishNode.row - node.row);
}

function updateUnvisitedNeighborsForAstar(node, grid, finishNode) {
    const neighbors = getUnvisitedNeighbors(node, grid);
    console.log('Neighbors: ', neighbors);
    
    for (const neighbor of neighbors) {
        neighbor.gN = node.gN + 1;
        neighbor.hN = getDistanceToFinishNode(neighbor, finishNode);
        neighbor.distance = neighbor.gN + neighbor.hN;
        neighbor.previousNode = node;
    }
}

function updateUnvisitedNeighborsForDijkstra(node, grid, finishNode) {
    const neighbors = getUnvisitedNeighbors(node, grid);
    console.log('Neighbors: ', neighbors);
    
    for (const neighbor of neighbors) {
        neighbor.distance = node.distance + 1;
        neighbor.previousNode = node;
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