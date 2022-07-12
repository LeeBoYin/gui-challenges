# Tabs
[Demo](https://boyin-gui-challenges.netlify.app/components/tabs/)

## UI Challenges
### Animate tabs indicator's position and size
1. Set indicator as an absolute-positioned element, aligned to bottom left and 1px of width. 
2. When the active tab is changed, control it's `offset` and `width` by updating the CSS variables for transform `translateX` and `scaleX`.

### Animate icons grow / shrink 
1. Set icons as absolute-positioned elements in each tab. Make icons take zero space in tabs.
2. Hide all icons by transform `scale(0)`, except for the one in the active tab.
3. Animate the appearing and the disappearing icons' scale by transform `scale`.
4. When a tab is activated, use transform `translateX` to shift the active tab and all following tabs right, making space for the appearing icon.

### Make tabs draggable with cursor
- Use [mouseDragToScroll](../../js-libraries/mouseDragToScroll.js)
