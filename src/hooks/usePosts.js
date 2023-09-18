import axios from "axios";
import { ref, onMounted } from "vue";

export default function usePosts(limit) {
  const posts = ref([]);
  const totalPages = ref(0);
  const isPostLoading = ref(true);
  const fetching = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts",
        {
          params: {
            _page: this.page,
            _limit: this.limit,
          },
        }
      );
      totalPages.value = Math.ceil(response.headers["x-total-count"] / limit);
      posts.value = response.data;
    } catch (e) {
      alert("Помилка");
    } finally {
      isPostLoading.value = false;
    }
  };
  onMounted(fetching);
  return {
    posts,
    isPostLoading,
    totalPages,
  };
}
