<template>
  <div class="iframe-test">
    <header>header</header>
    <iframe
      id="iFrame1"
      name="iFrame1"
      :style="`height: ${height}px`"
      onload="this.height=iFrame1.document.body.scrollHeight"
      src="http://localhost:3000/zh/popularize?utm_source=partner&utm_campaign=id_48&utm_medium=cps"
      frameborder="0"
    ></iframe>
    <footer>footer</footer>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      height: 1000,
    };
  },

  computed: {},

  mounted() {
    window.addEventListener(
      'message',
      event => {
        console.log(event);
        if (event.origin !== 'http://localhost:3000') {
          return;
        }
        this.height = event.data.height;
      },
      false
    );
  },
  methods: {},
};
</script>

<style scoped lang="less" style="text/less">
.iframe-test {
  header,
  footer {
    height: 80px;
    background-color: #121212;
  }
  iframe {
    width: 100%;
    // height: 3000px;
  }
}
</style>
