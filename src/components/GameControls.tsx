import React from "react";
import { ButtonGroup, Button } from "@chakra-ui/react";
import {
	PlayArrowRounded,
	PauseRounded,
	StopRounded,
} from "@mui/icons-material";

interface IProps {
	isStarted: boolean;
	playOnClick: React.MouseEventHandler<HTMLButtonElement>;
	stopOnClick: React.MouseEventHandler<HTMLButtonElement>;
}

const GameControls: React.FC<IProps> = ({
	playOnClick,
	stopOnClick,
	isStarted,
}) => {
	return (
		<ButtonGroup mt="2" colorScheme="purple" variant="solid" w="full">
			<Button onClick={playOnClick} w="50%">
				{!isStarted ? <PlayArrowRounded /> : <PauseRounded />}
			</Button>
			<Button onClick={stopOnClick} w="50%">
				<StopRounded />
			</Button>
		</ButtonGroup>
	);
};

export default GameControls;
