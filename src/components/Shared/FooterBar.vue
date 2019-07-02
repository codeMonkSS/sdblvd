<template>
  <footer>
    <div>
      <h4>Contact</h4>
      <p>Lorem ipsum dolor sit amet,</p>
      <p>consectetur adipiscing elit</p>
      <p>123 456 789</p>
    </div>
    <div class="hidden-xs">
      <h4>Quick links</h4>
      <p>Lorem ipsum</p>
      <p>Dolor sit amet</p>
      <p>Consectetur</p>
      <p>Adipiscing elit</p>
    </div>
    <div class="hidden-xs">
      <h4>More links</h4>
      <p>Lorem ipsum</p>
      <p>Dolor sit amet</p>
      <p>Consectetur</p>
      <p>Adipiscing elit</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterBar',
};
</script>

<style lang="scss" scoped>
footer {
  display: flex;
  justify-content: space-around;
  width: 100%;
  background-color: #383838;
  color: #ffffff;
  padding: 30px 0;
  @media (max-width: 800px) {
    justify-content: unset;
    padding-left: 30px;
  }
  h4 {
    font-size: 16px;
    text-transform: uppercase;
    letter-spacing: 4px;
  }
}
@media (max-width: 800px) {
  .hidden-xs {
    display: none;
  }
}
</style>
