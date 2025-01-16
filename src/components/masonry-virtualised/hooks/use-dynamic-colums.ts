import { useState, useEffect, useCallback } from 'react';

export const useDynamicColumns = (
	containerRef: React.RefObject<HTMLDivElement>,
	minColumnWidth: number,
	columnGap: number
) => {
	const [columns, setColumns] = useState(1);
	const [calculating, setCalculating] = useState(true);

	const calculateColumns = useCallback(() => {
		const containerWidth = containerRef.current?.clientWidth || 0;
		return Math.max(
			1,
			Math.floor(containerWidth / (minColumnWidth + columnGap))
		);
	}, [containerRef, minColumnWidth, columnGap]);

	useEffect(() => {
		const resizeObserver = new ResizeObserver(() => {
			setColumns(calculateColumns());
			setCalculating(false);
		});

		if (containerRef.current) {
			resizeObserver.observe(containerRef.current);
		}

		return () => {
			resizeObserver.disconnect();
		};
	}, [calculateColumns, containerRef]);

	useEffect(() => {
		setColumns(calculateColumns());
		setCalculating(false);
	}, [calculateColumns]);

	return { columns, calculating };
};
