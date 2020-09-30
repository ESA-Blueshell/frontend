<template>
  <v-app>
    <top-banner title="News"></top-banner>
    <!-- TODO: MAKE THIS A WORKING LIST AND LOOP THROUGH THE NEWS LIST FROM DATA -->
    <v-list disabled>
      <v-list-item v-for="(item, i) in news" :key="i">
        <v-list-item-content>
      <div class="mx-auto my-10" style="max-width: 800px">
        <h6>{{ news.type }}</h6>
        <h2>{{ news.title }}</h2>
        <p>
          <!-- TODO: CUT OFF NEWS TEXT AT ONE POINT TO NOT OVERFLOW -->
          {{ news.content }} <a>Read more...</a>
        </p>
        <h5>By <b>{{ news.author }}</b>, <!-- TODO: SOME SORT OF DATE CALCULATION --></h5>
      </div>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-app>
</template>
<script>
import TopBanner from "@/components/top-banner";
import axios from 'axios';
export default {
  data() {
    return {
      news: null
    }
  },
  mounted() {
    axios
    .get('http://127.0.0.1:8080/api/events')
    .then(response => (this.news = response))
    .catch(error => console.log(error))
  },
  components: {TopBanner}
}
</script>