import { defineStore } from 'pinia'

interface PostFeedState {
  posts: any[];
  currentPage: number;
  lastPage: number | null;
  isLoading: boolean;
  error: string;
  hasMore: boolean;
  scrollPosition: number;
}

export const usePostFeedStore = defineStore('postFeed', {
  state: (): PostFeedState => ({
    posts: [],
    currentPage: 1,
    lastPage: null,
    isLoading: false,
    error: '',
    hasMore: true,
    scrollPosition: 0,
  }),
  actions: {
    resetFeed() {
      this.posts = []
      this.currentPage = 1
      this.lastPage = null
      this.hasMore = true
      this.error = ''
      this.scrollPosition = 0
    },
  },
})
