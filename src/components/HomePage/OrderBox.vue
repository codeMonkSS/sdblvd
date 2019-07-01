<template>
  <div class="order-box">
    <h1>Order flow box</h1>
    <img src="../../assets/food.svg" alt="Order flow box" />
    <button class="btn btn-ghost" @click="newOrder">Order</button>
  </div>
</template>

<script>
export default {
  name: 'OrderBox',
  data() {
    return {};
  },
  methods: {
    newOrder() {
      const data = JSON.parse(localStorage.getItem('Sundown'));
      this.$router.push('/PickDish');
      const newData = data.sessions.filter(i => i.id == 'new')[0];
      console.log('new order');
      return newData;
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
