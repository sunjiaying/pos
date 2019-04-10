<script>
export default {
  name: 'remote-js',
  components: {
  },
  render: function(createElement) {
    return createElement('script', {
      attrs: {
        type: 'text/javascript',
        src: this.src,
        onload: this.loaded()
      }
    });
  },
  props: {
    src: { type: String, required: true }
  },
  methods: {
    loaded() {
      this.$emit('jsloaded');
    }
  }
};
</script>