<template>
  <div class="nav">
    <router-link to="/" class="logo">
      <img src="../../assets/logo.svg" alt="SunDown Boulevard" />
    </router-link>
    <div class="menu-bar">
      <span>M</span>
      <span>E</span>
      <span>N</span>
      <span>U</span>
    </div>
    <div class="menu">
      <div>Restauranter</div>
      <div>Produkter</div>
      <div>Nyhedsbrev</div>
      <div>Kontakt</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavMenu',
  mounted() {
    const menuBar = document.querySelector('.menu-bar');
    const menu = document.querySelector('.menu');
    menuBar.addEventListener('click', () => {
      menuBar.classList.toggle('active');
      menu.classList.toggle('active');
    });
  },
};
</script>

<style lang="scss" scoped>
.nav {
  display: flex;
  width: 100%;
  @media (max-width: 800px) {
    height: 100px;
  }
}

.logo {
  width: auto;
  height: auto;
  display: block;
  padding: 20px;
  img {
    width: 70px;
    height: auto;
    display: block;
  }
}

.menu-bar {
  position: absolute;
  top: 40px;
  right: 30px;
  width: 40px;
  height: 40px;
  display: none;
  justify-content: space-evenly;
  flex-wrap: wrap;
  span {
    margin: 0 2px;
  }
  &.active {
    font-weight: bold;
  }
  @media (max-width: 800px) {
    display: flex;
  }
}

.menu {
  display: flex;
  align-items: center;
  margin-left: auto;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  div {
    margin-right: 20px;
  }
  @media (max-width: 800px) {
    flex-direction: column;
    position: absolute;
    top: 100px;
    width: 100vw;
    background-color: #454545;
    z-index: 10;
    max-height: 0;
    overflow: hidden;
    transition: max-height 300ms ease;
    &.active {
      max-height: 250px;
    }
    div {
      margin: 0;
      border-bottom: 1px solid #666666;
      padding: 15px 30px;
      width: 100vw;
      color: #ffffff;
    }
  }
}
</style>
