<script setup lang="ts">
import {ref, onMounted} from 'vue';
import TopBanner from '@/components/banners/TopBanner.vue';
import BlogService from '@/services/BlogService.ts';
import $markdownToHtml from '@/plugins/markdownToHtml.ts';
import type BlogModel from "@/models/BlogModel.ts";
import DOMPurify from "dompurify";

const blogs = ref<BlogModel[]>([]);
const blogService = new BlogService();

onMounted(async () => {
  try {
    blogs.value = await blogService.getBlogs();
  } catch (error) {
    console.error('Error fetching blog list:', error);
  }
});
</script>


<template>
  <v-main>
    <top-banner title="Newsletters" />
    <div
      class="mx-auto my-10"
      style="max-width: 900px"
    >
      <!-- Introduction Section -->
      <div class="mx-3">
        <p class="text-body-1">
          Welcome to our newsletters page! Here you'll find the latest updates, insights, and stories from our
          community.
          Expand any newsletter to read the full article.
        </p>
      </div>
      <!-- Expanded Newsletters List -->
      <v-expansion-panels variant="accordion">
        <v-expansion-panel
          v-for="blog in blogs"
          :key="blog.id"
        >
          <v-expansion-panel-title class="text-h5 font-weight-light">
            {{ blog.title }}
            <span class="text-subtitle-2 ml-2">{{ blog.published_at }}</span>
          </v-expansion-panel-title>
          <v-expansion-panel-text
            class="pa-0 mx-0"
          >
            <!-- Render blog content as HTML -->
            <!-- eslint-disable-next-line vue/no-v-html -->
            <div
              class="full-width-content"
              v-html="DOMPurify.sanitize(blog.html)"
            />
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
  </v-main>
</template>
<style scoped>
.full-width-content {
  width: 100%;
  margin: 0;
  padding: 0;
}
.full-width-content * {
  width: 100%;
  margin: 0;
  padding: 0;
}
</style>
