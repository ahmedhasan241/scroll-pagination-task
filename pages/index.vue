<template>
  <div class="p-4 max-w-7xl mx-auto">
    <div class="relative mb-6">
      <input
        v-model="search"
        type="text"
        placeholder="Search posts..."
        class="w-full p-3 pr-10 rounded-lg border border-blue-300 text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-all placeholder:text-gray-400"
      />
      <button
        v-if="search"
        @click="search = ''"
        class="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400 hover:text-red-500 transition"
        title="Clear search"
      >
        <Icon name="material-symbols:close" class="text-red-600" />
      </button>
    </div>

    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="post in filteredPosts"
        :key="'post-' + post.id"
        class="bg-gradient-to-br from-white via-blue-50 to-blue-100 border border-blue-200 rounded-lg shadow hover:shadow-md transition p-5 hover:bg-blue-50"
      >
        <h2
          @click="goToPost(post.id)"
          class="text-xl font-semibold text-blue-900 mb-2 hover:text-blue-600 hover:underline transition cursor-pointer"
        >
          {{ post.title }}
        </h2>
        <p class="text-sm text-gray-500 inline-flex items-center">
          <Icon name="pixel:calender-solid" class="w-4 h-4 mr-1 text-blue-500" />
          {{ formatDate(post.created_at) }}
        </p>
        <div class="relative group">
          <p class="text-gray-700 line-clamp-3">
            {{ post.description }}
          </p>
          <div
            class="absolute z-10 w-64 p-2 text-sm text-white bg-gray-900 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none left-0 bottom-full mb-2"
          >
            {{ post.description }}
          </div>
        </div>
      </div>

      <template v-if="isLoading">
        <div
          v-for="i in 6"
          :key="'skeleton-' + i"
          class="animate-pulse bg-white border border-gray-200 rounded-lg shadow p-5"
        >
          <div class="h-5 bg-gray-300 rounded w-3/4 mb-3"></div>
          <div class="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div class="h-4 bg-gray-200 rounded w-5/6 mb-2"></div>
          <div class="h-4 bg-gray-200 rounded w-1/2 mt-4"></div>
        </div>
      </template>
    </div>

    <div class="text-center my-6 text-red-600" v-if="error">{{ error }}</div>
    <div class="text-center my-6 text-gray-500" v-if="!hasMore && !isLoading">
      No more posts to load.
    </div>
    <div ref="bottomRef" class="h-8"></div>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { usePostFeed } from '@/composables/usePostFeed'

const search = ref('')
const {
  posts,
  isLoading,
  error,
  hasMore,
  fetchPosts,
  formatDate,
  goToPost,
  setupScroll,
  cleanupScroll,
  bottomRef,
} = usePostFeed()

interface Post {
  id: number
  title: string
  description: string
  created_at: string
}

const filteredPosts = computed(() =>
  posts.value.filter((post: Post) =>
    [post.title, post.description].some((text) =>
      text.toLowerCase().includes(search.value.toLowerCase())
    )
  )
)

onMounted(setupScroll)
onBeforeUnmount(cleanupScroll)
</script>
