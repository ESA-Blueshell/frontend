<template>
  <div class="banner">
    <img :src="gaming" id="background" class="background parallax">
    <div class="black overlay"></div>
    <div style="text-align: center;height: 100%">
      <div class="title text-h4 font-weight-light white--text">
        {{ title }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'top-banner',
  props: ["title"],
  data: function () {
    return {
      gaming: require("../assets/gaming.jpg"),

    }
  }
}
let bg= document.getElementById("background");
window.addEventListener('scroll', function () {
  const newbg = document.getElementById("background");
  if (bg !== newbg) {
    bg = newbg;
  }
  bg.style.top = -250 + window.scrollY * 0.7 + 'px';
})
</script>


<style scoped lang="scss">


.banner {
  height: 300px;
  overflow: hidden;
  display: block;
  position: relative;
}

.background {
  position: absolute;
  top: -250px;
  width: 100%;
  z-index: 1;
}

.title {
  position: relative;
  z-index: 2;
  top: 134px;
}

.overlay {
  position: absolute;
  opacity: 0.4;
  width: 100%;
  height: 100%;
  z-index: 2;
}
</style>
