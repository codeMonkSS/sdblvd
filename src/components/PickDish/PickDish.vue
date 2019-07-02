<template>
  <div>
    <h1>Your dish</h1>
    <section class="flex-grid">
      <DishData />
      <SideBar />
    </section>
  </div>
</template>

<script>
import DishData from '@/components/PickDish/DishData.vue';
import SideBar from '@/components/PickDish/SideBar.vue';

export default {
  name: 'PickDish',
  components: {
    DishData,
    SideBar,
  },
};
</script>

<style lang="scss" scoped>
.flex-grid {
  display: flex;
  @media (max-width: 800px) {
    flex-direction: column;
  }
}
h1 {
  font-size: 20px;
  text-transform: uppercase;
  letter-spacing: 12px;border-bottom: 2px solid #ba2329;
  padding-bottom: 10px;
  margin: 0 0 20px;
  @media (max-width: 1200px) {
    letter-spacing: 6px;
    margin: 0 20px 20px;
  }
}
</style>
