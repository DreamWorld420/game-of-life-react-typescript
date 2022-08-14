import React, { useState } from "react";

import { produce } from "immer";
import { useInterval } from "react-use";

import GameGrid from "./GameGrid";

const createGrid = (gridSize: number) => {
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
						shouldBeAlive: false,
					};
				});
		});
};

const App: React.FC = () => {
	const [gridSize, setGridSize] = useState<number>(50);
	const [isStarted, setIsStarted] = useState<boolean>(false);
	const [intervalDelay, setIntervalDelay] = useState<number>(50);
	const [gameGrid, setGameGrid] = useState<GameGrid>(() =>
		createGrid(gridSize)
	);

	useInterval(
		() => {
			setGameGrid(
				produce((draft) => {
					const taskQueue: Task[] = [];

					draft.forEach((row, i) => {
						row.forEach((cell, j) => {
							cell.aliveNeighborsCount = 0;

							cell.aliveNeighborsCount += [
								i - 1 >= 0 && draft[i - 1][j].isAlive,
								i + 1 <= gridSize - 1 &&
									draft[i + 1][j].isAlive,
								j - 1 >= 0 && draft[i][j - 1].isAlive,
								j + 1 <= gridSize - 1 &&
									draft[i][j + 1].isAlive,
								i - 1 >= 0 &&
									j - 1 >= 0 &&
									draft[i - 1][j - 1].isAlive,
								i - 1 >= 0 &&
									j + 1 <= gridSize - 1 &&
									draft[i - 1][j + 1].isAlive,
								i + 1 <= gridSize - 1 &&
									j - 1 >= 0 &&
									draft[i + 1][j - 1].isAlive,
								i + 1 <= gridSize - 1 &&
									j + 1 <= gridSize - 1 &&
									draft[i + 1][j + 1].isAlive,
							].filter((value) => value).length;

							// Alive Checker
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
		</div>
	);
};

export default App;
