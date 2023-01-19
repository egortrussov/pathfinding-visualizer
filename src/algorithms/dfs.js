import { getUnvisitedNeighbors, getAllNodes } from "./middleware";

var visitedNodesInOrder = [];
var grid;
var isFound = false;

function dfsBuilder(startNode, finishNode, currentNode) {
    if (isFound || currentNode.isWall) return ;
    
    if (currentNode === finishNode) {
        isFound = true;
        return ;
    } 
    if (currentNode !== startNode) {
        visitedNodesInOrder.push(currentNode);
    }
        
    let neighbors = getUnvisitedNeighbors(currentNode, grid);
    
    for (let neighbor of neighbors) {              
        if (neighbor.isWall || neighbor.isVisited) continue;
        neighbor.isVisited = true;
        neighbor.previousNode = currentNode;
        
        grid[neighbor.row][neighbor.col].isVisited = true;
        grid[neighbor.row][neighbor.col].previousNode = currentNode;
        dfsBuilder(startNode, finishNode, neighbor);
    }

    return;
}

export function dfs(grid1, startNode, finishNode) {
    grid = grid1;
    isFound = false;
    visitedNodesInOrder = [];
     
    dfsBuilder(startNode, finishNode, startNode);
    return visitedNodesInOrder;
}