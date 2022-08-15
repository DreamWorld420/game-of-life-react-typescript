import React from "react";

import { Button } from "@chakra-ui/react";

interface IProps {
	cell: GameCell;
	onCellClickHandler: (i: number, j: number) => void;
	isStarted: boolean;
}

const GameCell: React.FC<IProps> = ({
	cell,
	onCellClickHandler,
	isStarted,
}) => {
	return (
		<button
			style={{
				// borderRadius: "25%",
				backgroundColor: cell.isAlive ? "black" : "gray",
				width: 12,
				height: 12,
				margin: 0.5,
			}}
			key={cell.id}
			onClick={
				!isStarted
					? () => {
							onCellClickHandler(cell.i, cell.j);
					  }
					: undefined
			}
			onMouseEnter={
				!isStarted
					? (e) => {
							if (e.button === 0 && e.buttons > 0) {
								onCellClickHandler(cell.i, cell.j);
							}
					  }
					: undefined
			}
		/>
	);
};

export default GameCell;
