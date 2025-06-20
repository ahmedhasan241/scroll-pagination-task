<template>
  <div class="max-w-3xl mx-auto p-6 bg-gradient-to-br from-white via-blue-50 to-blue-100 rounded-xl shadow-lg">
    <button
      @click="router.back()"
      class="mb-6 inline-flex items-center text-sm font-medium text-blue-700 hover:underline hover:text-blue-900 transition"
    >
      <UIcon name="heroicons:arrow-left-20-solid" class="mr-2 text-blue-500 w-5 h-5" />
      Back to posts
    </button>

    <div v-if="!post" class="text-gray-500 text-center py-10 flex flex-col items-center">
      <UIcon name="heroicons:clock-20-solid" class="w-6 h-6 mb-2 text-gray-400" />
      Loading post...
    </div>

    <div v-else>
      <h1 class="text-3xl font-bold text-blue-900 mb-4">{{ post.title }}</h1>

      <div class="border-l-4 border-blue-300 bg-white p-4 rounded text-gray-700 text-lg leading-relaxed">
        {{ post.description }}
      </div>

      <p class="text-sm text-gray-500 mt-6 inline-flex items-center">
        <Icon name="pixel:calender-solid" class="w-4 h-4 mr-1 text-blue-500" />
        Posted on {{ formatDate(post.created_at) }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">

import { usePostFeed } from '@/composables/usePostFeed'

const route = useRoute()
const router = useRouter()
const { posts } = usePostFeed()
interface Post {
  id: number;
  title: string;
  description: string;
  created_at: string;
}
const post = computed(() =>
  posts.value.find((p: Post) => p.id === Number(route.params.id))
)
const formatDate = (dateStr: string) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
</script>
