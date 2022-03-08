<template>
  <v-main>
    <top-banner title="News"></top-banner>


    <div class="mx-3">
      <div class="mx-auto my-5" style="max-width: 800px">
        <p class="text-h4 font-weight-light">
          Subscribe to the monthly <a
            href="https://e0b439d3.sibforms.com/serve/MUIEAIqizJ5g_Rr8BTIJ87Y5ig2C01AXGSiJCeW1VbDKfPRmZ62U6xG90StYCYm7jBUENcyoymK3NG26fqqC_Zj1M8qdIbMeJYr1Kuom0Ph9gOjfvoosc7Ty4rjHv7lQEg04HFGjVKQiUYHN_QFpY_PlzXjZoqwFV-5qiY5VNjLforWZ_luKK4TgS7yONAix1AHKTBLKIF0M6LWN"
            target="_blank" class="text-decoration-none">
          Blueshell newsletter</a> to stay up to date with events and the association!
        </p>
      </div>
    </div>

    <v-list class="mx-auto" style="max-width: 800px">
      <template v-for="(item, i) in news">
        <v-list-item :key="i">
          <v-list-item-content>
            <div class="mx-auto my-4">
              <h6>{{ item.newsType }}</h6>
              <router-link :to="'/news/article/' + item.id"
                           style="text-decoration: none; color: inherit; ">
                <h2>{{ item.title }}</h2>
              </router-link>
              <p>{{ getWords(item.content) }} ...</p>
              <router-link :to="'/news/article/' + item.id" style="text-decoration: none;">
                Read more...
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
        .then(response => this.news = response.data)
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
