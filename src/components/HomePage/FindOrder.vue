<template>
  <div class="find-order">
    <h2>Find your order</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      Ut enim ad minim veniam, quis nostrud exercitation ullamco
      laboris nisi ut aliquip ex ea commodo consequat.</p>
    <div class="user-email">
      <input type="email" placeholder="Enter your email" v-model="email" />
      <button class="btn btn-primary" @click="findOrder">Find</button>
    </div>
    <div
      class="error-order"
      v-for="(error, pro) in errorText"
      :key="pro">
      <p v-if="errorFindOrder">{{ error }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FindOrder',
  data() {
    return {
      errorFindOrder: false,
      errorText: [],
      email: '',
      reg: /^[^@ ]+@(([A-Za-z\u00C0-\u00FF0-9\-_]{1,}\.)?([A-Za-z\u00C0-\u00FF0-9\-_]{1,}))+(\.[a-zA-Z]{2,})+$/,
    };
  },
  methods: {
    // eslint-disable-next-line
    findOrder() {
      this.errorText = [];
      if ((this.email === '') || !(this.reg.test(this.email))) {
        this.errorFindOrder = true;
        this.errorText.push('Enter a valid email');
        return false;
      }
      const data = JSON.parse(localStorage.getItem(this.$store.state.sessionName));
      if (data) {
        console.log(data.sessions);
        // eslint-disable-next-line
        if (data.sessions.filter(i => i.id == this.email)[0]) {
          console.log('order found', data.sessions.filter(i => i.id === this.$store.state.email)[0]);
          this.$store.state.email = this.email;
          this.$router.push('/PickDish');
        } else {
          // not found
          console.log('no order found');
          this.errorFindOrder = true;
          this.errorText.push('No order found with entered email.');
        }
      } else {
        console.log('no data found');
        this.errorFindOrder = true;
        this.errorText.push('No order found.');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  .find-order {
    width: 600px;
    padding: 0 30px 30px;
    display: flex;
    flex-direction: column;
    @media (max-width: 800px) {
      width: 100vw;
      padding: 0 20px 30px;
    }
    h2 {
      font-size: 20px;
      text-transform: uppercase;
      letter-spacing: 12px;
      @media (max-width: 1200px) {
        letter-spacing: 8px;
      }
    }
    p {
      margin-top: 0;
    }
    .user-email {
      display: flex;
      width: 100%;
      margin-block-end: 1em;
      input {
        outline: none;
        padding: 0 5px;
        border-radius: 3px 0 0 3px;
        width: 100%;
        border: 1px solid #d5d5d5;
        border-right: 0 none;
      }
      .btn {
        border-radius: 0 3px 3px 0;
        position: relative;
      }
    }
    .error-order {
      color: #ba2329;
    }
  }
</style>
