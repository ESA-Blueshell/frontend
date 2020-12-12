<template>
  <v-main>
    <top-banner title="News"></top-banner>
    <!-- TODO: CREATE PAGES FOR NEWS -->
    <v-list>
      <v-list-item v-for="(item, i) in news" :key="i">
        <v-list-item-content>
          <div class="mx-auto my-10" style="max-width: 800px">
            <h6>{{ item.newsType[0].toUpperCase() + item.newsType.slice(1) }}</h6>
            <h2>{{ item.title }}</h2>
            <p v-html="item.content">
            </p>
            <router-link :to="'/news/' + item.id">Read more... </router-link>
            <h5>By <b>{{ item.creatorUsername }}</b>, {{ item.postedAt.slice(0, 10) }}</h5>
          </div>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <!-- TODO: FIX THIS LATER -->
<!--  <div class = "text-center">-->
<!--    <v-pagination-->
<!--      v-model="page"-->
<!--      :length="3"-->
<!--      ></v-pagination>-->
<!--  </div>-->
  </v-main>
</template>
<script>
import TopBanner from "@/components/top-banner";
export default {
  data() {
    return {
      news: [],
      page: 1
    }
  },
  mounted() {
    this.$http
    .get('news/')
    .then(response => (this.news = response.data))
    .catch(error => console.log(error))
  },
  methods: {
    getWords(str) {
      return str.split(/\s+/).slice(0,100).join(" ");
    },
  },
  components: {TopBanner}
}
</script>