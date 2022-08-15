import React from "react";
import { Box, ButtonGroup, Link, Button } from "@chakra-ui/react";
import { GitHub, LinkedIn } from "@mui/icons-material";

const SocialLinks: React.FC = () => {
	return (
		<Box w="100%">
			<ButtonGroup>
				<Link href="https://github.com/DreamWorld420" isExternal>
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
	);
};

export default SocialLinks;
