export function generateSimpleGrid(grid, width, height) {
    // Array for visualizing the creation of walls
    //let walls = []

    let { newGrid, walls } = prepareGrid(grid, width, height);
    grid = newGrid;  

    // Create random paths between cells
    for (let row = 1; row < height; row += 2) {
        for (let col = 1; col < width; col += 2) {
            const randomChoice = Math.ceil(Math.random() * 10) % 2; 
            // 0 for top, 1 for right
            if (row === 1 && col === width - 1) 
                continue;
            if (row === 1 || randomChoice && col !== width - 1) {
                const node = grid[row][col + 1];
                node.isWall = false;
                grid[row][col + 1] = node;
                // walls.push(grid[row - 1][col]);
            } else {
                const node = grid[row - 1][col];
                node.isWall = false;
                grid[row - 1][col] = node;
                // walls.push(grid[row][col + 1]);
            }
        }
    }
    for (let row = 1; row < height; row++)
        for (let col = 1; col < width; col++) 
            if (grid[row][col].isWall)
                walls.push(grid[row][col]);

    return { newGrid: grid, walls: walls };
}

export function generateSidewinderGrid(grid, width, height) {
    let { newGrid, walls } = prepareGrid(grid, width, height);
    grid = newGrid;

    let setStart = 1;
    for (let row = 1; row < height; row += 2) {
        for (let col = 1; col < width; col += 2) {
            if (row !== 1) {
                const randomChoice = Math.ceil(Math.random() * 10) % 2; // 0 or 1 only
                if (!randomChoice && col !== width - 1) 
                    grid[row][col + 1].isWall = false;
                else {
                    let selectedColumn = Math.ceil(Math.random() * (setStart - col + 1)) + col;
                    selectedColumn += selectedColumn % 2 === 0;
                    console.log(selectedColumn);
                    
                    grid[row - 1][selectedColumn].isWall = false;

                    if (col !== width - 1) 
                        setStart = col + 1;
                    else 
                        setStart = 1;
                }
            } else {
                if (col !== width - 1) 
                    grid[row][col + 1].isWall = false;
            }
        }
    }

    for (let row = 1; row < height; row++)
        for (let col = 1; col < width; col++) 
            if (grid[row][col].isWall)
                walls.push(grid[row][col]);

    return { newGrid: grid, walls: walls };
}

function prepareGrid(grid, width, height) {
    let walls = [];

    // Set walls around the grid
    for (let row = 0; row <= height; row++) { 
        const nodeLeft = grid[row][0],
            nodeRight = grid[row][width];
        nodeLeft.isWall = true;
        nodeRight.isWall = true;
        grid[row][0] = nodeLeft;
        grid[row][width] = nodeRight;
        walls.push(grid[row][0]);
        walls.push(grid[row][width]);
    }
    for (let col = 0; col <= width; col++) { 
        const nodeTop = grid[0][col],
            nodeBottom = grid[height][col];
        nodeTop.isWall = true;
        nodeBottom.isWall = true;
        grid[0][col] = nodeTop;
        grid[height][col] = nodeBottom;
        walls.push(grid[0][col]);
        walls.push(grid[height][col]);
    }

    // Set all even cols and rows
    for (let row = 2; row <= height; row += 2) 
        for (let col = 1; col <= width; col++) {
            const node = grid[row][col];
            node.isWall = true;
            grid[row][col] = node;
            //walls.push(node)
        }
    for (let col = 2; col <= width; col += 2) 
        for (let row = 1; row <= height; row++) {
            const node = grid[row][col];
            node.isWall = true;
            grid[row][col] = node;
            //walls.push(node)
        }
    
    return { newGrid: grid, walls: walls };
}