<template>
  <div>
    <h1>Tabs</h1>
    <section>
      <h2>Standalone Tabs</h2>
      <Tabs
          :tabs="tabs"
          :active-tab-name="activeTabName"
          @update:active-tab-name="handleUpdateActiveTabName"
      />
    </section>
    <section>
      <h2>Tabs with Contents</h2>
      <Tabs
          :tabs="tabs"
          :active-tab-name="activeTabName"
          @update:active-tab-name="handleUpdateActiveTabName"
      >
        <TabsContent
            v-for="tab in tabs"
            :name="tab.name"
        >
          <div class="tab-content-container">
            <h3>
              <i :class="tab.iconClass"></i>
              {{ tab.name }}
            </h3>
            <p>
              {{ loremIpsum }}
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </section>
    <section>
      <a href="/">Back to Bo-Yin's GUI Challenges</a>
    </section>
  </div>
</template>

<script>
import Tabs from './Tabs.vue';
import TabsContent from './TabsContent.vue';
export default {
  components: {
    Tabs,
    TabsContent,
  },
  data() {
    return {
      activeTabName: 'cat',
      tabs: [
        {
          name: 'cat',
          text: 'cat',
          iconClass: 'las la-cat',
        },
        {
          name: 'crow',
          text: 'crow',
          iconClass: 'las la-crow',
        },
        {
          name: 'dog',
          text: 'dog',
          iconClass: 'las la-dog',
        },
        {
          name: 'dove',
          text: 'dove',
          iconClass: 'las la-dove',
        },
        {
          name: 'dragon',
          text: 'dragon',
          iconClass: 'las la-dragon',
        },
        {
          name: 'feather',
          text: 'feather',
          iconClass: 'las la-feather',
        },
        {
          name: 'fish',
          text: 'fish',
          iconClass: 'las la-fish',
        },
        {
          name: 'frog',
          text: 'frog',
          iconClass: 'las la-frog',
        },
        {
          name: 'hippo',
          text: 'hippo',
          iconClass: 'las la-hippo',
        },
        {
          name: 'horse',
          text: 'horse',
          iconClass: 'las la-horse',
        },
        {
          name: 'otter',
          text: 'otter',
          iconClass: 'las la-otter',
        },
        {
          name: 'paw',
          text: 'paw',
          iconClass: 'las la-paw',
        },
        {
          name: 'spider',
          text: 'spider',
          iconClass: 'las la-spider',
        },
      ],
      loremIpsum: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    };
  },
  methods: {
    handleUpdateActiveTabName(newActiveTabName) {
      this.activeTabName = newActiveTabName;
    },
  },
};
</script>
