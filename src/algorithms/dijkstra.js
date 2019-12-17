import { sortNodesByDistance, getAllNodes,  updateUnvisitedNeighborsForDijkstra } from './middleware';

export function dijkstra(grid, startNode, finishNode) {
    if (!startNode || !finishNode || startNode === finishNode) {
        return false;
    }
    const visitedNodesInOrder = [];
    startNode.distance = 0;
    const unvisitedNodes = getAllNodes(grid);
    while (!!unvisitedNodes.length) {
        sortNodesByDistance(unvisitedNodes);
        const closestNode = unvisitedNodes.shift();
        // We skip the walls
        if (closestNode.isWall) continue;
        if (closestNode.distance === Infinity) 
            return visitedNodesInOrder;
        closestNode.isVisited = true;
        visitedNodesInOrder.push(closestNode);
        if (closestNode === finishNode) 
            return visitedNodesInOrder;
        updateUnvisitedNeighborsForDijkstra(closestNode, grid);
    }
}

// Checking the shortest path

export function getNodesInShortestPathOrder(finishNode) {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
      nodesInShortestPathOrder.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
}