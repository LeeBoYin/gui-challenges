const ease = (value) => {
	return 1 - Math.pow(1 - value, 5);
};

/**
 * 將 window 或是有 scrollbar 的區塊以設定的動畫時間滑動到指定的位置
 * @param {Object} [options = {}]
 * @param {(Element|Window)} [options.scrollElement = window] - scrollable element
 * @param {Number} [options.duration = 300] - 動畫時間長度，單位為 ms
 * @param {Number} [options.x] -指定滑動到 x 位置 (px)
 * @param {Number} [options.y] - 指定滑動到 y 位置 (px)
 * @param {Function} [options.onComplete] - scroll 動畫結束時的 callback function
 * @example
 * scrollTo({
 *   scrollElement: document.getElementById('menu'),
 *   y: 300,
 * });
 */
function scrollTo({
	scrollElement = window,
	duration = 300,
	x = null,
	y = null,
	onComplete = () => {},
}) {
	const fromX = scrollElement === window ? scrollElement.scrollX : scrollElement.scrollLeft;
	const fromY = scrollElement === window ? scrollElement.scrollY : scrollElement.scrollTop;
	const deltaX = x !== null ? x - fromX : 0;
	const deltaY = y !== null ? y - fromY : 0;
	const startTime = window.performance.now();
	const updateScrollPosition = () => {
		const time = window.performance.now() - startTime;
		const percent = ease(Math.min(time / duration, 1));
		const newX = fromX + deltaX * percent;
		const newY = fromY + deltaY * percent;
		scrollElement.scrollTo(newX, newY);
		if (percent < 1) {
			window.requestAnimationFrame(updateScrollPosition);
		} else if (typeof onComplete === 'function') {
			onComplete();
		}
	};
	updateScrollPosition();
}

export default scrollTo;
