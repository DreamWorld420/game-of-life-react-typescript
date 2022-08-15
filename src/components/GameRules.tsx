import React from "react";
import { Box, OrderedList, ListItem, Heading } from "@chakra-ui/react";

const GameRules: React.FC = () => {
	return (
		<Box
			borderWidth={1}
			padding={3}
			borderRadius="md"
			bgColor="purple.300"
			boxShadow="2xl"
			textColor="#1a202c"
		>
			<Heading size={"sm"}>Game Rules</Heading>
			<OrderedList fontSize={"xs"} spacing={"2"} mt={2}>
				<ListItem>
					Any live cell with fewer than two live neighbors dies, as if
					by underpopulation.
				</ListItem>
				<ListItem>
					Any live cell with two or three live neighbors lives on to
					the next generation.
				</ListItem>
				<ListItem>
					Any live cell with more than three live neighbors dies, as
					if by overpopulation.
				</ListItem>
				<ListItem>
					Any dead cell with exactly three live neighbours becomes a
					live cell, as if by reproduction.
				</ListItem>
			</OrderedList>
		</Box>
	);
};

export default GameRules;
