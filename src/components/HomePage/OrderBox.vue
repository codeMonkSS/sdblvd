<template>
  <div class="order-box">
    <h1>Order flow box</h1>
    <img src="../../assets/food.svg" alt="Order flow box" />
    <router-link class="btn btn-ghost" to="/PickDish" @click.native="removeEmailCookies">Order</router-link>
  </div>
</template>

<script>
export default {
  name: 'OrderBox',
  methods: {
    removeEmailCookies() {
      if (localStorage.getItem('EmailSession')) {
        localStorage.removeItem('EmailSession');
        window.location.reload();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.order-box {
  width: 400px;
  background-color: #ba2329;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: #ffffff;
  @media (max-width: 800px) {
    width: 100vw;
    padding: 30px 20px;
    min-height: 350px;
  }
  h1 {
    font-size: 20px;
    text-transform: uppercase;
    letter-spacing: 12px;
    @media (max-width: 1200px) {
      letter-spacing: 6px;
    }
  }
  img {
    width: 100px;
    height: auto;
    margin: 0 auto;
  }
  .btn {
    width: 50%;
    text-align: center;
    margin: 10px auto 30px;
  }
}
</style>
