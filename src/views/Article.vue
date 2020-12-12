<template>
  <v-main>
    <top-banner :title="news.title"></top-banner>
        <div class="mx-auto my-10" style="max-width: 800px">
          <h6>{{news.newsType[0].toUpperCase() + news.newsType.slice(1) }}</h6>
          <h2>{{ news.title }}</h2>
          <p v-html="news.content">
          </p>
          <h5>By <b>{{ news.creatorUsername }}</b>, {{ news.postedAt.slice(0, 10) }}</h5>
        </div>
  </v-main>
</template>

<script>
import TopBanner from "@/components/top-banner";

export default {
  components: {TopBanner},
  data() {
    return {
      news: []
    }
  },
  mounted() {
    console.log(this.$route.params.id)
    this.$http
    .get('news/' + this.$route.params.id)
    .then(response => (this.news = response.data))
    .catch(error => console.log(error))
  }
}
</script>

<style scoped>

</style>