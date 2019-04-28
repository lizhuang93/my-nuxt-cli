<template>
  <div class="index">
    <nuxt-link v-for="(item, index) in list" :key="index" :to="{ name: item }" class="item">
      to {{ item }} page >
    </nuxt-link>
  </div>
</template>

<script>
import { setCookie } from '~/utils/cookie.js';
export default {
  components: {},
  data() {
    return {
      list: ['componentCache', 'componentCache'],
    };
  },
  created() {
    this.$axios.get('/api/user/getuserinfo');
  },
  mounted() {
    setCookie(
      'Authenticate',
      'AVcMVJe5YeD8iv/hVlorxRE0hVppgZOLwpYsVpGzKW0rNPfbnO32u72gfOXJOOrSoH4pHbpiYfPwMhpnH7lc0QcaqwLqjv2FO1y2eawR2HnnBWe5gbW1vOeIC8VUSxIfLDRycV7L+aKiOaUNh/CEam21bJLg+yS0jM4at8v3dsRK4rx48gQp8QvIhnUe7udpyPPnH4zXQRmPsYx75vi2HLzPypMtWGqzKgV8kmtEAm+On4UX1KFL8kVhLXBpDTm0NoM1MATBzQhzF7cjOD0hXRJbpVivrlEcm9Qu8t5bU4/XDU4kQVLFmnr4eh8UB4JzEDF5MFw8SCAtkYXCrDKAsnWWcJMWS8JE++vYHD2B0mdfdlvJ3ShbQm7rqT412Zq5jaExVnKSRuTWDXH1S9cer2dXaOcwDfOlaMWrahDf5xDs5B2FhADOWaEDBcrLVEhr5UPEFo9K+qS9TeYsG08fFA=='
    );
  },
};
</script>

<style scoped lang="less">
.index {
  .item {
    display: block;
    padding: 10px 30px;
    border-bottom: 1px solid #dddddd;
    &:hover {
      background-color: #efefef;
      color: blue;
    }
  }
}
</style>
