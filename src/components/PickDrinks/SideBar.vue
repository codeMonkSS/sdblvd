<template>
  <div class="side-container">
    <div class="side-box">
      <div class="side-header">Book a Table</div>
      <div class="side-text">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      </div>
      <div class="side-button">
        <router-link class="btn btn-ghost" to="/BookTable">Next</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SideBar',
};
</script>

<style lang="scss" scoped>
.side-container {
  width: 400px;
  background: #eaeaea;
  @media (max-width: 800px) {
    width: 100vw;
  }
  .side-box {
    background-color: #ba2329;
    color: #ffffff;
    padding: 0 30px;
    display: block;
  }
  .side-header {
    font-size: 20px;
    text-transform: uppercase;
    letter-spacing: 8px;
    padding-top: 1.5em;
    font-weight: bold;
    @media (max-width: 1200px) {
      letter-spacing: 5px;
    }
  }
  .side-text {
    padding: 1em 0 1.5em;
  }
  .side-button {
    padding-bottom: 3em;
    text-align: center;
    .btn {
      width: 50%;
    }
  }
}
</style>
