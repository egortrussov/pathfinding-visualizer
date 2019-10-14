import React, { Component } from 'react'
import Node from './Node/Node'

// Algorightms
import { dijkstra, getNodesInShortestPathOrder } from '../algorithms/dijkstra'

// CSS
import './PathfindingVisualizer.css'

const START_NODE_ROW = 0;
const START_NODE_COL = 0;
const FINISH_NODE_ROW = 29;
const FINISH_NODE_COL = 39;

let newGrid;

export default class PathfindingVisualizer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            grid: [],
            mouseIsPressed: false
        };
    }

    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
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
                    document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-visited';
                
                
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

    visualizeDijkstra() {
        const { grid } = this.state;
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
        const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
        this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
        console.log(visitedNodesInOrder);
        
    }

    componentWillMount() {
        const grid = getInitialGrid();
        this.setState({ grid });
    }

    handleMouseDown(row, col) {
        const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
       // console.log(row, col);
        
        this.setState({
            mouseIsPressed: true
        })
    }

    handleMouseEnter(row, col) {
        if (!this.state.mouseIsPressed) return false;
        const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
        // this.setState({
        //     grid: newGrid
        // })
        //console.log(this.state.mouseIsPressed);
        
        //document.getElementById(`node-${ row }-${ col }`).className = 'node node-wall'
        
    }

    handleMouseUp() {
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
                <button onClick={ () => this.visualizeDijkstra() }>Visualize Dijkstras algorithm!</button>
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
    for (let row = 0; row < 30; row++) {
        const currentRow = [];
        for (let col = 0; col < 40; col++) {
            currentRow.push(createNode(col, row));
        }
        grid.push(currentRow);
    }
    return grid;
}

const createNode = (col, row) => {
    return {
        col,
        row,
        isStart: row === START_NODE_ROW && col === START_NODE_COL,
        isFinish: row == FINISH_NODE_ROW && col === FINISH_NODE_COL,
        distance: Infinity,
        isVisited: false,
        isWall: false,
        previousNode: null
    }
}

const getNewGridWithWallToggled = (grid, row, col) => {
    newGrid = grid.slice();
    const node = newGrid[row][col];
    if (node.isWall) 
        document.getElementById(`node-${ row }-${ col }`).className = 'node';
    else 
        document.getElementById(`node-${ row }-${ col }`).className = 'node node-wall'
    const newNode = {
        ...node,
        isWall: !node.isWall,
    };
    //console.log(newNode.isWall);
    
    newGrid[row][col] = newNode;
    document.getElementById(`node-${ row }-${ col }`).className = 'node node-wall'
    return newGrid;
}

const getGrid = () => {
    return newGrid;
}
