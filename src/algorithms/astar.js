import { sortNodesByDistance, sortNodesByDistanceForAstar, getAllNodes,  updateUnvisitedNeighborsForAstar } from './middleware';

export function astar(grid, startNode, finishNode) {
    if (!startNode || !finishNode || startNode === finishNode) {
        return false;
    }
    
    const visitedNodesInOrder = [];
    startNode.distance = 0;
    startNode.gN = 0;
    const unvisitedNodes = getAllNodes(grid);
    while (!!unvisitedNodes.length) {
        sortNodesByDistanceForAstar(unvisitedNodes);
        const closestNode = unvisitedNodes.shift();
        // We skip the walls
        if (closestNode.isWall) continue;
        if (closestNode.distance === Infinity) 
            return visitedNodesInOrder;
        closestNode.isVisited = true;
        visitedNodesInOrder.push(closestNode);
        if (closestNode === finishNode) 
            return visitedNodesInOrder;
        updateUnvisitedNeighborsForAstar(closestNode, grid, finishNode);
    }
}

export function getNodesInShortestPathOrder(finishNode) {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
      nodesInShortestPathOrder.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
}