<template>
   <component v-if="showrj" v-bind:is="currentTabComponent" :src="jssrc" @jsloaded="jsloaded"></component>
</template>

<script>
import RemoteJs from '../remotejs';

export default {
  name: 'promotion-rule',
  components: {
    [RemoteJs.name]: RemoteJs
  },
  destroyed() {
    window.test = null;
  },
  data() {
    return {
      currentTabComponent: 'remote-js',
      showrj: false,
      jssrc: ''
    };
  },
  methods: {
    jsloaded() {
      this.$emit('ruleloaded');
    },
    unload() {
      this.currentTabComponent = '';
      this.showrj = false;
      this.jssrc = '';
      window.calc = null;
    },
    loadjs(src) {
      this.currentTabComponent = 'remote-js';
      this.showrj = true;
      this.jssrc = src;
      console.log('loadjs: ' + src);
    },
    calc(val) {
      if (window.calc === undefined) {
        // throw new Error('window.calc is null');
      } else {
        return window.calc(val);
      }
    }
  }
};
</script>