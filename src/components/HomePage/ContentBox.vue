<template>
  <div class="content-box">
    <div class="header">Content Box</div>
    <div class="tabs">
      <span>Lorem ipsum</span>
      <span>Dolor sit amet</span>
      <span>consectetur</span>
      <span>adipiscing</span>
      <span>eiusmod tempor</span>
      <span>incididunt ut labore</span>
      <span>dolore magna aliqua</span>
    </div>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      Ut enim ad minim veniam, quis nostrud exercitation ullamco
      laboris nisi ut aliquip ex ea commodo consequat.</p>
  </div>
</template>

<script>
export default {
  name: 'ContentBox',
};
</script>

<style lang="scss" scoped>
.content-box {
  width: 600px;
  padding: 0 30px 30px;
  display: flex;
  flex-direction: column;
  @media (max-width: 800px) {
    width: 100vw;
    background-color: #efefef;
    padding:  30px 20px;
  }
  .header {
    font-size: 20px;
    text-transform: uppercase;
    letter-spacing: 12px;
    font-weight: bold;
    margin-block-start: 0.83em;
    margin-block-end: 0.83em;
    @media (max-width: 1200px) {
      letter-spacing: 8px;
    }
  }
  .tabs {
    display: flex;
    flex-wrap: wrap;
    span {
      background-color: #007ddb;
      color: #ffffff;
      padding: 5px 10px;
      border-radius: 3px;
      margin-bottom: 3px;
      margin-right: 3px;
    }
  }
}
</style>
