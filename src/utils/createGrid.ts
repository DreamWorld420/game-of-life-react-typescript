const createGrid: (gridSize: number) => GameGrid = (gridSize: number) => {
	return Array(gridSize)
		.fill(null)
		.map((row, i) => {
			return Array(gridSize)
				.fill(null)
				.map((cell, j) => {
					return {
						id: `${i}-${j}`,
						isAlive: false,
						i,
						j,
						aliveNeighborsCount: 0,
					};
				});
		});
};

export default createGrid;
