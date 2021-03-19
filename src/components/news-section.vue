<template>
  <v-container class="grey lighten-5">
    <v-row justify="center">
      <v-col v-for="n in news" v-bind:key="n.title" cols="3">
        <v-card class="elevation-7" style="border-radius: 15px">
          <v-card-title>
            {{ n.title }}
          </v-card-title>
          <v-card-subtitle>
            <b> {{ n.type }}</b>
          </v-card-subtitle>
          <v-card-text class="mt-n3" v-html="n.content">
          </v-card-text>

          <v-btn rounded class="ma-3 mt-0" color="primary">
            read more
          </v-btn>
        </v-card>

      </v-col>
    </v-row>
  </v-container>

</template>

<script>

export default {
  name: "news-section",
  data: function () {
    return {
      news: [
        {
          type: "news",
          title: "WIRWAR – LAN party at the FC Twente Stadium!",
          content: "",
          author: "author1",
          date: "1 day ago"
        },
        {
          type: "type2",
          title: "title2",
          content: "content2",
          author: "author2",
          date: "1 month ago"
        }
        ,
        {
          type: "type3",
          title: "title3",
          content: "content3",
          author: "author3",
          date: "1 year ago"
        }
      ]
    }
  },
//TODO: TEST IF BACKEND CONNECTIVITY WORKS
  mounted() {
    // axios
    //     .get('http://127.0.0.1:8080/api/news')
    //     .then(response => (this.news = response.data))
    //     .catch(error => console.log(error))
  },
  methods: {
    fiftyWords(str) {
      return str.split(/\s+/).slice(0, 50).join(" ") + '...';
    }
  },

}
</script>

<style scoped>

</style>