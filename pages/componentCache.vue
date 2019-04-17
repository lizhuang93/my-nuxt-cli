<template>
  <div id="">
    <code style="line-height:1.5">
      <h1 style="font-size: 20px">component cache 组件缓存</h1>
      <li>1. 当不使用缓存，每次刷新页面， created在服务端都会执行，</li>
      <li>2. 使用缓存 serverCacheKey: () => '123' 时，6s(nuxt.config.js里配置的是6s)内刷新，created在服务端不会执行</li>
      <br>
      {{new Date()}}
    </code>
  </div>
</template>

<script>
export default {
  name: 'test',
  serverCacheKey: () => '123',
  components: {

  },
  props: {
  },
  data() {
    return {
      
    }
  },
  asyncData() {
    return {
    }
  },
  computed:{

  },
  created() {
    console.log('------------------>>>>>>>> this is componentCache page');
    
  },
  mounted() {

  },

  methods: {

  },

}
</script>

<style scoped lang="less" style="text/less">
</style>
