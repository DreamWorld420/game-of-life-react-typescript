import React from "react";
import GameCell from "./GameCell";

interface IProps {
	grid: GameGrid;
	size: number;
	onCellClickHandler: (i: number, j: number) => void;
	isStarted: boolean;
}

const GameGrid: React.FC<IProps> = ({
	grid,
	size,
	onCellClickHandler,
	isStarted,
}) => {
	return (
		<div
			style={{
				display: "grid",
				gridTemplateColumns: `repeat(${size}, 1fr)`,
				// maxWidth: size * 15,
				// maxHeight: "100vh",
				// maxWidth: "100vw",
				// overflow: "scroll",
			}}
		>
			{grid.map((row, i) => {
				return row.map((cell, j) => {
					return (
						<React.Fragment key={cell.id}>
							<GameCell
								cell={cell}
								onCellClickHandler={onCellClickHandler}
								isStarted={isStarted}
							/>
						</React.Fragment>
					);
				});
			})}
		</div>
	);
};

export default GameGrid;
