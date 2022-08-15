import React from "react";
import { StatGroup, Stat, StatLabel, StatNumber } from "@chakra-ui/react";

interface IProps {
	generation: number;
}

const GameStat: React.FC<IProps> = ({ generation }) => {
	return (
		<StatGroup>
			<Stat>
				<StatLabel>Generation</StatLabel>
				<StatNumber>{generation}</StatNumber>
			</Stat>
		</StatGroup>
	);
};

export default GameStat;
