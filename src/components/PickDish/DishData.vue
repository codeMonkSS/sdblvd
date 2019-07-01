<template>
  <!-- adding a template holder -->
  <div>
    <div class="loading dish-container" v-if="!meal" id="meal">
      <div class="loading-template dish-image"></div>
      <div class="loading-template dish-title"></div>
    </div>
    <div class="dish-container" v-if="meal">
      <div class="dish-image">

        <img :src="meal.strMealThumb" :alt="meal.strMeal" />
      </div>
      <div class="dish-details">
        <div class="dish-name">
          <h1>{{ meal.strMeal }}</h1>
          <span class="dish-area">
              {{ meal.strArea }}
            </span>
        </div>
        <div class="dish-ingredients">
          <h2>Contains:</h2>
          <span v-for="i in extractIngredients(meal)">{{ i }}</span>
        </div>
        <div class="dish-text">
          <p>{{ meal.strInstructions }}</p>
          <button class="btn btn-danger" v-on:click="generateNewDish()">Generate new Dish</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'DishData',
  // add vue data indicator for loading state
  data() {
    return {
      meal: undefined,
    };
  },
  mounted() {
    const self = this;
    // get current session
    const session = this.getSession();
    if(session) {
      self.meal = session.dish;
    } else {
      // suggest start a new session
      this.generateNewDish();
    }
  },
  computed: mapState([
    'dish',
  ]),
  methods: {
    extractIngredients: (meal) => {
      const ingredients = [];
      for (let prop in meal) {
        if (prop.match('strIngredient')) {
          if (meal[prop] && meal[prop].trim() != '') {
            ingredients.push(meal[prop]);
          }
        }
      }
      return ingredients;
    },

    generateNewDish() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      this.$store.dispatch('getDish').then(res => {
        this.meal = res.data.meals[0];
        this.$store.commit('startSession', { dish: this.meal });
      }).catch(err => console.log(err));
    },

    getSession() {
      let data = JSON.parse(localStorage.getItem('Sundown'));
      if (data) {
        if (this.$store.state.email) {
          return data.sessions.filter(i => i.id == this.$store.state.email)[0];
        }
        return data.sessions.filter(i => i.id == 'new')[0];
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.dish-container {
  width: 800px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  @media (max-width: 1200px) {
    width: 600px;
  }
  @media (max-width: 800px) {
    width: 100vw;
  }
  .dish-image {
    position: relative;
    color: #ffffff;
    overflow: auto;
    img {
      position: relative;
      width: 100%;
      height: auto;
    }
  }
  .dish-details {
    display: block;
    margin: 30px;
    @media (max-width: 800px) {
      margin: 30px 20px;
    }
    .dish-name {
      font-weight: normal;
      text-transform: uppercase;
      h1 {
        font-size: 20px;
        letter-spacing: 3px;
        border-bottom: 2px solid #ba2329;
        padding-bottom: 10px;
        margin-bottom: 5px;
        width: 100%;
      }
      span {
        display: block;
        font-size: 14px;
        text-align: right;
      }
    }
  }
  .dish-ingredients {
    padding: 20px 0;
    display: flex;
    flex-wrap: wrap;
    h2 {
      font-size: 14px;
      font-weight: normal;
      text-transform: uppercase;
      width: 100%;
    }
    span {
      background-color: #007ddb;
      color: #ffffff;
      padding: 5px 10px;
      border-radius: 3px;
      margin-bottom: 3px;
      margin-right: 3px;
    }
  }

  .dish-text {
    padding-bottom: 30px;
    .btn {
      margin-top: 10px;
    }
  }
}

/* Setup of loading templates */
.loading {
  padding-right: 10px;
  margin-bottom: 200px;

  .dish-image {
    min-height: 600px;
  }
  .dish-title {
    margin-top: 10px;
    height: 40px;
    max-width: 300px;
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
}
</style>
