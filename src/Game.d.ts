interface GameCell {
	id: string;
	isAlive: boolean;
	i: number;
	j: number;
	aliveNeighborsCount: number;
}

type GameGrid = GameCell[][];

interface Task {
	cell: GameCell;
	shouldBeAlive: boolean;
}
