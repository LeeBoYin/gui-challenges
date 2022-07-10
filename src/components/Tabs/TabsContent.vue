<template>
	<div
		class="tabs__content"
		:class="{
			'tabs__content--active': $parent.$props.activeTabName === name,
		}"
	>
		<slot />
	</div>
</template>

<script>
export default {
	props: {
		name: {
			type: String,
			required: true,
		},
	},
}
</script>
