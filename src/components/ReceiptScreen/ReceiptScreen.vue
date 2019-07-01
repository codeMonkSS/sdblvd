<template>
  <div class="container" v-if="session">
    <h1>Order Receipt</h1>
    <router-link to="/" class="btn btn-primary">Back to Home</router-link>
    <div class="receipt">
      <h4 class="text-uppercase">Your Orders</h4>
      <ol class="order-summary">
        <li>
        <span class="order-image">
          <img :src="session.dish.strMealThumb" alt="Venetian Duck Ragu" />
        </span>
          <span class="order-name">
          <h2>{{ session.dish.strMeal }}</h2>
        </span>
        </li>
        <li v-for="drink in session.drinks">
        <span class="order-image">
          <img :src="drink.image_url" :alt="drink.name">
        </span>
          <span class="order-name">
          <h3>{{ drink.name }}</h3>
        </span>
        </li>
      </ol>
      <h4 class="text-uppercase">Booking Details</h4>
      <h4><span>Date and Time:</span> {{ session.time }}</h4>
      <h5><span>Amount:</span> $34.75</h5>
      <h5><span>Email:</span> {{ session.id }}</h5>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReceiptScreen',
  data() {
    return { session: undefined }
  },
  mounted() {
    if(this.getSession()) {
      this.session = this.getSession();
    }else {
      // suggest start a new session
      this.$router.push("/")
    }
  },
  methods: {
    getSession() {
      let data = JSON.parse(localStorage.getItem('Sundown'));
      return data.sessions.filter(i => i.id == this.$store.state.email)[0];
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  h1 {
    font-size: 20px;
    text-transform: uppercase;
    letter-spacing: 12px;
    border-bottom: 2px solid #ba2329;
    padding-bottom: 10px;
    margin: 0 0 20px;
    @media (max-width: 1200px) {
      letter-spacing: 6px;
      margin: 0 20px 20px;
    }
  }
  .receipt {
    width: 100%;
    max-width: 600px;
    margin: 5vh auto 6vh;
    background-color: #f8f8f8;
    padding: 2em 2em 3em;
    border-radius: 5px;
    @media (max-width: 800px) {
      margin-bottom: 0;
      margin-top: 20px;
      border-radius: 0;
    }
  }
  .order-summary {
    display: flex;
    flex-direction: column;
    @media (max-width: 800px) {
      padding-left: 20px;
    }
    li {
      margin-bottom: 10px;
      .order-image {
        width: 100px;
        height: 100px;
        border: 1px solid #d5d5d5;
        border-radius: 3px;
        display: inline-block;
        margin-left: 20px;
        @media (max-width: 800px) {
          width: 60px;
          height: 60px;
          margin-left: 0;
        }
        img {
          margin: 5% auto;
          height: 90%;
          width: auto;
          display: block;
          align-self: auto;
        }
      }
      .order-name {
        margin-left: 30px;
        display: inline-block;
        @media (max-width: 800px) {
          margin-left: 10px;
          width: calc(100% - 70px);
        }
      }
    }
  }
  h2,h3,h4,h5 {
    font-size: 18px;
    margin: 0;
    font-weight: normal;
    span {
      font-weight: bold;
    }
  }
  .text-uppercase {
    text-transform: uppercase;
    margin-top: 20px;
    margin-bottom: 15px;
    letter-spacing: 5px;
    border-bottom: 2px solid #007ddb;
    font-weight: bold;
  }
  .btn {
    margin-left: auto;
    position: relative;
    display: block;
    width: 181px;
    text-align: center;
    @media (max-width: 800px) {
      margin-right: 20px;
    }
  }
}
</style>
