import { arrangeHeightBalance } from './arrange-height-balance-pins';

describe('arrangeHeightBalance', () => {
	const sampleItems = [
		{ id: 1, height: 200 },
		{ id: 2, height: 300 },
		{ id: 3, height: 250 },
		{ id: 4, height: 180 },
		{ id: 5, height: 220 },
	];

	it('should arrange items with default parameters', () => {
		const result = arrangeHeightBalance({ items: sampleItems });

		expect(result).toHaveLength(sampleItems.length);

		// Check if all items have required properties
		result.forEach((item) => {
			expect(item).toHaveProperty('top');
			expect(item).toHaveProperty('left');
			expect(item).toHaveProperty('width');
			expect(item).toHaveProperty('height');
		});

		expect(result[0].width).toBe(120);
	});

	it('should respect custom column count', () => {
		const columnCount = 2;
		const result = arrangeHeightBalance({
			items: sampleItems,
			columnCount,
		});

		// Calculate maximum left position
		const maxLeft = Math.max(...result.map((item) => item.left));

		// For 2 columns, the maximum left position should be (columnCount - 1) * (colWidth + gap)
		expect(maxLeft).toBe((columnCount - 1) * (120 + 10));
	});

	it('should apply custom gap', () => {
		const gap = 20;
		const result = arrangeHeightBalance({
			items: sampleItems,
			gap,
		});

		const firstColumnItems = result.filter((item) => item.left === 0);
		if (firstColumnItems.length > 1) {
			const verticalGap =
				firstColumnItems[1].top -
				(firstColumnItems[0].top + firstColumnItems[0].height);
			expect(verticalGap).toBe(gap);
		}
	});

	it('should apply custom column width', () => {
		const colWidth = 100;
		const result = arrangeHeightBalance({
			items: sampleItems,
			colWidth,
		});

		// Check if all items have the custom width
		result.forEach((item) => {
			expect(item.width).toBe(colWidth);
		});

		// Check if column spacing is correct
		const uniqueLeftPositions = [...new Set(result.map((item) => item.left))];
		const columnSpacing = uniqueLeftPositions[1] - uniqueLeftPositions[0];
		expect(columnSpacing).toBe(colWidth + 10); // colWidth + default gap
	});

	it('should handle empty input array', () => {
		const result = arrangeHeightBalance({ items: [] });
		expect(result).toEqual([]);
	});

	it('should handle single item', () => {
		const singleItem = [{ id: 1, height: 200 }];
		const result = arrangeHeightBalance({ items: singleItem });

		expect(result).toHaveLength(1);
		expect(result[0]).toEqual({
			...singleItem[0],
			top: 10,
			left: 0,
			width: 120,
			height: 10,
		});
	});

	it('should maintain relative height proportions', () => {
		const testItems = [
			{ id: 1, height: 200 },
			{ id: 2, height: 400 },
		];
		const result = arrangeHeightBalance({ items: testItems });

		expect(result[1].height).toBe(result[0].height * 2);
	});

	it('should use custom initial column heights', () => {
		const columnHeights = [20, 30, 40];
		const result = arrangeHeightBalance({
			items: sampleItems,
			columnHeights,
		});

		// First item should be placed in the column with height 20 (shortest)
		expect(result[0].top).toBe(30); // 20 (initial height) + 10 (gap)
	});
});
