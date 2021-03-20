<template>
  <v-main>
    <top-banner title="news"></top-banner>
    <div class="mx-auto my-10" style="max-width: 800px">
      <h6>{{ news.newsType }}</h6>
      <h2>{{ news.title }}</h2>
      <p v-html="news.content">
      </p>
      <h5>By <b>{{ news.creatorUsername }}</b>,
        {{ news.postedAt ? news.postedAt.slice(0, 10) : '' }}
      </h5>
    </div>
    <v-snackbar v-model="snackbar" timeout="10000">
      Uh oh, looks like we can't connect to the server :/ <br>
      Just ping @SiteCie on Discord and we'll look into it
      <template v-slot:action="{ attrs }">
        <v-btn
            color="blue"
            text
            v-bind="attrs"
            @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-main>
</template>

<script>
import TopBanner from "@/components/top-banner";

export default {
  components: {TopBanner},
  data() {
    return {
      snackbar: false,
      news: []
    }
  },
  mounted() {
    this.$http
        .get('news/' + this.$route.params.id)
        .then(response => this.news = response.data)
        .catch(() => this.snackbar = true)
  }
}
</script>

<style scoped>

</style>