<template>
  <div id="app">
    <NavMenu />
    <router-view/>
    <FooterBar />
  </div>
</template>

<script>
import NavMenu from '@/components/Shared/NavMenu.vue';
import FooterBar from '@/components/Shared/FooterBar.vue';

export default {
  components: {
    NavMenu,
    FooterBar,
  },
};
</script>

<style lang="scss">
@import '../node_modules/modern-normalize/modern-normalize.css';

#app {
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #454545;
  width: 1200px;
  margin: auto;
  letter-spacing: 1px;
  line-height: 1.4;
  @media (max-width: 1200px) {
    width: 1000px;
  }
  @media (max-width: 1000px) {
    width: 800px;
  }
  @media (max-width: 800px) {
    width: 100vw;
  }
}

.btn {
  border-radius: 3px;
  font-size: 20px;
  padding: 10px 20px 10px 20px;
  text-decoration: none;
  transition: background-color 100ms linear;
  display: inline-block;
  border: none;
  outline: none;
  &:hover {
    text-decoration: none;
  }
}

.btn-ghost {
  color: #ffffff;
  background: transparent;
  border: 2px solid #ffffff;
  &:hover {
    background: #ffffff;
    color: #000000;
  }
}

.btn-primary {
  color: #ffffff;
  background: #007ddb;
  &:hover {
    background: #3498db;
  }
}

.btn-danger {
  color: #ffffff;
  background: #ba2329;
  &:hover {
    background: #ba484e;
  }
}
</style>
