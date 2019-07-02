<template>
  <div>
    <div class="loading container" v-if="!drinks">
      <div class="gallery" v-for="(i, indx) in 4" :key="indx">
        <div class="gallery-item loading-template" :class="i"></div>
      </div>
    </div>
    <div class="container" v-if="drinks">
      <div class="gallery" v-for="drink in drinks">
        <div class="gallery-item">
          <div class="gallary-img">
            <img :src="drink.image_url" :alt="drink.name">
          </div>
          <div>
            <span class="name">{{ drink.name }}</span>
            <span class="details" @click="showModal">
              <img src="../../assets/view.svg" :alt="drink.name"
                title="View Details" v-on:click="selectedDrink = drink">
            </span>
            <label>
              <span class="unchecked" v-show="selectedDrinks.indexOf(drink.id) < 0"
                v-on:click="addDrink(drink)">
                <img src="../../assets/add.svg" alt="Add to order">
              </span>
              <span class="checked" v-show="selectedDrinks.indexOf(drink.id) > -1"
                v-on:click="removeDrink(drink)">
                <img src="../../assets/check.svg" alt="Added to order">
              </span>
            </label>
          </div>
        </div>
      </div>
      <DrinkData v-show="isModalVisible" @closeModalView="closeModalView" :drink="selectedDrink" />
    </div>
  </div>
</template>

<script>
import DrinkData from './DrinkData.vue';

export default {
  name: 'DrinksGallery',
  data() {
    return {
      isModalVisible: false,
      drinks: undefined,
      selectedDrink: undefined,
      selectedDrinks: [],
    };
  },
  mounted() {
    const self = this;
    // send the request on mount
    this.$store.dispatch('getDrinks').then(res => {
      // hide loading animation and dispay the actual container
      this.drinks = res.data;
      console.log(this.drinks);
    }).catch(err => console.log(err));

    const session = this.getSession();
    if (session) {
      console.log(session);
      if (session.drinks && session.drinks.length > 0) {
        for (let i = 0; i < session.drinks.length; i++) {
          self.selectedDrinks.push(session.drinks[i].id);
        }
      }
    }
  },
  methods: {
    showModal() {
      this.isModalVisible = true;
    },
    closeModalView() {
      this.isModalVisible = false;
      console.log('clicked close');
    },
    addDrink(drink) {
      this.$store.commit('updateSession', { add: drink });
      this.selectedDrinks.push(drink.id);
      console.log('added drink', this.selectedDrinks);
    },
    removeDrink(drink) {
      this.$store.commit('updateSession', { remove: drink.id });
      this.selectedDrinks.splice(this.selectedDrinks.indexOf(drink.id), 1);
      console.log('removed drink', this.selectedDrinks);
    },
    // getSession() {
    //   let data = JSON.parse(localStorage.getItem('Sundown'));
    //   if (data) {
    //     if (this.$store.state.email) {
    //       console.log('if here');
    //       return data.sessions.filter(i => i.id == this.$store.state.email)[0];
    //     } else {
    //       console.log('else mid');
    //       return data.sessions.filter(i => i.id == 'new')[0];
    //     }
    //   } else {
    //     console.log('else last');
    //     this.$router.push('/');
    //   }
    // },
    getSession() {
      let data = JSON.parse(localStorage.getItem('Sundown'));
      if (data) {
        if (localStorage.getItem('EmailSession')) {
          console.log('if here');
          return data.sessions.filter(i => i.id == localStorage.getItem('EmailSession'))[0];
        } else {
          console.log('else mid');
          return data.sessions.filter(i => i.id == 'new')[0];
        }
      } else {
        console.log('else last');
        this.$router.push('/');
      }
    },
  },
  components: {
    DrinkData,
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 800px;
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
  @media (max-width: 1200px) {
    width: 600px;
  }
  @media (max-width: 800px) {
    width: calc(100vw - 10px);
    margin-left: 10px;
  }
}

.gallery {
  width: 50%;
  display: flex;
  @media (max-width: 500px) {
    width: 100vw;
  }
  .gallery-item {
    margin: 0 30px 30px 0;
    border: 1px solid #d5d5d5;
    border-radius: 3px;
    text-align: center;
    width: 100%;
    position: relative;
    display: flex;
    align-self: stretch;
    flex-direction: column;
    .gallary-img {
      flex: 1;
      display: flex;
      align-items: center;
    }
    @media (max-width: 1200px) {
      margin: 0 10px 10px 0;
    }
    img {
      margin: 10px auto;
      width: 60px;
      position: relative;
    }
    .name {
      text-transform: uppercase;
      font-weight: bold;
      padding-bottom: 10px;
      display: block;
    }
    .details {
      position: absolute;
      left: 20%;
      top: 50%;
      transform: translate(-50%, -50%);
      cursor: pointer;
      img {
        width: 50px;
      }
    }
    label {
      position: absolute;
      right: 20%;
      top: 48.5%;
      color: blue;
      transform: translate(50%, -50%);
      cursor: pointer;
      img {
        width: 42px;
      }
    }
    .checkbox {
      visibility: hidden;
      width: 0;
      height: 0;
      overflow: hidden;
      display: none;
      &:checked + label {
        .unchecked {
          display: none;
        }
        .checked {
          display: block;
        }
      }
    }
  }
}
/* Loading animation template */
@keyframes placeHolderShimmer {
  0% {
    background-position: -468px 0
  }
  100% {
    background-position: 468px 0
  }
}
.animated-background {
  $grey: #f0f0f0;
  animation-duration: 1.25s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: placeHolderShimmer;
  animation-timing-function: linear;
  background: $grey;
  background: linear-gradient(to right, $grey 8%, #f8f8f8 18%, $grey 33%);
  background-size: 1024px 304px;
  height: 96px;
  position: relative;
}
.loading-template {
  display: block;
  flex-grow: 1;
  @extend .animated-background;
  content: " ";
  border-radius: 4px;
  height: 300px;
  border: 0px !important;
}
</style>
