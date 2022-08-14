import React from "react";

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
			key={cell.id}
			style={{
				height: 15,
				width: 15,
				border: "1px solid black",
				backgroundColor: cell.isAlive ? "black" : "transparent",
			}}
			onClick={
				!isStarted
					? () => onCellClickHandler(cell.i, cell.j)
					: undefined
			}
		/>
	);
};

export default GameCell;