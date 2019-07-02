<template>
  <div class="modal">
    <div class="modal-data" v-if="drink">
      <div class="close-modal">
        <img src="../../assets/close.svg" alt="Close" @click="closeModal()">
      </div>
      <div class="modal-image">
        <img :src="drink.image_url" alt="drink.name">
      </div>
      <div class="modal-content">
        <div>
          <div class="full-image">
          </div>
          <div class="name">
            <h4>{{ drink.name }}</h4> <!-- Name -->
            <p>{{ drink.tagline }}</p> <!-- Tag -->
          </div>
          <div class="alcohol">
            Vol: {{ drink.ph }}% <!-- This is the ph level -->
          </div>
          <div class="description">
            <p>{{ drink.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DrinkData',
  props: { drink: undefined },
  data() {
    return {
    };
  },
  methods: {
    closeModal() {
      this.$emit('closeModalView', true);
    },
  },
};
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0,0,0,.75);
  .modal-data {
    width: 60%;
    position: relative;
    display: flex;
    height: 60%;
    background-color: #efefef;
    border-radius: 3px;
    @media (max-width: 800px) {
      width: 90%;
      height: 80%;
      padding-bottom: 30px;
      flex-direction: column;
      align-items: center;
      overflow: auto;
    }
    .close-modal {
      position: absolute;
      width: 30px;
      height: 30px;
      cursor: pointer;
      top: 10px;
      right: 10px;
      background-color: #efefef;
      border-radius: 50%;
      @media (max-width: 800px) {
        position: fixed;
        margin-top: 10px;
        right: 30px;
      }
    }
  }
  .modal-image {
    height: 100%;
    margin: 30px;
    img {
      height: 100%;
      width: auto;
    }
    @media (max-width: 800px) {
      margin: 20px;
      height: 70%;
      img {
        height: 100%;
      }
    }
  }
  .modal-content {
    display: flex;
    align-items: center;
    margin: 0 50px;
  }
}
</style>
