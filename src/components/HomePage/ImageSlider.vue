<template>
  <div class="slider">
    <ul class="slides" :style="style">
      <li v-for="(slide,i) in playslides" :key="i">
        <div class="img" :style="{ backgroundImage: `url(${slide.img})` }"></div>
      </li>
    </ul>
    <ul class="indicators">
      <li v-for="(slide,i) in slides"
          :key="i"
          @click="selectSlide(i)"
          :class="i === current ? 'active' : null">
        <div class="item">
          <div class="title">{{slide.title}}</div>
          <div class="progress">
            <div class="fill" :style="{ width: `${percent}%`}"></div>
            <div class="dot"></div>
          </div>
          <p class="mark">{{slide.mark}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ImageSlider',
  data() {
    return {
      slides: [
        /* eslint-disable global-require */
        {
          img: require('../../assets/slider/image01.jpeg'),
          title: 'Lorem ipsum dolor sit amet',
          mark: 'quis nostrud',
        },
        {
          img: require('../../assets/slider/image02.jpeg'),
          title: 'Consectetur adipiscing elit',
          mark: 'exercitation ullamco',
        },
        {
          img: require('../../assets/slider/image03.jpeg'),
          title: 'Sed ut perspiciatis unde omnis',
          mark: 'laboris nisi ut',
        },
        /* eslint-enable global-require */
      ],
      current: 0,
      percent: 0,
      timer: 0,
      interval: 0,
      progress: 0,
      duration: 5000,
      playslides: [],
    };
  },
  computed: {
    // eslint-disable-next-line consistent-return,vue/return-in-computed-property
    style() {
      // eslint-disable-next-line default-case
      switch (this.current % 2) {
        case 0:
          return { top: '0' };
        case 1:
          return { top: '-100%' };
      }
    },
  },
  methods: {
    selectSlide(i) {
      this.current = i;
      this.playslides[this.current % 2] = this.slides[this.current];
      this.resetPlay();
    },
    process() {
      // eslint-disable-next-line no-plusplus
      this.current++;
      if (this.current >= this.slides.length) {
        this.current = 0;
      }
      this.playslides[this.current % 2] = this.slides[this.current];
      this.resetPlay();
    },
    going() {
      const time = new Date().getTime();
      this.percent = Math.floor(100 * (time - this.timer) / this.duration);
    },
    resetPlay() {
      clearInterval(this.interval);
      clearInterval(this.progress);
      this.play();
    },
    stop() {
      clearInterval(this.interval);
      clearInterval(this.progress);
    },
    play() {
      this.timer = new Date().getTime();
      this.progress = setInterval(this.going, this.duration / 100);
      this.interval = setInterval(this.process, this.duration);
    },
  },
  created() {
    // eslint-disable-next-line prefer-destructuring
    this.playslides[0] = this.slides[0];
    // eslint-disable-next-line prefer-destructuring
    this.playslides[1] = this.slides[1];
    this.play();
  },
};
</script>

<style scoped lang="scss">
.slider {
  position: relative;
  z-index: 1;
  overflow: hidden;
  width: 800px;
  height: 350px;
  @media (max-width: 1200px) {
    width: 600px;
  }
  @media (max-width: 800px) {
    width: 100vw;
  }
  ul {
    list-style: none;
    &.slides {
      position: absolute;
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 0;
      transition: top 800ms;
      li {
        height: 100%;
        .img {
          height: 100%;
          background-size: cover;
          background-position: 50%;
        }
      }
    }
    &.indicators {
      position: absolute;
      padding-right: 40px;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      z-index: 2;
      text-align: right;
      li {
        clear: both;
        .item {
          position: relative;
          margin-bottom: 16px;
          float: right;
        }
        .title {
          color: #fff;
          cursor: pointer;
          font-size: 16px;
          line-height: 14px;
          transition: font-size 0.6s ease-out;
          text-shadow: 0 0 10px #000;
          text-transform: uppercase;
          @media (max-width: 800px) {
            font-size: 14px;
            line-height: 10px;
          }
        }
        .mark {
          color: #fff;
          margin: 0;
          font-size: 12px;
          text-shadow: 0 0 10px #000;
        }
        .dot {
          position: absolute;
          top: 50%;
          right: -20px;
          margin-top: -5.5px;
          margin-left: 10px;
          width: 11px;
          height: 11px;
          background: #fff;
          border-radius: 50%;
        }
        .progress {
          position: relative;
          display: inline-block;
          width: 100%;
          height: 2px;
          margin: 3px 0;
          background: rgba(255,255,255,0.5);
        }
        &.active {
          .title {
            transition: font-size 0.6s ease-in;
            font-size: 20px;
            @media (max-width: 800px) {
              font-size: 16px;
            }
          }
          .progress .fill {
            height: 100%;
            background: #fff;
          }
        }
      }
      li:last-child {
        .item {
          margin-bottom: 0;
        }
      }
    }
  }
}
</style>
