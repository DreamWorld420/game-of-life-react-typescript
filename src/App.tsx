import React, { useState } from "react";

import { produce } from "immer";
import { useInterval } from "react-use";
import { Box, Center, Stack } from "@chakra-ui/react";

import GameGrid from "./components/GameGrid";
import SocialLinks from "./components/SocialLinks";
import GameStat from "./components/GameStat";
import GameControls from "./components/GameControls";
import ProjectInfo from "./components/ProjectInfo";
import GameInstructions from "./components/GameInstructions";

import createGrid from "./utils/createGrid";

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
	const [gridSize, setGridSize] = useState<number>(50);
	const [isStarted, setIsStarted] = useState<boolean>(false);
	const [intervalDelay, setIntervalDelay] = useState<number>(200);
	const [gameGrid, setGameGrid] = useState<GameGrid>(createGrid(gridSize));
	const [generation, setGeneration] = useState<number>(0);

	useInterval(
		() => {
			setGameGrid(
				produce((draft) => {
					// change task queue
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
			setGeneration((prev) => ++prev);
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
		<Box
			backgroundColor="#1a202c"
			display="flex"
			flexDirection="column"
			justifyContent="center"
			alignItems="center"
			height="100vh"
		>
			<Center>
				<GameGrid
					grid={gameGrid}
					size={gridSize}
					onCellClickHandler={onClickHandler}
					isStarted={isStarted}
				/>
				<Box position="fixed" top="4" left="4">
					<Stack w="72">
						<ProjectInfo />
						<Box
							borderWidth={1}
							padding={3}
							borderRadius="md"
							borderColor="purple.300"
							boxShadow="2xl"
							h="100%"
							display="flex"
							flexDirection="column"
							justifyContent="space-between"
						>
							<GameStat generation={generation} />
							<GameControls
								isStarted={isStarted}
								playOnClick={() => {
									setIsStarted((prev) => !prev);
								}}
								stopOnClick={() => {
									setIsStarted(false);
									setGameGrid(createGrid(gridSize));
									setGeneration(0);
								}}
							/>
						</Box>
						<GameInstructions />
						<SocialLinks />
					</Stack>
				</Box>
			</Center>
		</Box>
	);
};

export default App;
