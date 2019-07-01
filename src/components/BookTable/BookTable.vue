<template>
  <div class="container">
    <h1>Book your table now</h1>
    <h2>Pick a date and time</h2>
    <!-- :inline="true" -->
    <VueCtkDateTimePicker
      v-model="datetime"
      :no-weekends-days="true"
      :min-date="moment().format('YYYY-MM-DD')"
      :disabled-hours="disabledHours"
      :first-day-of-week="1"
      :minute-interval="15"
      :format="dateTimeFormat"
      :class="{ 'error': dateTimeError }"
    ></VueCtkDateTimePicker>

    <h3>Select number of people</h3>
    <div id="totalCount" class="total-count">
      <span @click="decrementCount" class="counter-click">-</span>
      <span class="counter-count">
        <span class="bold">{{counter}}</span>
        Guest<span class="plural" :class="{ 'show': pluralCount }">s</span>
      </span>
      <span @click="incrementCount" class="counter-click">+</span>
    </div>
    <h4>One final step</h4>
    <div class="final-order">
      <input v-model="email" type="email" id="newUserEmail"
             class="new-user-email" placeholder="Enter your email"
             :class="{ 'error': emailError }"/>
      <button v-on:click="submit" class="btn btn-danger">{{ confirmButtonText }}</button>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker';
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css';

export default {
  name: 'BookTable',
  data() {
    return {
      datetime: '',
      counter: 4,
      pluralCount: true,
      disabledHours: [
        '00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '23', '24',
      ],
      email: '',
      dateTimeError: false,
      dateTimeFormat: 'DD-MM-YYYY HH:mm',
      emailError: false,
      confirmButtonText: '',
    };
  },
  methods: {
    incrementCount() {
      if (this.counter < 10) this.counter += 1;
      if (this.counter > 1) this.pluralCount = true;
    },
    decrementCount() {
      if (this.counter > 1) this.counter -= 1;
      if (this.counter === 1) this.pluralCount = false;
    },
    formatDate(date) {
      const year = date.getFullYear();
      const day = date.getDate();
      const month = date.getMonth() + 1;
      return `${year}-${month}-${day}`;
    },
    moment() {
      return moment();
    },
    submit() {
      // eslint-disable-next-line
      (this.datetime == '') ? this.dateTimeError = true : this.dateTimeError = false;
      // eslint-disable-next-line
      (this.email == '') ? this.emailError = true : this.emailError = false;
      if (this.counter > 0 && this.datetime !== '' && this.email !== '') {
        this.$store.commit('saveSession', { email: this.email });
        this.$store.state.email = this.email;
        this.$router.push('/Receipt');
      } else {
        console.log(this.counter, this.datetime, this.email);
      }
    },
    // eslint-disable-next-line consistent-return
    getSession() {
      const data = JSON.parse(localStorage.getItem('Sundown'));
      console.log('BookTable', (data.sessions.filter(i => i.id === this.$store.state.email)[0]));
      if (data) {
        if (this.$store.state.email) {
          console.log('to update an order');
          const thisSession = (data.sessions.filter(i => i.id === this.$store.state.email)[0]);
          this.datetime = thisSession.time;
          this.email = thisSession.id; // this is the session's email
          this.confirmButtonText = 'Update';
          return data.sessions.filter(i => i.id === this.$store.state.email)[0];
        }
        console.log('to create new order');
        this.confirmButtonText = 'Order';
        return data.sessions.filter(i => i.id === 'new')[0];
      }
    },
  },
  watch: {
    datetime(v) {
      this.$store.commit('updateSession', { time: v });
    },
    counter(v) {
      this.$store.commit('updateSession', { guests: v });
    },
  },
  mounted() {
    const session = this.getSession();
    if (session) {
      if (session.drinks) {
        if (session.drinks.length < 1) {
          this.$router.push('/PickDrinks');
        }
      } else {
        this.$router.push('/PickDrinks');
      }
    } else {
      this.$router.push('/');
    }
  },
  components: {
    VueCtkDateTimePicker,
  },
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
  h2, h3, h4 {
    font-size: 16px;
    text-transform: uppercase;
    text-align: center;
    margin-top: 10vh;
    display: block;
  }
  .total-count {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;
    .counter-click {
      font-size: 56px;
      width: 60px;
      height: 60px;
      border: 2px solid #383838;
      border-radius: 30px;
      background-color: #ffffff;
      color: #383838;
      display: inline-block;
      line-height: 46px;
      text-align: center;
      transition: background-color 100ms linear;
      cursor: pointer;
      z-index: 10;
      -moz-user-select: none;
      -ms-user-select: none;
      -khtml-user-select: none;
      -webkit-user-select: none;
      -webkit-touch-callout: none;
      &:hover {
        background-color: #383838;
        color: #ffffff;
      }
    }
    .counter-count {
      font-size: 25px;
      padding: 0 80px;
      margin: 0 -30px;
      background-color: #484848;
      line-height: 54px;
      color: #ffffff;
      .bold {
        font-size: 35px;
        width: 42px;
        text-align: right;
        display: inline-block;
      }
      .plural {
        opacity: 0;
        width: 10px;
        &.show {
          opacity: 1;
        }
      }
    }
  }
  .final-order {
    display: flex;
    height: 50px;
    margin: 0 auto 10vh;
    justify-content: center;
    @media (max-width: 800px) {
      display: block;
      margin-bottom: 20vh;
    }
    .new-user-email {
      width: 30vw;
      font-size: 26px;
      padding: 0 15px;
      border: 1px solid rgba(0,0,0,.2);
      border-radius: 3px 0 0 3px;
      &.error {
        border-color: #ba2329;
      }
      @media (max-width: 1000px) {
        width: 50vw;
      }
      @media (max-width: 800px) {
        width: 80vw;
        margin-left: 10vw;
        height: 50px;
        text-align: center;
      }
    }
    .btn {
      @media (min-width: 801px) {
        margin-left: -2px;
        position: relative;
        border-radius: 0 3px 3px 0;
      }
      @media (max-width: 800px) {
        width: 40vw;
        margin: 15px 30vw;
        text-align: center;
      }
    }
  }
}
</style>
<style lang="scss">
.book-table {
  font-size: 56px;
  text-align: center;
  border-radius: 3px;
  margin: 0 auto 30px;
  border: 1px solid #d5d5d5;
  display: block;
  color: #484848;
  @media (max-width: 1000px) {
    font-size: 35px;
  }
}
.date-time-picker {
  max-width: 37vw;
  @media (max-width: 1000px) {
    max-width: 60vw;
  }
  @media (max-width: 800px) {
    max-width: 80vw;
  }
  .field-input {
    padding: 0 20px;
    text-align: center;
    font-size: 26px;
    height: 50px;
    @media (max-width: 800px) {
      font-size: 20px;
    }
  }
  &.error .field-input {
    border: 1px solid #ba2329;
  }
}
.datetimepicker .datepicker {
  left: 0;
  right: 0;
  margin: auto;
}
.time-picker-column-item.disabled {
  display: none;
}
</style>
