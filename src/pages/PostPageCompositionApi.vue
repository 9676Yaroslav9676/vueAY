<template>
  <div>
    <h1>Сторінка з постами</h1>
    <my-input v-focus v-model="searchQuery" placeholder="Пошук..." />
    <div class="app__btns">
      <my-button @click="showDialog">Створити користувача</my-button>
      <my-select v-model="selectedSort" :options="sortOptions" />
    </div>

    <my-dialog v-model:show="dialogVisible">
      <post-form @create="createPost" />
    </my-dialog>

    <post-list
      :posts="sortedAndSearchedPosts"
      @remove="removePost"
      v-if="!isPostLoading"
    />
    <div v-else>Йде завантаження...</div>
    <div v-intersection="loadMorePosts" class="observer"></div>
  </div>
</template>

<script>
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
import MyButton from "@/components/UI/MyButton";
import MySelect from "@/components/UI/MySelect";
import usePosts from "@/hooks/usePosts";
import useSortedPosts from "@/hooks/useSortedPosts";
import useSortedAndSearch from "@/hooks/useSortedAndSearch";

export default {
  components: {
    MySelect,
    MyButton,
    PostForm,
    PostList,
  },

  data() {
    return {
      dialogVisible: false,
      sortOptions: [
        { value: "title", name: "По назві" },
        { value: "body", name: "По вмісту" },
      ],
    };
  },
  setup() {
    const { posts, totalPages, isPostsLoading } = usePosts();
    const { sortedPosts, selectedSort } = useSortedPosts(posts);
    const { searchQuery, sortedAndSearchedPosts } =
      useSortedAndSearch(sortedPosts);
    return {
      posts,
      totalPages,
      isPostsLoading,
      sortedPosts,
      selectedSort,
      searchQuery,
      sortedAndSearchedPosts,
    };
  },
};
</script>

<style scoped>
.app__btns {
  display: flex;
  justify-content: space-between;
  margin: 15px 0;
}

.observer {
  height: 30px;
  background: green;
}
</style>
