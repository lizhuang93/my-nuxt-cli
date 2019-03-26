<template>
  <section class="container">
    <div>
      <logo />
      <h1 class="title">
        nuxt-cli
      </h1>
      <h2 class="subtitle">
        My super-excellent Nuxt.js project
      </h2>
      <div class="links">
        <a
          href="https://nuxtjs.org/"
          target="_blank"
          class="button--green"
        >Documentation</a>
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          class="button--grey"
        >GitHub</a>
      </div>
    </div>
  </section>
</template>

<script>
import Logo from '~/components/Logo.vue'
import { setCookie } from "~/utils/cookie.js";
export default {
  components: {
    Logo
  },
  mounted() {
    setCookie('Authenticate', 'AVcMVJe5YeD8iv/hVlorxRE0hVppgZOLwpYsVpGzKW0rNPfbnO32u72gfOXJOOrSoH4pHbpiYfPwMhpnH7lc0QcaqwLqjv2FO1y2eawR2HnnBWe5gbW1vOeIC8VUSxIfLDRycV7L+aKiOaUNh/CEam21bJLg+yS0jM4at8v3dsRK4rx48gQp8QvIhnUe7udpyPPnH4zXQRmPsYx75vi2HLzPypMtWGqzKgV8kmtEAm+On4UX1KFL8kVhLXBpDTm0NoM1MATBzQhzF7cjOD0hXRJbpVivrlEcm9Qu8t5bU4/XDU4kQVLFmnr4eh8UB4JzEDF5MFw8SCAtkYXCrDKAsnWWcJMWS8JE++vYHD2B0mdfdlvJ3ShbQm7rqT412Zq5jaExVnKSRuTWDXH1S9cer2dXaOcwDfOlaMWrahDf5xDs5B2FhADOWaEDBcrLVEhr5UPEFo9K+qS9TeYsG08fFA==')
    this.$axios.get('/api/user/getuserinfo')
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
