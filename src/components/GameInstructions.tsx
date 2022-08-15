import React from "react";
import { Box, OrderedList, ListItem } from "@chakra-ui/react";

const GameInstructions: React.FC = () => {
	return (
		<Box
			borderWidth={1}
			padding={3}
			borderRadius="md"
			bgColor="purple.300"
			boxShadow="2xl"
			textColor="#1a202c"
		>
			<OrderedList fontSize={"sm"} spacing={"2"}>
				<ListItem>Click on any cell to make it alive</ListItem>
				<ListItem>Click on play button to start the game</ListItem>
				<ListItem>Watch and enjoy 😊</ListItem>
			</OrderedList>
		</Box>
	);
};

export default GameInstructions;
