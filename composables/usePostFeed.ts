import { usePostFeedStore } from '@/stores/postFeed'
import { storeToRefs } from 'pinia'

export const usePostFeed = () => {
  const store = usePostFeedStore()
  const {
    posts,
    currentPage,
    lastPage,
    isLoading,
    error,
    hasMore,
    scrollPosition,
  } = storeToRefs(store)

  const fetchPosts = async () => {
    if (isLoading.value || !hasMore.value) return

    isLoading.value = true
    error.value = ''

    try {
      const response = await $fetch(`/api/posts?page=${currentPage.value}`)
      store.posts.push(...response.data)
      store.lastPage = response.last_page

      if (store.lastPage !== null && store.currentPage >= store.lastPage) {
        store.hasMore = false
      } else {
        store.currentPage++
      }
    } catch (e) {
      store.error = '⚠️ Failed to load posts'
    } finally {
      store.isLoading = false
    }
  }

  const resetFeed = () => {
    store.resetFeed()
  }

  return {
    posts,
    currentPage,
    lastPage,
    isLoading,
    error,
    hasMore,
    scrollPosition,
    fetchPosts,
    resetFeed,
  }
}
