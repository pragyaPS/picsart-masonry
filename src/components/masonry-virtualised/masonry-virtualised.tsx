import React, { useState, useEffect, useRef, Fragment } from 'react';
import { useDynamicColumns } from './hooks/use-dynamic-colums';
import { useVirtualizedItems } from './hooks/use-virtualised-items';
import { useInfiniteScroll } from './hooks/use-infinite-scroll';
import { arrangeHeightBalance } from '../../utils/arrange-height-balance-pins';

interface MasonryVirtualizedLayoutProps<T> {
	items: T[];
	renderItem: (item: T) => React.ReactNode;
	onLoadMore: () => void;
	perPageItems: number;
	loading?: boolean;
	hasMore: boolean;
	columnGap?: number;
	rowGap?: number;
	minColumnWidth?: number;
	scrollContainerRef: React.RefObject<HTMLDivElement>;
}

export const MasonryVirtualizedLayout = <
	T extends { id: number; height: number },
>({
	items,
	renderItem,
	onLoadMore,
	hasMore,
	perPageItems,
	scrollContainerRef,
	loading = false,
	columnGap = 10,
	minColumnWidth = 200,
}: MasonryVirtualizedLayoutProps<T>) => {
	const { columns, calculating: calculatingColumns } = useDynamicColumns(
		scrollContainerRef,
		minColumnWidth,
		columnGap
	);
	const columnHeights = useRef(Array<number>(3).fill(0));
	const [positionedItems, setPositionedItems] = useState<
		(T & { top: number; left: number; height: number; width: number })[]
	>([]);

	const visibleItems = useVirtualizedItems({
		items: positionedItems,
		containerRef: scrollContainerRef,
		buffer: 200,
	});

	useInfiniteScroll({
		loading,
		containerRef: scrollContainerRef,
		onLoadMore,
		hasMore,
		lastItem: positionedItems[positionedItems.length - 1],
	});

	useEffect(() => {
		columnHeights.current = Array<number>(columns).fill(0);
		setPositionedItems([]);
	}, [columns]);

	useEffect(() => {
		if (calculatingColumns || !items.length) return;
		const balancedItems = arrangeHeightBalance({
			items: items.slice(items.length - perPageItems),
			columnCount: columns,
			gap: columnGap,
			colWidth: minColumnWidth,
			columnHeights: columnHeights.current,
		});
		setPositionedItems((prevItems) => [...prevItems, ...balancedItems]);
		// we don't want to rerun every time the items change
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [items.length, columns, columnGap, minColumnWidth, calculatingColumns]);

	return (
		<div
			style={{
				position: 'relative',
			}}
		>
			{visibleItems.map((item) => (
				<Fragment key={`${item.id}-${item.top}`}>{renderItem(item)}</Fragment>
			))}
		</div>
	);
};
