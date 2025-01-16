import { useState, useEffect, useCallback, useRef } from 'react';

interface UseVirtualizedItemsProps<T> {
	items: T[];
	containerRef: React.RefObject<HTMLDivElement>;
	buffer?: number;
}

export const useVirtualizedItems = <T extends { top: number; height: number }>({
	items,
	containerRef,
	buffer = 200,
}: UseVirtualizedItemsProps<T>) => {
	const [visibleItems, setVisibleItems] = useState<T[]>([]);
	const debounceTimeout = useRef<number | null>(null);

	const updateVisibleItems = useCallback(() => {
		const container = containerRef.current;
		if (!container || items.length < 1) return;
		const { scrollTop, clientHeight } = container;
		const start = scrollTop - buffer;
		const end = scrollTop + clientHeight + buffer;

		const visible = items.filter(
			(item) => item.top + item.height >= start && item.top <= end
		);

		setVisibleItems(visible);
	}, [items, containerRef, buffer]);

	const debouncedScrollHandler = useCallback(() => {
		if (debounceTimeout.current) {
			clearTimeout(debounceTimeout.current);
		}

		debounceTimeout.current = setTimeout(() => {
			updateVisibleItems();
		}, 10);
	}, [updateVisibleItems]);

	useEffect(() => {
		const container = containerRef.current;

		if (container) {
			container.addEventListener('scroll', debouncedScrollHandler);
			updateVisibleItems();
		}

		return () => {
			container?.removeEventListener('scroll', debouncedScrollHandler);
		};
	}, [updateVisibleItems, containerRef, debouncedScrollHandler]);

	return visibleItems;
};
