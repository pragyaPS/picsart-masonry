import { useEffect } from 'react';

interface UseInfiniteScrollArgs {
	containerRef: React.RefObject<HTMLDivElement>;
	loading: boolean;
	hasMore: boolean;
	onLoadMore: () => void;
	threshold?: number;
	lastItem: { top: number };
}

export const useInfiniteScroll = ({
	containerRef,
	loading,
	onLoadMore,
	hasMore,
	threshold = 1000,
	lastItem,
}: UseInfiniteScrollArgs) => {
	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		const handleScroll = () => {
			if (loading || !hasMore || !container) return;
			const { scrollTop } = container;
			if (lastItem?.top <= scrollTop + threshold) {
				onLoadMore();
			}
		};

		container.addEventListener('scroll', handleScroll);
		return () => container.removeEventListener('scroll', handleScroll);
	}, [loading, onLoadMore, threshold, containerRef, hasMore, lastItem?.top]);
};
