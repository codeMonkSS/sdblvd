<template>
  <section>
    <div class="flex-grid">
      <ImageSlider />
      <OrderBox />
    </div>
    <div class="flex-grid">
      <FindOrder />
      <ContentBox />
    </div>
  </section>
</template>

<script>
// @ is an alias to /src
import ImageSlider from '@/components/HomePage/ImageSlider.vue';
import OrderBox from '@/components/HomePage/OrderBox.vue';
import FindOrder from '@/components/HomePage/FindOrder.vue';
import ContentBox from '@/components/HomePage/ContentBox.vue';

export default {
  name: 'Home',
  components: {
    ImageSlider,
    OrderBox,
    FindOrder,
    ContentBox,
  },
};
</script>

<style lang="scss" scoped>
.flex-grid {
  display: flex;
  width: 100%;
  @media (max-width: 800px) {
    flex-direction: column;
  }
  &:first-child {
    margin-bottom: 30px;
  }
}
</style>
