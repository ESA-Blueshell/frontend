<template>
  <v-main>
    <top-banner title="News"></top-banner>
    <!-- TODO: CREATE PAGES FOR NEWS -->
    <v-list>
      <v-list-item v-for="(item, i) in news" :key="i">
        <v-list-item-content>
          <div class="mx-auto my-10" style="max-width: 800px">
            <h6>{{ item.type }}</h6>
            <h2>{{ item.title }}</h2>
            <p>
              <!-- TODO: MAKE READ MORE LINK TO FULL NEWS ARTICLE -->
              {{ getWords(item.content) }} <a href="/events">Read more...</a>
            </p>
            <h5>By <b>{{ item.author }}</b>, {{ item.date }}</h5>
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
      news: [
        {
          type: "type1",
          title: "title1",
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In non lacus at arcu ornare varius. Curabitur " +
              "sed erat mi. Vestibulum quis est id diam rhoncus placerat vitae quis enim. Curabitur vehicula purus sed turpis " +
              "efficitur, in ornare enim facilisis. Mauris condimentum eros quis lectus egestas gravida. Praesent aliquet non leo " +
              "quis lacinia. Suspendisse elementum dolor id pellentesque sodales. Pellentesque habitant morbi tristique senectus " +
              "et netus et malesuada fames ac turpis egestas.\n" +
              "\n" +
              "Suspendisse placerat sapien ut libero egestas vehicula. Donec congue lectus non turpis euismod, at porttitor ante" +
              " tincidunt. In aliquam volutpat libero, in fermentum orci placerat id. Donec tincidunt quam at egestas efficitur." +
              " Sed mauris purus, egestas vel magna sed, porttitor bibendum risus. Praesent pretium pretium nibh, ac lobortis " +
              "nunc feugiat sed. Sed condimentum arcu sit amet euismod commodo. Duis suscipit laoreet ligula, vel eleifend tortor " +
              "mattis nec. Vestibulum quis gravida purus, vitae imperdiet magna. Praesent finibus porta sem sed maximus. Maecenas " +
              "quis arcu nunc. Donec eu erat maximus, dignissim nunc sed, fringilla justo. Proin dapibus ullamcorper hendrerit. " +
              "Phasellus cursus augue in efficitur tristique. Quisque convallis tellus quis ante scelerisque, vel ultricies lectus dictum.",
          author: "author1",
          date: "1 day ago"
        },
        {
          type: "type2",
          title: "title2",
          content: "content2",
          author: "author2",
          date: "1 month ago"
        },
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
    axios
    .get('http://127.0.0.1:8080/api/news')
    .then(response => (this.news = response))
    .catch(error => console.log(error))
  },
  methods: {
    getWords(str) {
      return str.split(/\s+/).slice(0,100).join(" ");
    }
  },
  components: {TopBanner}
}
</script>