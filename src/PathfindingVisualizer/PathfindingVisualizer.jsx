import React, { Component } from 'react'
import Node from './Node/Node'

// Algorightms
import { dijkstra, getNodesInShortestPathOrder } from '../algorithms/dijkstra'
import { generateSimpleGrid, generateSidewinderGrid } from '../algorithms/gridAlgorithms'

// CSS
import './PathfindingVisualizer.css'
import Navbar from './Navbar/Navbar'

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
            visitedNodes: []
        };
    }

    animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder) {
        for (let i = 0; i <= visitedNodesInOrder.length; i++) {
            if (i === visitedNodesInOrder.length) {
                setTimeout(() => {
                    this.animateShortestPath(nodesInShortestPathOrder);
                }, 10 * i);
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
                
            }, 10 * i)
        }
    }

    animateShortestPath(nodesInShortestPathOrder) {
        for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
            setTimeout(() => {
                const node = nodesInShortestPathOrder[i];
                if (!(node.col === START_NODE_COL && node.row === START_NODE_ROW) && !(node.col === FINISH_NODE_COL && node.row === FINISH_NODE_ROW))
                document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-is-path'
            }, i * 10)
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
        
            default:
                break;
        }

        const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
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
        this.setState({ grid });        
        
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
        //prepareGridForAlgorithm();
        this.clearGrid();
        this.clearPath();
        const { grid } = this.state;
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
        const { grid } = this.state;
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
        this.setState({ grid: updatedGrid })
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
                        clearPath={ () => this.clearPath() }></Navbar>
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
        previousNode: null
    }
}

const getNewGridWithWallToggled = (grid, row, col) => {
    newGrid = grid.slice();
    const node = newGrid[row][col];
    //console.log(isMouseDown);
    
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
    //console.log(newNode.isWall);
    
    newGrid[row][col] = newNode;
    //console.log(newGrid[row][col].isWall);
    
    //document.getElementById(`node-${ row }-${ col }`).className = 'node node-wall'
    return newGrid;
}

const prepareGridForAlgorithm = () => {
    console.log(newGrid);
    
    for (let row = 0; row < GRID_HEIGHT; row++) {
        for (let col = 0; col < GRID_WIDTH; col++) {
            newGrid[row][col].isVisited = false;
            newGrid[row][col].distance = Infinity;
            newGrid[row][col].previousNode = null;
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
