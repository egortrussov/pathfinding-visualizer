import { sortNodesByDistance, getAllNodes,  updateUnvisitedNeighborsForDijkstra, getUnvisitedNeighbors } from './middleware';

export function bfs(grid, startNode, finishNode) {
    if (!startNode || !finishNode || startNode === finishNode) {
        return false;
    }
    const visitedNodesInOrder = [];
    startNode.distance = 0;
    let  unvisitedNodes = [startNode];
    let k = 0
    while (!!unvisitedNodes.length && k <= 1500) {
        k++;
        const closestNode = unvisitedNodes.shift();
        // We skip the walls
        if (closestNode.isWall) continue;
        if (closestNode.distance === Infinity) 
            return visitedNodesInOrder;
        const neighbors = getUnvisitedNeighbors(closestNode, grid);
        for (let neighbor of neighbors) {
            unvisitedNodes.push(neighbor);
        }
        unvisitedNodes = unvisitedNodes.filter((node) => !node.isVisited);
        if (!closestNode.isStart)
            closestNode.isVisited = true;
        visitedNodesInOrder.push(closestNode);
        if (closestNode === finishNode) 
            return visitedNodesInOrder;
        updateUnvisitedNeighborsForDijkstra(closestNode, grid);
    }
    return visitedNodesInOrder;
}
