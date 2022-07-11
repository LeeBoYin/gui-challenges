<template>
  <div
      class="tabs"
      :class="{
			'tabs--has-content': $slots['default'],
			'tabs--show-icon': isShowIcon,
		}"
  >
    <div
        ref="header"
        class="tabs__header"
    >
      <div class="tabs__header-padding-left"></div>
      <nav class="tabs__tab-list">
        <a
            v-for="(tab, index) in tabs"
            ref="tab"
            :key="tab.name"
            :class="{
              'tabs__tab--active': activeTabIndex === index,
            }"
            class="tabs__tab"
            role="button"
            tabindex="0"
            @keydown.space.prevent="updateActiveTab(tab)"
            @click="updateActiveTab(tab)"
        >
          <i
              v-if="tab.iconClass"
              class="tabs__tab-icon"
              :class="tab.iconClass"
          ></i>
          <span class="tabs__tab-text">
						{{ tab.text }}
					</span>
        </a>
      </nav>
      <div class="tabs__header-padding-right"></div>
      <div
          ref="indicator"
          class="tabs__indicator"
          :style="indicatorStyle"
      ></div>
    </div>
    <slot />
  </div>
</template>

<script>
import scrollTo from '../../js-libraries/scrollTo';
import {
  setMouseDragToScroll,
  unsetMouseDragToScroll,
  checkIsMouseDraggingToScroll,
} from '../../js-libraries/mouseDragToScroll';

export default {
  props: {
    tabs: {
      type: Array,
      default: () => [],
    },
    activeTabName: {
      type: [String, null],
      default: null,
    },
  },
  data() {
    return {
      indicatorLeft: null,
      indicatorRight: null,
    };
  },
  computed: {
    activeTabIndex() {
      return this.tabs.findIndex(tab => tab.name === this.activeTabName);
    },
    isShowIcon() {
      return this.tabs[this.activeTabIndex] && this.tabs[this.activeTabIndex].iconClass;
    },
    indicatorStyle() {
      if (this.indicatorLeft === null || this.indicatorRight === null) {
        return null;
      }
      return {
        '--indicator-offset': this.indicatorLeft,
        '--indicator-width': this.indicatorRight - this.indicatorLeft,
      };
    }
  },
  watch: {
    activeTabIndex() {
      this.$nextTick(this.updateIndicatorPosition);
      this.$nextTick(this.scrollHeaderToActiveTab);
    },
    tabs: {
      deep: true,
      handler() {
        this.$nextTick(this.updateIndicatorPosition);
      },
    },
    indicatorStyle: {
      immediate: true,
      handler(newVal, oldVal) {
        // temporarily turn off indicator's transition when it appears / disappears
        if (newVal && !oldVal || !newVal && oldVal) {
          this.$refs.indicator.style.transition = 'none';
          setTimeout(() => {
            this.$refs.indicator.style.transition = '';
          }, 0);
        }
      },
    },
  },
  created() {
    if (this.activeTabIndex === -1 && this.tabs.length) {
      this.updateActiveTab(this.tabs[0]);
    }
  },
  mounted() {
    this.$nextTick(this.updateIndicatorPosition);
    this.$nextTick(this.scrollHeaderToActiveTab);
    setMouseDragToScroll(this.$refs.header);
  },
  beforeDestroy() {
    unsetMouseDragToScroll(this.$refs.header);
  },
  methods: {
    updateActiveTab(tab) {
      if (checkIsMouseDraggingToScroll(this.$refs.header)) {
        // don't trigger update after user dragged header
        return;
      }
      this.$emit('update:active-tab-name', tab.name);
    },
    updateIndicatorPosition() {
      if (this.activeTabIndex === -1) {
        this.indicatorLeft = null;
        this.indicatorRight = null;
        return;
      }
      const activeTabElement = this.$refs.tab[this.activeTabIndex];
      const activeTabComputedStyle = window.getComputedStyle(activeTabElement);
      this.indicatorLeft = activeTabElement.offsetLeft + parseInt(activeTabComputedStyle.getPropertyValue('padding-left'));
      this.indicatorRight = activeTabElement.offsetLeft + activeTabElement.offsetWidth - parseInt(activeTabComputedStyle.getPropertyValue('padding-right'));
      if (this.isShowIcon) {
        const iconElement = activeTabElement.querySelector('.tabs__tab-icon');
        this.indicatorRight -= iconElement.offsetLeft;
      }
    },
    scrollHeaderToActiveTab() {
      if (this.activeTabIndex === -1) {
        return;
      }
      const headerElement = this.$refs.header;
      const target = (this.indicatorLeft + (this.indicatorRight - this.indicatorLeft) / 2) - headerElement.clientWidth / 2;

      scrollTo({
        scrollElement: headerElement,
        x: Math.min(Math.max(0, target), headerElement.scrollWidth - headerElement.clientWidth),
        duration: parseInt(window.getComputedStyle(this.$el).getPropertyValue('--tab-transition-duration-ms')),
      });
    },
  },
};
</script>
