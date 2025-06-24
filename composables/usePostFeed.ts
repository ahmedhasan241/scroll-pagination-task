import { usePostFeedStore } from '@/stores/postFeed'
import { useRouter } from 'vue-router'
import { ref, onMounted, onBeforeUnmount, nextTick, computed, watch } from 'vue'
import { storeToRefs } from 'pinia'

export const usePostFeed = () => {
  const store = usePostFeedStore()
  const router = useRouter()
  const observer = ref<IntersectionObserver | null>(null)
  const bottomRef = ref<HTMLElement | null>(null)

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

  const setupIntersectionObserver = () => {
    if (!bottomRef.value) return

    observer.value = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry.isIntersecting && hasMore.value && !isLoading.value) {
          fetchPosts()
        }
      },
      {
        rootMargin: '100px',
      }
    )

    observer.value.observe(bottomRef.value)
  }

  const cleanupIntersectionObserver = () => {
    if (observer.value && bottomRef.value) {
      observer.value.unobserve(bottomRef.value)
      observer.value.disconnect()
    }
  }

  const resetFeed = () => {
    store.resetFeed()
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const goToPost = (id: number) => {
    router.push(`/posts/${id}`)
  }

  const setupScroll = async () => {
    if (posts.value.length === 0) await fetchPosts()
    nextTick(() => {
      window.scrollTo(0, scrollPosition.value)
      setupIntersectionObserver()
    })
  }

  const cleanupScroll = () => {
    cleanupIntersectionObserver()
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
    formatDate,
    goToPost,
    setupScroll,
    cleanupScroll,
    bottomRef,
  }
}
