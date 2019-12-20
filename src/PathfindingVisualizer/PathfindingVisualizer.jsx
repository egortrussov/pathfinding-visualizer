import React, { Component } from 'react'
import Node from './Node/Node'

// Algorightms
import { dijkstra, getNodesInShortestPathOrder } from '../algorithms/dijkstra'
import { generateSimpleGrid, generateSidewinderGrid } from '../algorithms/gridAlgorithms'

// CSS
import './PathfindingVisualizer.css'
import Navbar from './Navbar/Navbar'
import { astar } from '../algorithms/astar'
import { dfs } from '../algorithms/dfs'
import { getAllNodes } from '../algorithms/middleware'

const START_NODE_ROW = 15;
const START_NODE_COL = 9;
const FINISH_NODE_ROW = 15;
const FINISH_NODE_COL = 29;
const GRID_WIDTH = 41;
const GRID_HEIGHT = 31;

let newGrid = [];
let isMouseDown = false;

export default class PathfindingVisualizer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            grid: [],
            mouseIsPressed: false,
            walls: [],
            visitedNodes: [],
            speed: 10
        };
    }

    animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder) {
        const speed = this.state.speed;
        console.log(speed);
        
        for (let i = 0; i <= visitedNodesInOrder.length; i++) {
            if (i === visitedNodesInOrder.length) {
                setTimeout(() => {
                    this.animateShortestPath(nodesInShortestPathOrder);
                }, speed * i);
                return;
            }  
            setTimeout(() => {
                const node = visitedNodesInOrder[i];
                if (!(node.col === START_NODE_COL && node.row === START_NODE_ROW) && !(node.col === FINISH_NODE_COL && node.row === FINISH_NODE_ROW))
                    document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-visited is-animated';
                setTimeout(() => {
                    document.getElementById(`node-${node.row}-${node.col}`).classList.remove('is-animated');
                }, 1500)
                
                
                //console.log(node.col, node.row, newGrid[node.col][node.row]);
                
            }, speed * i)
        }
    }

    animateShortestPath(nodesInShortestPathOrder) {
        for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
            setTimeout(() => {
                const node = nodesInShortestPathOrder[i];
                if (!(node.col === START_NODE_COL && node.row === START_NODE_ROW) && !(node.col === FINISH_NODE_COL && node.row === FINISH_NODE_ROW))
                document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-is-path'
            }, i * this.state.speed)
        }
    }

    visualizeAlgorithm(algoType) {
        prepareGridForAlgorithm();
        this.clearPath();
        const grid = getGrid();
        console.log(grid === getGrid(), '4454545');
        
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        let visitedNodesInOrder;
        switch (algoType) {
            case 'dijkstra':
                visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
                break;
            case 'astar':
                visitedNodesInOrder = astar(grid, startNode, finishNode);
                break;
            case 'dfs':
                let gridd = getGrid();
                console.log(grid[0][0].isWall);
                visitedNodesInOrder = dfs(getGrid(), startNode, finishNode);
                break;
                
        
            default:
                break;
        }

        const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
        console.log(nodesInShortestPathOrder);
        
        this.animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder);
        
    }

    componentWillMount() {
        const grid = getInitialGrid();
        this.setState({ grid });
    }

    handleMouseDown(row, col) {
        setMouseState(true);
        const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
       // console.log(row, col);
        
        this.setState({
            mouseIsPressed: true
        })
    }

    handleMouseEnter(row, col) {
        if (!this.state.mouseIsPressed) return false;
        if (row === START_NODE_ROW && col === START_NODE_COL ||
            row === FINISH_NODE_ROW && col === FINISH_NODE_COL) return false;
        const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);   
    }

    clearGrid() {
        const grid = getInitialGrid();
        this.setState({ grid: grid });        
        
        for (let row = 0; row < GRID_HEIGHT; row++) 
            for (let col = 0; col < GRID_WIDTH; col++) {
                if (!(row === START_NODE_ROW && col === START_NODE_COL) && !(row === FINISH_NODE_ROW && col === FINISH_NODE_COL)) {
                    document.getElementById(`node-${ row }-${ col }`).className = 'node';
                }
            }
        clearNewGrid();
    }

    animateWalls(walls) {
        for (let i = 0; i < walls.length; i++) {
            let node = walls[i];
            setTimeout(() => {
                document.getElementById(`node-${ node.row }-${ node.col }`).className = 'node node-wall is-animated';
                
                setTimeout(() => {
                    document.getElementById(`node-${ node.row }-${ node.col }`).className = 'node node-wall';
                }, 1500)
            }, i * 15)
        }
    }

    clearPath() {
        prepareGridForAlgorithm();
        //this.setState({ grid: getGrid() });
        for (let row = 0; row < GRID_HEIGHT; row++) {
            for (let col = 0; col < GRID_WIDTH; col++) {
                document.getElementById(`node-${ row }-${ col }`).classList.remove('node-visited');
                document.getElementById(`node-${ row }-${ col }`).classList.remove('node-is-path');
            }
        }
    }

    generateGrid(gridType) {
        prepareGridForAlgorithm();
        this.clearGrid();
        this.clearPath();
        const grid = getInitialGrid();
        const { newGrid, walls } = generateSimpleGrid(grid, GRID_WIDTH - 1, GRID_HEIGHT - 1);
        this.animateWalls(walls);
        //console.log(walls);

        setNewGridState(newGrid);
        
        setTimeout(() => {
            this.setState({ grid: newGrid })
        }, walls.length * 15)

         //this.setState({ grid: newGrid })
    }

    generateSidewinderGrid() {
        this.clearGrid();
        this.clearPath();
        const grid  = getInitialGrid();
        const { newGrid, walls } = generateSidewinderGrid(grid, GRID_WIDTH - 1, GRID_HEIGHT - 1);

        this.animateWalls(walls);

        setNewGridState(newGrid);

        setTimeout(() => {
            this.setState({ grid: newGrid })
        }, walls.length * 15)
    }

    handleMouseUp() {
        setMouseState(false);
        console.log('The mouse is up!');
        
        this.setState({
            mouseIsPressed: false
        })
        const updatedGrid = getGrid();
        console.log(updatedGrid[0][0], "jjjjjjjjjjjj");
        
        this.setState({ grid: updatedGrid }, () => {
            console.log("UPDATED!!!")
            console.log(this.state.grid[0][0].isWall, getGrid()[0][0].isWall, updatedGrid[0][0].isWall);
               
        })
    }

    setAlgoSpeed(speed) {
        let speedValue;
        if (speed === 'fast') speedValue = 10;
            else if (speed === 'medium') speedValue = 15;
                else speedValue = 20;
        console.log(speedValue);
        
        this.setState({
            ...this.state,
            speed: speedValue
        })
    }

    render() {
        const { grid, mouseIsPressed } = this.state;

        return (
            <>
                <div onMouseOver={ () => {
                    console.log('Hello!');
                    
                    if (mouseIsPressed) 
                        this.handleMouseUp();
                    } } 
                    className="background"></div>
                <Navbar visualizeAlgorithm={ (algoType) => this.visualizeAlgorithm(algoType) }
                        generateGrid={ () => this.generateGrid() }
                        generateSidewinderGrid={ () => this.generateSidewinderGrid() }
                        clearGrid={ () => this.clearGrid() }
                        clearPath={ () => this.clearPath() }
                        setAlgoSpeed={ (speed) => this.setAlgoSpeed(speed) }></Navbar>
                <div className="grid">
                    {
                        grid.map((row, rowInd) => {
                            return (
                                <div key={ Math.random() } className="row">
                                    {
                                        row.map((node, nodeInd) => {
                                            const { isStart, isFinish, row, col, isWall, isVisited } = node;
                                            
                                            return (
                                                <Node key={ Math.random() }
                                                    isStart={ isStart }
                                                    isWall={ isWall }
                                                    isFinish={ isFinish }
                                                    isVisited={ isVisited }
                                                    mouseIsPressed = { mouseIsPressed }
                                                    onMouseDown={ (row, col) => this.handleMouseDown(row, col) }
                                                    onMouseEnter={ (row, col) => this.handleMouseEnter(row, col) }
                                                    onMouseUp={ () => this.handleMouseUp() }
                                                    row={ row }
                                                    col={ col }>
                                                </Node>
                                            )
                                        })
                                    }
                                </div>
                            )
                        })
                    }
                </div>
            </>
        )
    }
}

const getInitialGrid = () => {
    const grid = [];
    for (let row = 0; row < GRID_HEIGHT; row++) {
        const currentRow = [];
        for (let col = 0; col < GRID_WIDTH; col++) {
            currentRow.push(createNode(col, row));
        }
        grid.push(currentRow);
    }
    newGrid = grid;
    console.log(newGrid);
    
    return grid;
}

const createNode = (col, row) => {
    return {
        col,
        row,
        isStart: row === START_NODE_ROW && col === START_NODE_COL,
        isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
        distance: Infinity,
        isWeighted: false,
        isVisited: false,
        isWall: false,
        previousNode: null,
        gN: Infinity,
        hN: 0
    }
}

const getNewGridWithWallToggled = (grid, row, col) => {
    newGrid = grid.slice();
    const node = newGrid[row][col];
    
    if (!isMouseDown) return;
    if (node.isWall) 
        document.getElementById(`node-${ row }-${ col }`).className = 'node';
    else {
        document.getElementById(`node-${ row }-${ col }`).className = 'node node-wall';
    }
    const newNode = {
        ...node,
        isWall: !node.isWall,
    };
    
    newGrid[row][col] = newNode;
    return newGrid;
}

const getDistance = (x1, y1, x2, y2) => {
    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
} 

const prepareGridForAlgorithm = () => {    
    for (let row = 0; row < GRID_HEIGHT; row++) {
        for (let col = 0; col < GRID_WIDTH; col++) {
            newGrid[row][col] = {
                ...newGrid[row][col],
                isStart: row === START_NODE_ROW && col === START_NODE_COL,
                isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
                distance: Infinity,
                isWeighted: false,
                isVisited: false,
                previousNode: null,
                gN: Infinity,
                hN: 0
            }
        }
    }
}

const getGrid = () => {
    return newGrid;
}

const clearNewGrid = () => {
    newGrid = getInitialGrid();
}

const setNewGridState = (grid) => {
    newGrid = grid;
}

const setMouseState = (state) => {
    isMouseDown = state
} 

export {
    newGrid
};
