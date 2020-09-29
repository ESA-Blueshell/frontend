<template>
  <v-app>
    <top-banner title="News"></top-banner>
    <div class="mx-auto my-10" style="max-width: 800px">
      <!-- TODO: MAKE THIS A LIST AND LOOP THROUGH THE NEWS LIST FROM DATA -->
      <h6>{{ news.type }}</h6>
      <h2>{{ news.title }}</h2>
      <p>
        <!-- TODO: CUT OFF NEWS TEXT AT ONE POINT TO NOT OVERFLOW -->
        {{ news.content }} <a>Read more...</a>
      </p>
      <h5>By <b>{{ news.author }}</b>, <!-- TODO: SOME SORT OF DATE CALCULATION --></h5>
    </div>
  </v-app>
</template>
<script>
import TopBanner from "@/components/top-banner";
export default {
  data() {
    return {
      news: null
    }
  },
  mounted() {
    <!-- TODO: REPLACE RESPONSE TO CORRECT DATA FROM RESPONSE -->
    axios
    .get('blueshell-backend-api-shit')
    .then(response => (this.news = response))
    .catch(error => console.log(error))
  },
  components: {TopBanner}
}
</script>