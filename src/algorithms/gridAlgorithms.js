export function generateSimpleGrid(grid, width, height) {
    // Set walls around the grid
    for (let row = 0; row <= height; row++) { 
        const nodeLeft = grid[row][0],
            nodeRight = grid[row][width];
        nodeLeft.isWall = true;
        nodeRight.isWall = true;
        grid[row][0] = nodeLeft;
        grid[row][width] = nodeRight;
    }
    for (let col = 0; col <= width; col++) { 
        const nodeTop = grid[0][col],
            nodeBottom = grid[height][col];
        nodeTop.isWall = true;
        nodeBottom.isWall = true;
        grid[0][col] = nodeTop;
        grid[height][col] = nodeBottom;
    }

    // Set all even cols and rows
    for (let row = 2; row <= height; row += 2) 
        for (let col = 1; col <= width; col++) {
            const node = grid[row][col];
            node.isWall = true;
            grid[row][col] = node;
        }
    for (let col = 2; col <= width; col += 2) 
        for (let row = 1; row <= height; row++) {
            const node = grid[row][col];
            node.isWall = true;
            grid[row][col] = node;
        }

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
            } else {
                const node = grid[row - 1][col];
                node.isWall = false;
                grid[row - 1][col] = node;
            }
        }
    }

    return grid;
}