interface ArrangeHeightBalanceArgs<T extends { height: number }> {
	items: T[];
	columnCount?: number;
	gap?: number;
	colWidth?: number;
	columnHeights?: number[];
}

export const arrangeHeightBalance = <T extends { height: number }>({
	items,
	columnCount = 3,
	gap = 10,
	colWidth = 120,
	columnHeights = Array<number>(columnCount).fill(0),
}: ArrangeHeightBalanceArgs<T>): Array<
	T & { top: number; left: number; width: number }
> => {
	// For each item, add the position data.
	return items.map((item) => {
		const height = item.height / 20;
		// Find the shortest column.
		const shortestCol = columnHeights.indexOf(Math.min(...columnHeights));

		// Calculate the `left` value of the current item.
		const left = shortestCol * colWidth + shortestCol * gap;
		// Calculate the `top` value of the current item.
		const top: number = gap + columnHeights[shortestCol];
		// Update the column height.
		columnHeights[shortestCol] = top + height;

		return {
			...item,
			left,
			top,
			height,
			width: colWidth,
		};
	});
};
