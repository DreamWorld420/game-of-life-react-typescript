import React, { useState } from "react";

import { produce } from "immer";
import { useInterval } from "react-use";
import {
	Box,
	Center,
	Button,
	ButtonGroup,
	StatGroup,
	Stat,
	StatLabel,
	StatNumber,
	Stack,
	Heading,
	HStack,
	Text,
	Badge,
	Link,
} from "@chakra-ui/react";
import {
	PlayArrowRounded,
	PauseRounded,
	StopRounded,
	GitHub,
	LinkedIn,
} from "@mui/icons-material";

import GameGrid from "./components/GameGrid";

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
	const [gridSize, setGridSize] = useState<number>(50);
	const [isStarted, setIsStarted] = useState<boolean>(false);
	const [intervalDelay, setIntervalDelay] = useState<number>(200);
	const [gameGrid, setGameGrid] = useState<GameGrid>(createGrid(gridSize));
	const [generation, setGeneration] = useState<number>(0);

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
					<Stack w="64">
						<Box
							borderWidth={1}
							padding={3}
							borderRadius="md"
							bgColor="purple.300"
							boxShadow="2xl"
							w="100%"
						>
							<Stack textColor="#1a202c">
								<Heading as="h1" size="sm">
									Conway's Game of Life
								</Heading>
								<Text fontSize="sm">
									Made by{" "}
									<Link
										href="https://github.com/DreamWorld420"
										isExternal
									>
										<strong>DreamWorld420</strong>
									</Link>
								</Text>
								<HStack>
									<Text fontSize="sm">with</Text>
									<Badge bgColor="#3178c6">
										<Link
											href="https://www.typescriptlang.org/"
											isExternal
										>
											Typescript
										</Link>
									</Badge>
									<Text fontSize="xs">+</Text>
									<Badge bgColor="#282c34">
										<Link
											href="https://reactjs.org/"
											isExternal
											textColor="#61dafb"
										>
											React
										</Link>
									</Badge>
								</HStack>
							</Stack>
						</Box>
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
							<StatGroup>
								<Stat>
									<StatLabel>Generation</StatLabel>
									<StatNumber>{generation}</StatNumber>
								</Stat>
							</StatGroup>
							<ButtonGroup
								mt="2"
								colorScheme="purple"
								variant="solid"
								w="full"
							>
								<Button
									onClick={() =>
										setIsStarted((prev) => !prev)
									}
									w="50%"
								>
									{!isStarted ? (
										<PlayArrowRounded />
									) : (
										<PauseRounded />
									)}
								</Button>
								<Button
									onClick={() => {
										setIsStarted(false);
										setGameGrid(createGrid(gridSize));
										setGeneration(0);
									}}
									w="50%"
								>
									<StopRounded />
								</Button>
							</ButtonGroup>
						</Box>
						<Box
							// borderWidth={1}
							// padding={1}
							// borderRadius="md"
							// bgColor="purple.300"
							// boxShadow="2xl"
							w="100%"
						>
							<ButtonGroup>
								<Link
									href="https://github.com/DreamWorld420"
									isExternal
								>
									<Button bgColor="#292e38">
										<GitHub />
									</Button>
								</Link>
								<Link
									href="https://www.linkedin.com/in/kasra-bozorgmehr-43a178239"
									isExternal
								>
									<Button bgColor="#0a66c2">
										<LinkedIn />
									</Button>
								</Link>
							</ButtonGroup>
						</Box>
					</Stack>
				</Box>
			</Center>
		</Box>
	);
};

export default App;
