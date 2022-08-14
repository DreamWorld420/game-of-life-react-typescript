import React, { useState } from "react";

import { produce } from "immer";
import { useInterval } from "react-use";

import GameGrid from "./GameGrid";

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

const mooreNeighborhood: [number, number][] = [
	[1, 0], // N
	[-1, 0], // S
	[0, 1], // E
	[0, -1], // W
	[1, 1], // NE
	[1, -1], // NW
	[-1, -1], // SW
	[-1, 1], // SE
];

const App: React.FC = () => {
	const [gridSize, setGridSize] = useState<number>(30);
	const [isStarted, setIsStarted] = useState<boolean>(false);
	const [intervalDelay, setIntervalDelay] = useState<number>(50);
	const [gameGrid, setGameGrid] = useState<GameGrid>(createGrid(gridSize));

	useInterval(
		() => {
			setGameGrid(
				produce((draft) => {
					const taskQueue: Task[] = [];

					draft.forEach((row, i) => {
						row.forEach((cell, j) => {
							cell.aliveNeighborsCount = 0;

							mooreNeighborhood.forEach(([y, x]) => {
								const neighborY = i + y;
								const neighborX = j + x;

								// Boundary checking
								if (
									neighborY <= gridSize - 1 &&
									neighborY >= 0 &&
									neighborX <= gridSize - 1 &&
									neighborX >= 0
								) {
									cell.aliveNeighborsCount += Number(
										draft[neighborY][neighborX].isAlive
									);
								}
							});

							// isAlive logic
							if (
								(!cell.isAlive &&
									cell.aliveNeighborsCount === 3) ||
								(cell.isAlive &&
									(cell.aliveNeighborsCount === 2 ||
										cell.aliveNeighborsCount === 3))
							) {
								taskQueue.push({ cell, shouldBeAlive: true });
							} else if (
								(cell.isAlive &&
									cell.aliveNeighborsCount < 2) ||
								(cell.isAlive && cell.aliveNeighborsCount > 3)
							) {
								taskQueue.push({
									cell,
									shouldBeAlive: false,
								});
							}
						});
					});

					taskQueue.forEach((task) => {
						draft[task.cell.i][task.cell.j].isAlive =
							task.shouldBeAlive;
					});
				})
			);
		},
		isStarted ? intervalDelay : null
	);

	const onClickHandler = (i: number, j: number) => {
		setGameGrid(
			produce((draft) => {
				draft[i][j].isAlive = !draft[i][j].isAlive;
			})
		);
	};

	return (
		<div>
			<GameGrid
				grid={gameGrid}
				size={gridSize}
				onCellClickHandler={onClickHandler}
				isStarted={isStarted}
			/>
			<button onClick={() => setIsStarted((prev) => !prev)}>
				{`${isStarted ? "Pause" : "Start"} The Game`}
			</button>
			<button
				onClick={() => {
					setIsStarted(false);
					setGameGrid(createGrid(gridSize));
				}}
			>
				Reset The Game
			</button>
		</div>
	);
};

export default App;
