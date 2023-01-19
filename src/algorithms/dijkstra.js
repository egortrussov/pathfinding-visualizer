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
    let k = 0;
    while (currentNode !== null && k <= 2000 && !currentNode.isStart) {
      nodesInShortestPathOrder.unshift(currentNode);
      currentNode = currentNode.previousNode;
      k++;
    }
    return nodesInShortestPathOrder;
}
