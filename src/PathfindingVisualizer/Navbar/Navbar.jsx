import React, { Component } from 'react'

import './Navbar.css'

class Navbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedAlgorithm: '',
            btnErrorMessage: '',
            selectedSpeed: 'fast'
        }
    }

    handlePopout(type) {
        document.getElementById(`${ type }-popout`).classList.toggle("active");
        document.getElementById(`${ type }-btn`).classList.toggle("active");

        switch (type) {
            case 'algo':
                document.getElementById(`grid-popout`).classList.remove("active");
                document.getElementById(`grid-btn`).classList.remove("active");
                document.getElementById(`speed-btn`).classList.remove("active");
                document.getElementById(`speed-popout`).classList.remove("active");
                break;
            case 'grid':
                document.getElementById(`algo-popout`).classList.remove("active");
                document.getElementById(`algo-btn`).classList.remove("active");
                document.getElementById(`speed-btn`).classList.remove("active");
                document.getElementById(`speed-popout`).classList.remove("active");
                break;
            case 'speed':
                document.getElementById(`algo-popout`).classList.remove("active");
                document.getElementById(`algo-btn`).classList.remove("active");
                document.getElementById(`grid-popout`).classList.remove("active");
                document.getElementById(`grid-btn`).classList.remove("active");
                break;

            default:
                break;
        }
    }

    setSpeed(speed) {
        this.setState({
            ...this.state,
            selectedSpeed: speed
        })
        this.props.setAlgoSpeed(speed);
    } 

    runVisualizer() {
        if (!this.state.selectedAlgorithm) {
            this.setState({ btnErrorMessage: 'Pick an algorithm!' })
        } else {
            this.props.visualizeAlgorithm(this.state.selectedAlgorithm);
        }
    }

    render() {
        const { generateGrid,
                generateSidewinderGrid,
                clearGrid,
                clearPath } = this.props;

        return (
            <nav>
                <div className="wrapper">
                    <div className="nav-logo">
                        Pathfinding visualizer
                    </div>
                    <div className="nav-btns">
                        <div className="btns-left">
                            <button onClick={ () => this.handlePopout('algo') } id="algo-btn">Pick an algorithm
                                <div className="popout algo-popout" id="algo-popout">
                                    <button onClick={ () => this.setState({ selectedAlgorithm: 'dijkstra', btnErrorMessage: '' })
                                        }>Dijkstra</button>
                                    <button onClick={ () => this.setState({ selectedAlgorithm: 'astar', btnErrorMessage: '' }) }>A*</button>
                                    <button onClick={ () => this.setState({ selectedAlgorithm: 'dfs', btnErrorMessage: '' }) }>DFS</button>
                                    <button>Dijkstra</button>
                                    <button>Dijkstra</button>
                                </div>
                            </button>
                            <button onClick={ ()=> this.handlePopout('grid') } id="grid-btn">Mazes & Patterns
                                <div className="popout grid-popout" id="grid-popout">
                                    <button onClick={ () => generateGrid() }>Simple grid</button>
                                    <a onClick={ () => generateSidewinderGrid() }>Sidewinder Grid</a>
                                </div>
                            </button>
                            <button>Add bomb</button>
                        </div>
                        <div className="btns-middle" >
                            <button onClick={ () => this.runVisualizer() } className="cta">
                                { this.state.btnErrorMessage ? this.state.btnErrorMessage : `Visualize${ this.state.selectedAlgorithm ? ' ' : '' }${ this.state.selectedAlgorithm }!`
                                }

                                
                            </button>
                        </div>
                        <div className="btns-right">
                            <button onClick={ () => clearGrid() }>Clear grid</button>
                            <button onClick={ () => clearPath() }>Clear path</button>
                            <button onClick={ () => this.handlePopout('speed') } id="speed-btn">Speed: { this.state.selectedSpeed }
                                <div className="popout speed-popout" id="speed-popout">
                                    <button onClick={ () => this.setSpeed('fast') }>Fast</button>
                                    <button onClick={ () => this.setSpeed('medium') }>Medium</button>
                                    <button onClick={ () => this.setSpeed('slow') }>Slow</button>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="nav-right">
                    Check me on github!
                </div>
            </nav>
        )
    }
}

export default Navbar
