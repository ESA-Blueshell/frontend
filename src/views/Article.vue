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
      <v-btn icon
             :href="'http://twitter.com/share?text='+news.title+'&url='+this.thisURL()+'&hashtags='+news.newsType">
        <v-icon>mdi-twitter</v-icon>
      </v-btn>
      <v-btn icon
             :href="'https://www.facebook.com/sharer/sharer.php?u='+this.thisURL()+'&t='+news.title">
        <v-icon>mdi-facebook</v-icon>
      </v-btn>
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
  },
  methods: {
    thisURL() {
      return document.URL
    }
  }
}
</script>

<style scoped>

</style>