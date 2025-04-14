<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import type BlogModel from '@/models/BlogModel'
import BlogService from '@/services/BlogService.ts'

// Create an instance of our BlogService
const blogService = new BlogService()

// Reactive reference to hold the single blog data
const blog = ref<BlogModel | null>(null)

// Grab the "id" from the route (assuming your route is set up with :id)
const route = useRoute()
const blogId = Number(route.params.id) // Convert to number (if stored as string)

// Fetch the blog when component mounts
onMounted(async () => {
  try {
    blog.value = await blogService.getBlog(blogId)
  } catch (error) {
    console.error(`Error fetching blog with id ${blogId}:`, error)
  }
})
</script>

<template>
  <div>
    <!-- Show the blog if it’s loaded, otherwise show "Loading..." -->
    <div v-if="blog">
      <h1>{{ blog.title }}</h1>
      <p>Published at: {{ blog.published_at }}</p>

      <!-- Safely render raw HTML. Adjust as needed for security. -->
      <div v-html="blog.html" />
    </div>
    <div v-else>
      Loading...
    </div>
  </div>
</template>

<style scoped>
/* Your CSS styles here */
</style>
