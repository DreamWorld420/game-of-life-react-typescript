import React from "react";
import {
	Box,
	Stack,
	Heading,
	Text,
	Link,
	HStack,
	Badge,
} from "@chakra-ui/react";

const ProjectInfo: React.FC = () => {
	return (
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
					<Link href="https://github.com/DreamWorld420" isExternal>
						<strong>DreamWorld420</strong>
					</Link>
				</Text>
				<HStack>
					<Text fontSize="sm">with</Text>
					<Badge bgColor="#3178c6">
						<Link href="https://www.typescriptlang.org/" isExternal>
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
	);
};

export default ProjectInfo;
