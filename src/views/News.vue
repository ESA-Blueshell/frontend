<template>
  <v-main>
    <top-banner title="News"></top-banner>
    <!-- TODO: CREATE PAGES FOR NEWS -->
    <v-list>
      <v-list-item v-for="(item, i) in news" :key="i">
        <v-list-item-content>
          <div class="mx-auto my-10" style="max-width: 800px">
            <h6>{{ item.news_type }}</h6>
            <h2>{{ item.title }}</h2>
            <p>
              <!-- TODO: MAKE READ MORE LINK TO FULL NEWS ARTICLE -->
              {{ item.content }} <a href="/events">Read more...</a>
            </p>
            <h5>By <b>{{ item.creator_username }}</b>, {{ item.posted_at }}</h5>
          </div>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-main>
</template>
<script>
import TopBanner from "@/components/top-banner";
import axios from 'axios';
export default {
  data() {
    return {
      news: []
    }
  },
  //TODO: TEST IF BACKEND CONNECTIVITY WORKS
  mounted() {
    axios
    .get('http://127.0.0.1:8080/api/news')
    .then(response => (this.news = response.data))
    .catch(error => console.log(error))
  },
  // methods: {
  //   getWords(str) {
  //     return str.split(/\s+/).slice(0,100).join(" ");
  //   }
  // },
  components: {TopBanner}
}
</script>