<template>
  <v-main>
    <top-banner title="News"></top-banner>
    <v-list class="mx-auto" style="max-width: 800px">
      <template v-for="(item, i) in news">
        <v-list-item :key="i">
          <v-list-item-content>
            <div class="mx-auto my-4">
              <h6>{{ item.newsType }}</h6>
              <h2>{{ item.title }}</h2>
              <p>{{ getWords(item.content) }} ...</p>
              <router-link :to="'/news/article/' + item.id" style="text-decoration: none;">Read
                more...
              </router-link>
              <h5 style="margin-top: 10px">By <b>{{ item.creatorUsername }}</b>,
                {{ item.postedAt.slice(0, 10) }}</h5>
            </div>
          </v-list-item-content>
        </v-list-item>
        <v-divider :key="i+'divider'" v-if="i !== (news.length - 1)"></v-divider>
      </template>
    </v-list>
    <!-- TODO: FIX THIS LATER -->
    <!--  <div class = "text-center">-->
    <!--    <v-pagination-->
    <!--      v-model="page"-->
    <!--      :length="3"-->
    <!--      ></v-pagination>-->
    <!--  </div>-->
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
  data() {
    return {
      news: [],
      snackbar: false,
      page: 1
    }
  },
  mounted() {
    this.$http
        .get('news/')
        .then(response => this.news = response.data)
        .catch(() => this.snackbar = true)
  },
  methods: {
    getWords(str) {
      str = str.replace(/(<([^>]+)>)/gi, "");
      return str.split(/\s+/).slice(0, 100).join(" ");
    },
  },
  components: {TopBanner}
}
</script>