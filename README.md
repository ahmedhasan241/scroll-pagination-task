Getting Started

### 1. Clone the repository


git clone https://github.com/ahmedhasan241/scroll-pagination-task
cd infinite-scroll-feed

### 2. install dependencies
npm install


### 3. run the project

npm run dev



### Composable: usePostFeed.ts
The usePostFeed composable is responsible for handling the infinite scrolling logic and managing all post-related state using a centralized Pinia store. It encapsulates:

Pagination logic (current page, last page, hasMore)

API fetching logic using $fetch

Scroll position tracking for restoration

Error and loading state management



### Scroll detection is handled using a simple logic inside a handleScroll function added to the window scroll event:

const handleScroll = () => {
  scrollPosition.value = window.scrollY;
  const nearBottom =
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
  if (nearBottom) fetchPosts();
};

This function:

Saves the current scroll position to the store.

Checks if the user is near the bottom of the page (100px threshold).

If so, it calls fetchPosts() to load the next page of data from the API.


### The scroll position is restored when the user navigates back to the page using: 

onMounted(async () => {
  if (posts.value.length === 0) await fetchPosts();
  nextTick(() => {
    window.scrollTo(0, scrollPosition.value);
  });
  window.addEventListener("scroll", handleScroll);
});


###  Bonus Features Implemented

- Scroll Restoration: When navigating away and back, the user returns to the same scroll position.
-  Virtual Skeleton Loaders: Stylish loading placeholders shown while new posts are fetched.
-  Responsive Grid Layout: Adaptive post display across mobile, tablet, and desktop.
- Search Functionality: Real-time filtering of posts by title and description.
- Post Detail Caching: Single post view uses cached data from the main list to avoid refetching.
-  Enhanced UI/UX: Icons using @nuxt/icon and Tailwind transitions and gradient backgrounds and Tooltip with full post description on hover


