<template>
  <v-main>
    <top-banner title="news"></top-banner>
    <div class="mx-auto my-10" style="max-width: 800px">
      <p class="text-h5">{{ news.newsType }}</p>
      <p class="text-h4 font-weight-thin">{{ news.title }}</p>
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
        .catch(e => this.$root.handleNetworkError(e))
  },
  methods: {
    thisURL() {
      return document.URL
    }
  }
}
</script>

<style>

.theme--dark .quote {
  color: #A8FF00;
}

.quote {
  color: gray;
  text-align: center;
  font-style: italic;
  font-size: 1.2rem;
}

.v-application p.text-h5 {
  margin-bottom: 0;
}
</style>
