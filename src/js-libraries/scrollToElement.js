import scrollTo from './scrollTo';

/**
 * 將 window 或是有垂直 scrollbar 的區塊（overflow-y: auto, scroll）以設定的動畫時間滑動到指定的 element 位置
 * @param {Element} targetElement - scroll top 目標 element
 * @param {Object} [options = {}]
 * @param {(Element|Window)} [options.scrollElement = window] - scrollable element
 * @param {Number} [options.duration = 300] - 動畫時間長度，單位為 ms
 * @param {Number} [options.offset = 0] -  scroll 之後 targetElement 離邊界的距離
 * @param {Function} [options.onComplete] - scroll 動畫結束時的 callback function
 * @example
 * scrollToElement(document.getElementById('section'), {
 *   offset: document.querySelector('header').offsetHeight,
 * });
 */
function scrollToElement(targetElement, {
	scrollElement = window,
	duration = 300,
	offset = 0,
	onComplete = () => {},
} = {}) {
	if (!targetElement) {
		console.warn('targetElement is required');
		return;
	}
	if (scrollElement !== window && !scrollElement.contains(targetElement)) {
		console.warn('targetElement is not a descendant of scrollElement');
		return;
	}

	scrollTo({
		scrollElement,
		duration,
		onComplete,
		y: (
			scrollElement === window
				? targetElement.offsetTop
				: targetElement.offsetTop - (scrollElement.offsetTop + parseInt(getComputedStyle(scrollElement).getPropertyValue('border-top-width')))
		) - offset,
	});
}

export default scrollToElement;
