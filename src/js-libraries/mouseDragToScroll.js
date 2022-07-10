import throttleByAnimationFrame from './throttleByAnimationFrame';

const instanceMap = new Map();
const CLICK_MOUSE_MOVE_TOLERANCE = 2; // sometimes mouse moves slightly when clicked, drag doesn't count when move is within tolerance

// instance constructor function
function MouseDragToScroll(element) {
	this.element = element;
}

MouseDragToScroll.prototype.init = function() {
	this.mouseDownHandler = this.onMouseDown.bind(this);
	this.element.addEventListener('mousedown', this.mouseDownHandler);
}

MouseDragToScroll.prototype.destroy = function() {
	this.element.removeEventListener('mousedown', this.mouseDownHandler);
}

MouseDragToScroll.prototype.onMouseDown = function(e) {
	// set variables
	this.isMouseDown = true;
	this.isDragging = false;
	this.mouseStartX = e.pageX;
	this.mouseStartY = e.pageY;
	this.scrollStartX = this.element.scrollLeft;
	this.scrollStartY = this.element.scrollTop
	this.mouseMoveHandler = throttleByAnimationFrame(this.onMouseMove.bind(this));
	this.mouseUpHandler = this.onMouseUp.bind(this);

	document.addEventListener('mousemove', this.mouseMoveHandler);
	document.addEventListener('mouseup', this.mouseUpHandler);
}

MouseDragToScroll.prototype.onMouseMove = function(e) {
	if (!this.isMouseDown) {
		return;
	}

	const deltaX = e.pageX - this.mouseStartX;
	const deltaY = e.pageY - this.mouseStartY;
	if (!this.isDragging && (Math.abs(deltaX) >= CLICK_MOUSE_MOVE_TOLERANCE || Math.abs(deltaY) >= CLICK_MOUSE_MOVE_TOLERANCE)) {
		this.isDragging = true;
		// disable user select when dragging
		this.element.style.userSelect = 'none';
	}

	this.element.scrollTop = this.scrollStartY - deltaY;
	this.element.scrollLeft = this.scrollStartX - deltaX;
}

MouseDragToScroll.prototype.onMouseUp = function(e) {
	this.isMouseDown = false;
	this.element.style.userSelect = '';
	document.removeEventListener('mousemove', this.mouseMoveHandler);
	document.removeEventListener('mouseup', this.mouseUpHandler);

	setTimeout(() => {
		// set timeout for checkIsMouseDraggingToScroll
		this.isDragging = false;
	}, 0);
}


/**
 * 讓使用者可以用滑鼠游標拖動的方式控制 scrollable element 的捲動位置
 * @param {Element} element - scrollable element
 * @example
 * setMouseDragToScroll(document.getElementById('container'));
 */
export const setMouseDragToScroll = (element) => {
	if (!element) {
		return;
	}
	if (instanceMap.get(element)) {
		// instance existing
		return;
	}
	const instance = new MouseDragToScroll(element);
	instance.init();
	instanceMap.set(element, instance);
};

/**
 * 解除滑鼠游標拖動 scroll element
 * @param {Element} element - scrollable element
 * @example
 * unsetMouseDragToScroll(document.getElementById('container'));
 */
export const unsetMouseDragToScroll = (element) => {
	const instance = instanceMap.get(element);
	if (!instance) {
		// instance not exist
		return;
	}
	instance.destroy();
	instanceMap.delete(element);
};

/**
 * 確認使用者是否正在拖動或是剛結束拖動 element，可以用來暫時關閉 element 內部點擊的功能
 * @param {Element} element - scrollable element
 * @example
 * const isDragging = checkIsMouseDraggingToScroll(document.getElementById('scrollable-element'));
 * @returns {Boolean}
 */
export const checkIsMouseDraggingToScroll = (element) => {
	const instance = instanceMap.get(element);
	if (!instance) {
		// instance not exist
		return false;
	}

	return instance.isDragging ?? false;
};
